import { useState, type ChangeEvent } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { z } from 'zod';
import { ArrowLeft, ArrowRight, Camera, Eye, EyeOff, Loader2, Pencil } from 'lucide-react';
import { Input, Select } from '@/components/ui/Input';
import { Button } from '@/components/ui/Button';
import { WizardStepper, type WizardStep } from './WizardStepper';
import { PasswordStrengthMeter } from './PasswordStrengthMeter';
import { PasswordRequirements, getPasswordChecks } from './PasswordRequirements';
import {
  checkConflicts,
  reserveUsername,
  registerParticipant,
  uploadProfilePhoto,
  ParticipantAuthError,
} from '@/lib/participantAuth';

const GENDER_OPTIONS = ['Male', 'Female', 'Other', 'Prefer not to say'];
const YEAR_OPTIONS = ['1st Year', '2nd Year', '3rd Year', '4th Year', '5th Year', 'Postgraduate'];

const step1Schema = z.object({
  fullName: z.string().trim().min(2, 'Name must be at least 2 characters').max(100),
  email: z.string().trim().email('Enter a valid email address'),
  phone: z.string().trim().regex(/^\d{7,15}$/, 'Enter a valid mobile number'),
  dob: z.string().trim().min(1, 'Date of birth is required'),
  gender: z.string().trim().min(1, 'Select a gender'),
  college: z.string().trim().min(2, 'College is required').max(120),
  department: z.string().trim().min(2, 'Department is required').max(80),
  degree: z.string().trim().min(2, 'Degree is required').max(80),
  yearOfStudy: z.string().trim().min(1, 'Year is required').max(40),
  registerNumber: z.string().trim().max(40).optional(),
  city: z.string().trim().min(1, 'City is required').max(80),
  state: z.string().trim().min(1, 'State is required').max(80),
  guardianName: z.string().trim().min(2, 'Guardian name is required').max(100),
  emergencyContact: z.string().trim().regex(/^\d{7,15}$/, 'Enter a valid emergency contact number'),
});

type Step1Values = z.infer<typeof step1Schema>;

const step2Schema = z
  .object({
    password: z
      .string()
      .min(8, 'At least 8 characters')
      .regex(/[A-Z]/, 'Add an uppercase letter')
      .regex(/[a-z]/, 'Add a lowercase letter')
      .regex(/\d/, 'Add a number')
      .regex(/[^A-Za-z0-9]/, 'Add a special character'),
    confirmPassword: z.string().min(1, 'Confirm your password'),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: 'Passwords do not match',
    path: ['confirmPassword'],
  });

const EMPTY_STEP1: Step1Values = {
  fullName: '',
  email: '',
  phone: '',
  dob: '',
  gender: '',
  college: '',
  department: '',
  degree: '',
  yearOfStudy: '',
  registerNumber: '',
  city: '',
  state: '',
  guardianName: '',
  emergencyContact: '',
};

const STEP1_FIELD_LABELS: Record<keyof Step1Values, string> = {
  fullName: 'Full Name',
  email: 'Email Address',
  phone: 'Mobile Number',
  dob: 'Date of Birth',
  gender: 'Gender',
  college: 'College Name',
  department: 'Department',
  degree: 'Degree',
  yearOfStudy: 'Year of Study',
  registerNumber: 'Register Number',
  city: 'City',
  state: 'State',
  guardianName: 'Parent / Guardian Name',
  emergencyContact: 'Emergency Contact Number',
};

interface RegistrationWizardProps {
  onSuccess: (result: { username: string; fullName: string }) => void;
}

