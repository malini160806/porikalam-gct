import { useState, type FormEvent } from 'react';
import { motion } from 'framer-motion';
import { CheckCircle2, Plus, UploadCloud, X } from 'lucide-react';
import { Button } from '@/components/ui/Button';
import { Input, Select } from '@/components/ui/Input';
import { applyForThulira } from '@/lib/thuliraApi';
import { ApiError } from '@/lib/apiClient';
import { SITE } from '@/constants/site';
import { thuliraDomains } from '@/data/thulira';

const FEE = 799;
const MAX_TEAMMATES = 3; // Team of 4 total, including the leader.
// UPI transaction reference numbers (UTR/RRN) are always a 12-digit number.
const UPI_REFERENCE_REGEX = /^\d{12}$/;

export function ThuliraApplicationForm() {
  const [teamName, setTeamName] = useState('');
  const [startupTitle, setStartupTitle] = useState('');
  const [domain, setDomain] = useState('');
  const [leaderName, setLeaderName] = useState('');
  const [leaderEmail, setLeaderEmail] = useState('');
  const [leaderPhone, setLeaderPhone] = useState('');
  const [college, setCollege] = useState('');
  const [teammateNames, setTeammateNames] = useState<string[]>(['']);
  const [paymentReference, setPaymentReference] = useState('');
  const [paymentScreenshot, setPaymentScreenshot] = useState<File | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [submitting, setSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  function updateTeammate(index: number, value: string) {
    setTeammateNames((prev) => prev.map((name, i) => (i === index ? value : name)));
  }

  function addTeammateRow() {
    setTeammateNames((prev) => (prev.length >= MAX_TEAMMATES ? prev : [...prev, '']));
  }

  function removeTeammateRow(index: number) {
    setTeammateNames((prev) => prev.filter((_, i) => i !== index));
  }

  async function handleSubmit(formEvent: FormEvent) {
    formEvent.preventDefault();
    setError(null);

    if (!teamName.trim()) return setError('Team name is required.');
    if (!startupTitle.trim()) return setError('Startup / idea title is required.');
    if (!domain) return setError('Please choose a domain.');
    if (!leaderName.trim()) return setError('Team leader name is required.');
    if (!leaderEmail.trim()) return setError('Team leader email is required.');
    if (!leaderPhone.trim()) return setError('Team leader phone is required.');
    if (!college.trim()) return setError('College / institution name is required.');
    if (!paymentReference.trim()) return setError('Enter your UPI payment reference to complete your application.');
    if (!UPI_REFERENCE_REGEX.test(paymentReference.trim())) {
      return setError('Enter a valid 12-digit UPI transaction reference ID.');
    }

    setSubmitting(true);
    try {
      await applyForThulira({
        teamName: teamName.trim(),
        startupTitle: startupTitle.trim(),
        domain,
        leaderName: leaderName.trim(),
        leaderEmail: leaderEmail.trim(),
        leaderPhone: leaderPhone.trim(),
        college: college.trim(),
        teammateNames: teammateNames.map((name) => name.trim()).filter(Boolean),
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
        className="border border-navy/15 bg-white/70 p-6 text-center shadow-card sm:p-10"
      >
        <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-full border border-gold/50 bg-gold/10 text-brown">
          <CheckCircle2 size={26} strokeWidth={1.5} />
        </div>
        <h3 className="mt-4 font-heading text-2xl font-semibold text-navy">Application Submitted</h3>
        <p className="mx-auto mt-3 max-w-md font-body text-sm leading-7 text-slate">
          Thank you, <strong>{teamName}</strong>. We&apos;ll verify your payment reference and confirm your slot for
          the Thulira Startup Exhibition by email.
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
      className="flex flex-col gap-5 border border-navy/15 bg-white/70 p-6 shadow-card sm:p-8"
    >
      <div className="text-center">
        <p className="font-body text-[10px] font-bold uppercase tracking-[0.25em] text-brown">Apply Now</p>
        <h3 className="mt-1 font-heading text-2xl font-semibold text-navy sm:text-3xl">Thulira Application</h3>
        <p className="mt-2 font-body text-xs text-slate/70">Team of 4 · Registration Fee ₹{FEE}</p>
      </div>

      <Input label="Team Name *" value={teamName} onChange={(e) => setTeamName(e.target.value)} placeholder="Enter your team name" />
      <Input
        label="Startup / Idea Title *"
        value={startupTitle}
        onChange={(e) => setStartupTitle(e.target.value)}
        placeholder="What are you building?"
      />

      <Select label="Domain *" value={domain} onChange={(e) => setDomain(e.target.value)}>
        <option value="">Choose a domain</option>
        {thuliraDomains.map((d) => (
          <option key={d.id} value={d.label}>
            {d.label}
          </option>
        ))}
      </Select>

      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
        <Input label="Team Leader Name *" value={leaderName} onChange={(e) => setLeaderName(e.target.value)} placeholder="Full name" />
        <Input
          label="Team Leader Email *"
          type="email"
          value={leaderEmail}
          onChange={(e) => setLeaderEmail(e.target.value)}
          placeholder="you@example.com"
        />
        <Input
          label="Team Leader Phone *"
          value={leaderPhone}
          onChange={(e) => setLeaderPhone(e.target.value)}
          placeholder="10-digit mobile number"
        />
        <Input
          label="College / Institution *"
          value={college}
          onChange={(e) => setCollege(e.target.value)}
          placeholder="Your college name"
        />
      </div>

      <div className="flex flex-col gap-2">
        <p className="font-body text-xs font-semibold uppercase tracking-wide text-slate/70">
          Other Teammates (up to {MAX_TEAMMATES}, optional)
        </p>
        {teammateNames.map((name, index) => (
          <div key={index} className="flex items-end gap-2">
            <Input value={name} onChange={(e) => updateTeammate(index, e.target.value)} placeholder="Teammate full name" className="flex-1" />
            {teammateNames.length > 1 && (
              <button
                type="button"
                onClick={() => removeTeammateRow(index)}
                className="flex h-11 w-11 shrink-0 items-center justify-center border border-navy/25 text-slate hover:border-red-700 hover:text-red-700"
                aria-label="Remove teammate"
              >
                <X size={16} />
              </button>
            )}
          </div>
        ))}
        {teammateNames.length < MAX_TEAMMATES && (
          <Button variant="outline" size="sm" type="button" onClick={addTeammateRow} icon={<Plus size={14} />} className="self-start">
            Add Teammate
          </Button>
        )}
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
        {submitting ? 'Submitting…' : 'Submit Application'}
      </Button>
    </motion.form>
  );
}
