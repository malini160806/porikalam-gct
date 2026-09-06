import { useState, type FormEvent } from 'react';
import { motion } from 'framer-motion';
import { CheckCircle2, Plus, UploadCloud, X } from 'lucide-react';
import { PageHero } from '@/components/common/PageHero';
import { Button } from '@/components/ui/Button';
import { Input } from '@/components/ui/Input';
import { submitThuliraPrequalifier } from '@/lib/thuliraApi';
import { ApiError } from '@/lib/apiClient';

const MAX_TEAMMATES = 3; // Team of 4 total, including the leader.

export default function ThuliraPrequalifierSubmission() {
  const [teamName, setTeamName] = useState('');
  const [startupTitle, setStartupTitle] = useState('');
  const [leaderName, setLeaderName] = useState('');
  const [leaderEmail, setLeaderEmail] = useState('');
  const [leaderPhone, setLeaderPhone] = useState('');
  const [teammateNames, setTeammateNames] = useState<string[]>(['']);
  const [pptFile, setPptFile] = useState<File | null>(null);
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
    if (!leaderName.trim()) return setError('Team leader name is required.');
    if (!leaderEmail.trim()) return setError('Team leader email is required.');
    if (!leaderPhone.trim()) return setError('Team leader phone is required.');
    if (!pptFile) return setError('Please upload your PPT to submit.');

    setSubmitting(true);
    try {
      await submitThuliraPrequalifier({
        teamName: teamName.trim(),
        startupTitle: startupTitle.trim(),
        leaderName: leaderName.trim(),
        leaderEmail: leaderEmail.trim(),
        leaderPhone: leaderPhone.trim(),
        teammateNames: teammateNames.map((name) => name.trim()).filter(Boolean),
        ppt: pptFile,
      });
      setSubmitted(true);
    } catch (err) {
      setError(err instanceof ApiError ? err.message : 'Something went wrong. Please try again.');
    } finally {
      setSubmitting(false);
    }
  }

  return (
    <div className="relative">
      <PageHero title="Thulira Prequalifier" subtitle="Prequalifier round submission for the Thulira Startup Exhibition" />

      <section className="relative bg-cream py-14 sm:py-16">
        <div className="mx-auto max-w-2xl px-4 sm:px-6 lg:px-8">
          {submitted ? (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="border border-navy/15 bg-white/70 p-6 text-center shadow-card sm:p-10"
            >
              <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-full border border-gold/50 bg-gold/10 text-brown">
                <CheckCircle2 size={26} strokeWidth={1.5} />
              </div>

              <h2 className="mt-4 font-heading text-2xl font-semibold text-navy sm:text-3xl">Submission Received</h2>

              <p className="mx-auto mt-4 max-w-md font-body text-sm leading-7 text-slate sm:text-base">
                Thank you, <strong>{teamName}</strong>. We will review your prequalifier submission and update the
                results on the website&apos;s leaderboard page and via email.
              </p>

              <p className="mt-3 font-body text-sm font-semibold text-navy">
                Please check your email — a confirmation has been sent to {leaderEmail}.
              </p>

              <p className="mt-5 font-heading text-xl font-bold text-brown">Stay tuned!!</p>

              <Button to="/thulira" variant="outline" size="md" className="mt-8">
                Back to Thulira
              </Button>
            </motion.div>
          ) : (
            <motion.form
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              onSubmit={handleSubmit}
              className="flex flex-col gap-5 border border-navy/15 bg-white/70 p-6 shadow-card sm:p-8"
            >
              <div className="text-center">
                <p className="font-body text-[10px] font-bold uppercase tracking-[0.25em] text-brown">
                  Thulira Prequalifier
                </p>
                <h2 className="mt-1 font-heading text-2xl font-semibold text-navy sm:text-3xl">
                  Prequalifier Round Submission
                </h2>
              </div>

              <Input label="Team Name *" value={teamName} onChange={(e) => setTeamName(e.target.value)} placeholder="Enter your team name" />
              <Input
                label="Startup / Idea Title *"
                value={startupTitle}
                onChange={(e) => setStartupTitle(e.target.value)}
                placeholder="What are you building?"
              />

              <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                <Input label="Team Leader Name *" value={leaderName} onChange={(e) => setLeaderName(e.target.value)} placeholder="Full name" />
                <Input
                  label="Team Leader Phone *"
                  value={leaderPhone}
                  onChange={(e) => setLeaderPhone(e.target.value)}
                  placeholder="10-digit mobile number"
                />
              </div>

              <Input
                label="Team Leader Email *"
                type="email"
                value={leaderEmail}
                onChange={(e) => setLeaderEmail(e.target.value)}
                placeholder="you@example.com"
              />

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

              <p className="border border-navy/15 bg-cream/60 p-3 font-body text-xs text-slate/70">
                Problem statements will be announced soon — check back before submitting.
              </p>

              <label className="flex flex-col gap-1.5 text-left">
                <span className="font-body text-xs font-semibold uppercase tracking-wider text-slate">
                  Upload Your PPT *
                </span>
                <div className="flex items-center gap-3 border border-navy/25 bg-cream/60 px-4 py-3">
                  <UploadCloud size={18} className="shrink-0 text-brown" />
                  <input
                    type="file"
                    accept=".ppt,.pptx"
                    onChange={(e) => setPptFile(e.target.files?.[0] ?? null)}
                    className="w-full font-body text-sm text-navy file:mr-3 file:border-0 file:bg-gold/20 file:px-3 file:py-1.5 file:font-semibold file:text-brown"
                  />
                </div>
                {pptFile && <span className="font-body text-xs text-slate/70">Selected: {pptFile.name}</span>}
              </label>

              {error && <p className="font-body text-sm font-semibold text-red-700">{error}</p>}

              <Button variant="primary" size="lg" type="submit" disabled={submitting} className="mt-2 w-full">
                {submitting ? 'Submitting…' : 'Submit Prequalifier Entry'}
              </Button>
            </motion.form>
          )}
        </div>
      </section>
    </div>
  );
}
