import { useState, type ChangeEvent } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { z } from 'zod';
import { ArrowLeft, ArrowRight, Camera, Eye, EyeOff, Loader2, Pencil, UserPlus } from 'lucide-react';
import { Input, Select } from '@/components/ui/Input';
import { Button } from '@/components/ui/Button';
import { Divider } from '@/components/ui/Divider';
import { CornerOrnament } from '@/components/common/CornerOrnament';
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
import { TN_ENGINEERING_COLLEGES } from '@/data/tnEngineeringColleges';

const GENDER_OPTIONS = ['Male', 'Female', 'Other', 'Prefer not to say'];
const YEAR_OPTIONS = ['1st Year', '2nd Year', '3rd Year', '4th Year', '5th Year', 'Postgraduate'];
const DEGREE_OPTIONS = ['B.E.', 'B.Tech', 'M.E.', 'M.Tech'];
const OTHER_COLLEGE = '__other__';
const OTHER_DEGREE = '__other__';

const step1Schema = z.object({
  fullName: z.string().trim().min(2, 'Name must be at least 2 characters').max(100),
  email: z.string().trim().email('Enter a valid email address'),
  phone: z
         .string()
         .trim()
         .regex(
         /^[6-9]\d{9}$/,
         'Mobile number must start with 6, 7, 8, or 9 and contain 10 digits',),
    dob: z.string().trim().min(1, 'Date of birth is required'),
  gender: z.string().trim().min(1, 'Select a gender'),
  college: z.string().trim().min(2, 'College is required').max(120),
  department: z.string().trim().min(2, 'Department is required').max(80),
  degree: z.string().trim().min(2, 'Degree is required').max(80),
  yearOfStudy: z.string().trim().min(1, 'Year is required').max(40),
  registerNumber: z.string().trim().min(1, 'Register number is required').max(40),
  city: z.string().trim().min(1, 'City is required').max(80),
  state: z.string().trim().min(1, 'State is required').max(80),
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
  const [isOtherCollege, setIsOtherCollege] = useState(false);
  const [isOtherDegree, setIsOtherDegree] = useState(false);
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
    const phoneValid = /^\d{10}$/.test(values.phone);
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
    <div className="relative mx-auto w-full max-w-2xl overflow-hidden border border-gold/30 bg-white/50 p-6 shadow-card sm:p-10">
      <CornerOrnament corner="top-left" />
      <CornerOrnament corner="bottom-right" />

      <div className="relative mb-8 flex flex-col items-center gap-2 text-center">
        <div className="flex h-14 w-14 items-center justify-center rounded-full border border-gold/50 text-brown">
          <UserPlus size={24} strokeWidth={1.5} />
        </div>
        <h2 className="font-heading text-2xl font-semibold tracking-wide text-navy">Create Your Profile</h2>
        <p className="max-w-sm font-body text-sm text-slate">
          Register once — use your participant username to sign in and join every event.
        </p>
        <Divider className="mt-1" />
      </div>

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
  maxLength={10}
  value={values.phone}
  onChange={(e) => {
    const input = e.target.value.replace(/\D/g, '');

    // Don't allow the first digit to be anything except 6, 7, 8, or 9
    if (input.length > 0 && !/^[6-9]/.test(input)) {
      updateField('phone', '');
      setErrors((prev) => ({
        ...prev,
        phone: 'Mobile number must start with 6, 7, 8, or 9',
      }));
      return;
    }

    updateField('phone', input.slice(0, 10));

    // Show error until a valid 10-digit number is entered
    if (input.length > 0 && !/^[6-9]\d{9}$/.test(input)) {
      setErrors((prev) => ({
        ...prev,
        phone: 'Enter a valid 10-digit mobile number starting with 6, 7, 8, or 9',
      }));
    } else {
      setErrors((prev) => ({
        ...prev,
        phone: undefined,
      }));
    }
  }}
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
                <div className="flex flex-col gap-1.5">
                  <Select
                    label="College Name"
                    required
                    value={isOtherCollege ? OTHER_COLLEGE : values.college}
                    onChange={(e) => {
                      const nextValue = e.target.value;
                      if (nextValue === OTHER_COLLEGE) {
                        setIsOtherCollege(true);
                        updateField('college', '');
                      } else {
                        setIsOtherCollege(false);
                        updateField('college', nextValue);
                      }
                    }}
                  >
                    <option value="" disabled>
                      Select your college
                    </option>
                    {TN_ENGINEERING_COLLEGES.map((name) => (
                      <option key={name} value={name}>
                        {name}
                      </option>
                    ))}
                    <option value={OTHER_COLLEGE}>Other (not listed)</option>
                  </Select>
                  {!isOtherCollege && errors.college && <span className="text-xs text-red-700">{errors.college}</span>}
                </div>
                {isOtherCollege && (
                  <Input
                    label="Enter Your College Name"
                    required
                    value={values.college}
                    onChange={(e) => updateField('college', e.target.value)}
                    error={errors.college}
                    placeholder="Type your college name"
                  />
                )}
                <Input
                  label="Department"
                  required
                  value={values.department}
                  onChange={(e) => updateField('department', e.target.value)}
                  error={errors.department}
                />
                <div className="flex flex-col gap-1.5">
                  <Select
                    label="Degree"
                    required
                    value={isOtherDegree ? OTHER_DEGREE : values.degree}
                    onChange={(e) => {
                      const nextValue = e.target.value;
                      if (nextValue === OTHER_DEGREE) {
                        setIsOtherDegree(true);
                        updateField('degree', '');
                      } else {
                        setIsOtherDegree(false);
                        updateField('degree', nextValue);
                      }
                    }}
                  >
                    <option value="" disabled>
                      Select your degree
                    </option>
                    {DEGREE_OPTIONS.map((option) => (
                      <option key={option} value={option}>
                        {option}
                      </option>
                    ))}
                    <option value={OTHER_DEGREE}>Other</option>
                  </Select>
                  {!isOtherDegree && errors.degree && <span className="text-xs text-red-700">{errors.degree}</span>}
                </div>
                {isOtherDegree && (
                  <Input
                    label="Enter Your Degree"
                    required
                    value={values.degree}
                    onChange={(e) => updateField('degree', e.target.value)}
                    error={errors.degree}
                    placeholder="Type your degree"
                  />
                )}
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
                  label="Register Number"
                  required
                  value={values.registerNumber}
                  onChange={(e) => updateField('registerNumber', e.target.value)}
                  error={errors.registerNumber}
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
                    className="absolute right-0 top-4 flex h-10 w-10 items-center justify-center text-slate/60 hover:text-brown"
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
                  className="absolute right-0 top-4 flex h-10 w-10 items-center justify-center text-slate/60 hover:text-brown"
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
                <h3 className="font-heading text-xl font-semibold tracking-wide text-navy">
                  Personal Information
                </h3>
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
                <h3 className="font-heading text-xl font-semibold tracking-wide text-navy">Account Setup</h3>
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
