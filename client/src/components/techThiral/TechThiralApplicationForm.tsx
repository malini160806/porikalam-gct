import { useState, type FormEvent } from 'react';
import { motion } from 'framer-motion';
import { CheckCircle2, ExternalLink, UploadCloud } from 'lucide-react';
import { Button } from '@/components/ui/Button';
import { Input } from '@/components/ui/Input';
import { applyForTechThiral } from '@/lib/techThiralApi';
import { ApiError } from '@/lib/apiClient';
import { validatePaymentScreenshot } from '@/lib/fileValidation';
import { SITE } from '@/constants/site';

const FEE = 1999;
const BOOTH_FORM_URL = 'https://forms.gle/AgDBkXZ8YDPsQb6MA';
// UPI transaction reference numbers (UTR/RRN) are always a 12-digit number.
const UPI_REFERENCE_REGEX = /^\d{12}$/;

export function TechThiralApplicationForm() {
  const [paymentReference, setPaymentReference] = useState('');
  const [paymentScreenshot, setPaymentScreenshot] = useState<File | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [submitting, setSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  async function handleSubmit(formEvent: FormEvent) {
    formEvent.preventDefault();
    setError(null);

    if (!paymentReference.trim()) return setError('Enter your UPI payment reference to complete your booth application.');
    if (!UPI_REFERENCE_REGEX.test(paymentReference.trim())) {
      return setError('Enter a valid 12-digit UPI transaction reference ID.');
    }
    if (!paymentScreenshot) return setError('Upload your payment screenshot to complete your booth application.');

    setSubmitting(true);
    try {
      await applyForTechThiral({
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
          Thank you for applying. We&apos;ll cross-check your booth form response and payment reference, then
          confirm your booth allotment for the Tech Thiral Industry Expo.
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

      <div className="border border-navy/15 bg-cream/60 p-4">
        <p className="font-body text-xs font-bold uppercase tracking-wide text-slate/70">Step 1</p>
        <p className="mt-1 font-body text-sm text-slate">
          Fill out the booth application form with your organization and contact details.
        </p>
        <a
          href={BOOTH_FORM_URL}
          target="_blank"
          rel="noreferrer"
          className="mt-3 inline-flex items-center gap-2 border border-gold/50 bg-gold/10 px-4 py-2.5 font-body text-sm font-bold uppercase tracking-wide text-brown transition-colors hover:bg-gold hover:text-navy"
        >
          Open Booth Application Form
          <ExternalLink size={14} />
        </a>
      </div>

      <div className="border border-navy/15 bg-cream/60 p-4">
        <p className="font-body text-xs font-bold uppercase tracking-wide text-slate/70">Step 2</p>
        <p className="mt-1 font-body text-sm text-slate">
          After submitting the form above, complete your payment here to confirm your booth.
        </p>
      </div>

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
          Upload Payment Screenshot * (max 200KB)
        </span>
        <div className="flex items-center gap-3 border border-navy/25 bg-cream/60 px-4 py-3">
          <UploadCloud size={18} className="shrink-0 text-brown" />
          <input
            type="file"
            accept="image/png,image/jpeg,image/webp"
            onChange={(e) => {
              const file = e.target.files?.[0] ?? null;
              if (file) {
                const validationError = validatePaymentScreenshot(file);
                if (validationError) {
                  setError(validationError);
                  setPaymentScreenshot(null);
                  e.target.value = '';
                  return;
                }
              }
              setError(null);
              setPaymentScreenshot(file);
            }}
            className="w-full font-body text-sm text-navy file:mr-3 file:border-0 file:bg-gold/20 file:px-3 file:py-1.5 file:font-semibold file:text-brown"
          />
        </div>
        {paymentScreenshot && (
          <span className="font-body text-xs text-slate/70">Selected: {paymentScreenshot.name}</span>
        )}
      </label>

      {error && <p className="font-body text-sm font-semibold text-red-700">{error}</p>}

      <Button variant="primary" size="lg" type="submit" disabled={submitting} className="mt-2 w-full">
        {submitting ? 'Submitting…' : 'Submit Payment'}
      </Button>
    </motion.form>
  );
}