export function RegistrationWizard({ onSuccess }: RegistrationWizardProps) {
  const [currentStep, setCurrentStep] = useState<WizardStep>(1);
  const [values, setValues] = useState<Step1Values>(EMPTY_STEP1);
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [errors, setErrors] = useState<Partial<Record<string, string>>>({});
  const [photoFile, setPhotoFile] = useState<File | null>(null);
  const [photoPreview, setPhotoPreview] = useState<string | null>(null);
  const [isCheckingConflicts, setIsCheckingConflicts] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formError, setFormError] = useState('');

  function updateField<K extends keyof Step1Values>(key: K, value: Step1Values[K]) {
    setValues((prev) => ({ ...prev, [key]: value }));
    setErrors((prev) => ({ ...prev, [key]: undefined }));
  }

  function handlePhotoChange(event: ChangeEvent<HTMLInputElement>) {
    const file = event.target.files?.[0];
    if (!file) return;
    setPhotoFile(file);
    setPhotoPreview(URL.createObjectURL(file));
  }

  async function handleEmailPhoneBlur() {
    if (!values.email && !values.phone) return;
    const emailValid = z.string().trim().email().safeParse(values.email).success;
    const phoneValid = /^\d{7,15}$/.test(values.phone);
    if (!emailValid && !phoneValid) return;

    setIsCheckingConflicts(true);
    try {
      const result = await checkConflicts(emailValid ? values.email : '', phoneValid ? values.phone : '');
      setErrors((prev) => ({
        ...prev,
        email: result.emailTaken ? 'This email is already registered.' : prev.email,
        phone: result.phoneTaken ? 'This mobile number is already registered.' : prev.phone,
      }));
    } catch {
      // Silently ignore — the server re-validates on submit regardless.
    } finally {
      setIsCheckingConflicts(false);
    }
  }

  function validateStep1(): boolean {
    const result = step1Schema.safeParse(values);
    if (result.success) {
      setErrors({});
      return true;
    }
    const nextErrors: Partial<Record<string, string>> = {};
    for (const issue of result.error.issues) {
      const key = issue.path[0] as string;
      if (!nextErrors[key]) nextErrors[key] = issue.message;
    }
    setErrors(nextErrors);
    return false;
  }

  function validateStep2(): boolean {
    const result = step2Schema.safeParse({ password, confirmPassword });
    if (result.success) {
      setErrors({});
      return true;
    }
    const nextErrors: Partial<Record<string, string>> = {};
    for (const issue of result.error.issues) {
      const key = issue.path[0] as string;
      if (!nextErrors[key]) nextErrors[key] = issue.message;
    }
    setErrors(nextErrors);
    return false;
  }

  function goNext() {
    setFormError('');
    if (currentStep === 1 && validateStep1()) setCurrentStep(2);
    else if (currentStep === 2 && validateStep2()) setCurrentStep(3);
  }

  function goBack() {
    setFormError('');
    if (currentStep > 1) setCurrentStep((currentStep - 1) as WizardStep);
  }

  async function handleCreateAccount() {
    setFormError('');
    setIsSubmitting(true);
    try {
      const reservedUsername = await reserveUsername();
      const { username } = await registerParticipant({
        ...values,
        registerNumber: values.registerNumber || undefined,
        password,
        reservedUsername,
      });
      if (photoFile) {
        await uploadProfilePhoto(photoFile).catch(() => undefined);
      }
      onSuccess({ username, fullName: values.fullName });
    } catch (error) {
      if (error instanceof ParticipantAuthError) {
        if (error.field === 'email' || error.field === 'phone') {
          setErrors((prev) => ({ ...prev, [error.field as string]: error.message }));
          setCurrentStep(1);
        }
        setFormError(error.message);
      } else {
        setFormError('Something went wrong. Please try again.');
      }
    } finally {
      setIsSubmitting(false);
    }
  }

  const passwordChecks = getPasswordChecks(password);
  const isPasswordValid = Object.values(passwordChecks).every(Boolean);

  return (
    <div className="mx-auto w-full max-w-2xl border border-navy/15 bg-white/40 p-6 sm:p-10">
      <WizardStepper currentStep={currentStep} />

      <AnimatePresence mode="wait">
        <motion.div
          key={currentStep}
          initial={{ opacity: 0, x: 16 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: -16 }}
          transition={{ duration: 0.25, ease: 'easeOut' }}
          className="mt-10"
        >
          {currentStep === 1 && (
            <div className="flex flex-col gap-6">
              <div className="flex flex-col items-center gap-3">
                <label
                  htmlFor="reg-photo"
                  className="group relative flex h-24 w-24 cursor-pointer items-center justify-center overflow-hidden rounded-full border-2 border-dashed border-navy/25 bg-cream/60 transition-colors hover:border-gold"
                >
                  {photoPreview ? (
                    <img src={photoPreview} alt="Profile preview" className="h-full w-full object-cover" />
                  ) : (
                    <Camera size={22} className="text-slate/50 group-hover:text-brown" />
                  )}
                </label>
                <input id="reg-photo" type="file" accept="image/png,image/jpeg,image/webp" className="hidden" onChange={handlePhotoChange} />
                <span className="font-body text-xs text-slate/70">Profile Photo (Optional)</span>
              </div>

              <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
                <Input
                  label="Full Name"
                  required
                  value={values.fullName}
                  onChange={(e) => updateField('fullName', e.target.value)}
                  error={errors.fullName}
                />
                <Input
                  label="Email Address"
                  type="email"
                  required
                  value={values.email}
                  onChange={(e) => updateField('email', e.target.value)}
                  onBlur={handleEmailPhoneBlur}
                  error={errors.email}
                />
                <Input
                  label="Mobile Number"
                  type="tel"
                  required
                  value={values.phone}
                  onChange={(e) => updateField('phone', e.target.value.replace(/[^\d]/g, ''))}
                  onBlur={handleEmailPhoneBlur}
                  error={errors.phone}
                />
                <Input
                  label="Date of Birth"
                  type="date"
                  required
                  value={values.dob}
                  onChange={(e) => updateField('dob', e.target.value)}
                  error={errors.dob}
                />
                <div className="flex flex-col gap-1.5">
                  <Select
                    label="Gender"
                    required
                    value={values.gender}
                    onChange={(e) => updateField('gender', e.target.value)}
                  >
                    <option value="" disabled>
                      Select gender
                    </option>
                    {GENDER_OPTIONS.map((option) => (
                      <option key={option} value={option}>
                        {option}
                      </option>
                    ))}
                  </Select>
                  {errors.gender && <span className="text-xs text-red-700">{errors.gender}</span>}
                </div>
                <Input
                  label="College Name"
                  required
                  value={values.college}
                  onChange={(e) => updateField('college', e.target.value)}
                  error={errors.college}
                />
                <Input
                  label="Department"
                  required
                  value={values.department}
                  onChange={(e) => updateField('department', e.target.value)}
                  error={errors.department}
                />
                <Input
                  label="Degree"
                  required
                  value={values.degree}
                  onChange={(e) => updateField('degree', e.target.value)}
                  error={errors.degree}
                />
                <div className="flex flex-col gap-1.5">
                  <Select
                    label="Year of Study"
                    required
                    value={values.yearOfStudy}
                    onChange={(e) => updateField('yearOfStudy', e.target.value)}
                  >
                    <option value="" disabled>
                      Select year
                    </option>
                    {YEAR_OPTIONS.map((option) => (
                      <option key={option} value={option}>
                        {option}
                      </option>
                    ))}
                  </Select>
                  {errors.yearOfStudy && <span className="text-xs text-red-700">{errors.yearOfStudy}</span>}
                </div>
                <Input
                  label="Register Number (Optional)"
                  value={values.registerNumber}
                  onChange={(e) => updateField('registerNumber', e.target.value)}
                />
                <Input
                  label="City"
                  required
                  value={values.city}
                  onChange={(e) => updateField('city', e.target.value)}
                  error={errors.city}
                />
                <Input
                  label="State"
                  required
                  value={values.state}
                  onChange={(e) => updateField('state', e.target.value)}
                  error={errors.state}
                />
                <Input
                  label="Parent / Guardian Name"
                  required
                  value={values.guardianName}
                  onChange={(e) => updateField('guardianName', e.target.value)}
                  error={errors.guardianName}
                />
                <Input
                  label="Emergency Contact Number"
                  type="tel"
                  required
                  value={values.emergencyContact}
                  onChange={(e) => updateField('emergencyContact', e.target.value.replace(/[^\d]/g, ''))}
                  error={errors.emergencyContact}
                />
              </div>

              <div className="flex justify-end">
                <Button onClick={goNext} icon={<ArrowRight size={16} />} disabled={isCheckingConflicts}>
                  {isCheckingConflicts ? 'Checking…' : 'Next'}
                </Button>
              </div>
            </div>
          )}

          {currentStep === 2 && (
            <div className="flex flex-col gap-6">
              <div className="flex flex-col gap-2">
                <div className="relative">
                  <Input
                    label="Password"
                    type={showPassword ? 'text' : 'password'}
                    required
                    value={password}
                    onChange={(e) => {
                      setPassword(e.target.value);
                      setErrors((prev) => ({ ...prev, password: undefined }));
                    }}
                    error={errors.password}
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword((v) => !v)}
                    className="absolute right-3 top-9 text-slate/60 hover:text-brown"
                    aria-label={showPassword ? 'Hide password' : 'Show password'}
                  >
                    {showPassword ? <EyeOff size={16} /> : <Eye size={16} />}
                  </button>
                </div>
                <PasswordStrengthMeter password={password} />
                <PasswordRequirements password={password} />
              </div>

              <div className="relative">
                <Input
                  label="Confirm Password"
                  type={showConfirmPassword ? 'text' : 'password'}
                  required
                  value={confirmPassword}
                  onChange={(e) => {
                    setConfirmPassword(e.target.value);
                    setErrors((prev) => ({ ...prev, confirmPassword: undefined }));
                  }}
                  error={errors.confirmPassword}
                />
                <button
                  type="button"
                  onClick={() => setShowConfirmPassword((v) => !v)}
                  className="absolute right-3 top-9 text-slate/60 hover:text-brown"
                  aria-label={showConfirmPassword ? 'Hide password' : 'Show password'}
                >
                  {showConfirmPassword ? <EyeOff size={16} /> : <Eye size={16} />}
                </button>
              </div>

              <div className="flex justify-between">
                <Button variant="outline" onClick={goBack} icon={<ArrowLeft size={16} />}>
                  Back
                </Button>
                <Button onClick={goNext} icon={<ArrowRight size={16} />} disabled={!isPasswordValid}>
                  Next
                </Button>
              </div>
            </div>
          )}

          {currentStep === 3 && (
            <div className="flex flex-col gap-6">
              <div className="flex items-center justify-between">
                <h3 className="font-heading text-lg text-navy">Personal Information</h3>
                <button
                  type="button"
                  onClick={() => setCurrentStep(1)}
                  className="flex items-center gap-1 font-body text-xs font-semibold uppercase tracking-wide text-brown hover:text-navy"
                >
                  <Pencil size={12} /> Edit
                </button>
              </div>
              <dl className="grid grid-cols-1 gap-x-6 gap-y-3 border border-navy/10 bg-cream/40 p-5 sm:grid-cols-2">
                {(Object.keys(STEP1_FIELD_LABELS) as Array<keyof Step1Values>).map((key) => (
                  <div key={key}>
                    <dt className="font-body text-[11px] font-semibold uppercase tracking-wide text-slate/70">
                      {STEP1_FIELD_LABELS[key]}
                    </dt>
                    <dd className="font-body text-sm text-navy">{values[key] || '—'}</dd>
                  </div>
                ))}
              </dl>

              <div className="flex items-center justify-between">
                <h3 className="font-heading text-lg text-navy">Account Setup</h3>
                <button
                  type="button"
                  onClick={() => setCurrentStep(2)}
                  className="flex items-center gap-1 font-body text-xs font-semibold uppercase tracking-wide text-brown hover:text-navy"
                >
                  <Pencil size={12} /> Edit
                </button>
              </div>
              <p className="border border-navy/10 bg-cream/40 p-5 font-body text-sm text-navy">
                Password set · {'•'.repeat(Math.min(password.length, 12))}
              </p>

              {formError && <p className="font-body text-sm text-red-700">{formError}</p>}

              <div className="flex justify-between">
                <Button variant="outline" onClick={goBack} icon={<ArrowLeft size={16} />} disabled={isSubmitting}>
                  Back
                </Button>
                <Button onClick={handleCreateAccount} disabled={isSubmitting} icon={isSubmitting ? <Loader2 size={16} className="animate-spin" /> : undefined}>
                  {isSubmitting ? 'Creating Account…' : 'Create Account'}
                </Button>
              </div>
            </div>
          )}
        </motion.div>
      </AnimatePresence>
    </div>
  );
}
