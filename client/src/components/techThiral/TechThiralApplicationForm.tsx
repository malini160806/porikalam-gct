import { useState, type FormEvent } from 'react';
import { motion } from 'framer-motion';
import { CheckCircle2, UploadCloud } from 'lucide-react';
import { Button } from '@/components/ui/Button';
import { Input, Textarea } from '@/components/ui/Input';
import { applyForTechThiral } from '@/lib/techThiralApi';
import { ApiError } from '@/lib/apiClient';
import { SITE } from '@/constants/site';

const FEE = 1999;
// UPI transaction reference numbers (UTR/RRN) are always a 12-digit number.
const UPI_REFERENCE_REGEX = /^\d{12}$/;

export function TechThiralApplicationForm() {
  const [organizationName, setOrganizationName] = useState('');
  const [contactPerson, setContactPerson] = useState('');
  const [contactEmail, setContactEmail] = useState('');
  const [contactPhone, setContactPhone] = useState('');
  const [showcaseDescription, setShowcaseDescription] = useState('');
  const [paymentReference, setPaymentReference] = useState('');
  const [paymentScreenshot, setPaymentScreenshot] = useState<File | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [submitting, setSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  async function handleSubmit(formEvent: FormEvent) {
    formEvent.preventDefault();
    setError(null);

    if (!organizationName.trim()) return setError('Organization / startup name is required.');
    if (!contactPerson.trim()) return setError('Contact person name is required.');
    if (!contactEmail.trim()) return setError('Contact email is required.');
    if (!contactPhone.trim()) return setError('Contact phone is required.');
    if (!paymentReference.trim()) return setError('Enter your UPI payment reference to complete your booth application.');
    if (!UPI_REFERENCE_REGEX.test(paymentReference.trim())) {
      return setError('Enter a valid 12-digit UPI transaction reference ID.');
    }

    setSubmitting(true);
    try {
      await applyForTechThiral({
        organizationName: organizationName.trim(),
        contactPerson: contactPerson.trim(),
        contactEmail: contactEmail.trim(),
        contactPhone: contactPhone.trim(),
        showcaseDescription: showcaseDescription.trim() || undefined,
        paymentReference: paymentReference.trim(),
        paymentScreenshot: paymentScreenshot ?? undefined,
      });
      setSubmitted(true);
    } catch (err) {
      setError(err instanceof ApiError ? err.message : 'Something went wrong. Please try again.');
    } finally {
      setSubmitting(false);
    }
  }

  if (submitted) {
    return (
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="border border-gold/30 bg-white/70 p-6 text-center shadow-card sm:p-10"
      >
        <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-full border border-gold/50 bg-gold/10 text-brown">
          <CheckCircle2 size={26} strokeWidth={1.5} />
        </div>
        <h3 className="mt-4 font-heading text-2xl font-semibold text-navy">Booth Application Submitted</h3>
        <p className="mx-auto mt-3 max-w-md font-body text-sm leading-7 text-slate">
          Thank you, <strong>{organizationName}</strong>. We&apos;ll verify your payment reference and confirm your
          booth allotment for the Tech Thiral Industry Expo by email.
        </p>
      </motion.div>
    );
  }

  return (
    <motion.form
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.2 }}
      onSubmit={handleSubmit}
      className="flex flex-col gap-5 border border-navy/15 bg-white/80 p-6 text-left shadow-card sm:p-8"
    >
      <div className="text-center">
        <p className="font-body text-[10px] font-bold uppercase tracking-[0.25em] text-brown">Apply Now</p>
        <h3 className="mt-1 font-heading text-2xl font-semibold text-navy sm:text-3xl">Book Your Booth</h3>
        <p className="mt-2 font-body text-xs text-slate/70">Booth Fee ₹{FEE}</p>
      </div>

      <Input
        label="Organization / Startup Name *"
        value={organizationName}
        onChange={(e) => setOrganizationName(e.target.value)}
        placeholder="Your company or startup name"
      />

      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
        <Input
          label="Contact Person *"
          value={contactPerson}
          onChange={(e) => setContactPerson(e.target.value)}
          placeholder="Full name"
        />
        <Input
          label="Contact Phone *"
          value={contactPhone}
          onChange={(e) => setContactPhone(e.target.value)}
          placeholder="10-digit mobile number"
        />
      </div>

      <Input
        label="Contact Email *"
        type="email"
        value={contactEmail}
        onChange={(e) => setContactEmail(e.target.value)}
        placeholder="you@example.com"
      />

      <Textarea
        label="What will you showcase? (optional)"
        value={showcaseDescription}
        onChange={(e) => setShowcaseDescription(e.target.value)}
        placeholder="Briefly describe your product, prototype, or demo"
        rows={3}
      />

      <div className="border border-gold/40 bg-gold/10 p-3">
        <p className="font-body text-xs text-slate">
          Pay <span className="font-semibold text-navy">₹{FEE}</span> via UPI to:
        </p>
        <p className="font-heading text-sm font-bold text-navy">{SITE.flagshipUpiId}</p>
        <p className="font-body text-xs text-slate/70">{SITE.flagshipUpiPayeeName}</p>
      </div>

      <Input
        label="UPI Transaction / Reference ID *"
        value={paymentReference}
        onChange={(e) => setPaymentReference(e.target.value)}
        placeholder="12-digit UTR number, e.g. 123456789012"
        inputMode="numeric"
        maxLength={12}
      />

      <label className="flex flex-col gap-1.5 text-left">
        <span className="font-body text-xs font-semibold uppercase tracking-wider text-slate">
          Upload Payment Screenshot (optional)
        </span>
        <div className="flex items-center gap-3 border border-navy/25 bg-cream/60 px-4 py-3">
          <UploadCloud size={18} className="shrink-0 text-brown" />
          <input
            type="file"
            accept="image/png,image/jpeg,image/webp"
            onChange={(e) => setPaymentScreenshot(e.target.files?.[0] ?? null)}
            className="w-full font-body text-sm text-navy file:mr-3 file:border-0 file:bg-gold/20 file:px-3 file:py-1.5 file:font-semibold file:text-brown"
          />
        </div>
        {paymentScreenshot && (
          <span className="font-body text-xs text-slate/70">Selected: {paymentScreenshot.name}</span>
        )}
      </label>

      {error && <p className="font-body text-sm font-semibold text-red-700">{error}</p>}

      <Button variant="primary" size="lg" type="submit" disabled={submitting} className="mt-2 w-full">
        {submitting ? 'Submitting…' : 'Submit Booth Application'}
      </Button>
    </motion.form>
  );
}
