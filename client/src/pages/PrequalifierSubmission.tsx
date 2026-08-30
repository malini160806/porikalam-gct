import { useState, type FormEvent } from 'react';
import { useParams } from 'react-router-dom';
import { motion } from 'framer-motion';
import { CheckCircle2, Plus, UploadCloud, X } from 'lucide-react';
import { PageHero } from '@/components/common/PageHero';
import { PageLoader } from '@/components/common/PageLoader';
import { Button } from '@/components/ui/Button';
import { Input, Select } from '@/components/ui/Input';
import { useEvent } from '@/hooks/useEvents';
import { submitPrequalifier } from '@/lib/prequalifierApi';
import { ApiError } from '@/lib/apiClient';
import NotFound from './NotFound';

export default function PrequalifierSubmission() {
  const { eventId } = useParams<{ eventId: string }>();
  const { event, loading } = useEvent(eventId);

  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [teammateUsernames, setTeammateUsernames] = useState<string[]>(['']);
  const [problemStatement, setProblemStatement] = useState('');
  const [pptFile, setPptFile] = useState<File | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [submitting, setSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  if (loading) return <PageLoader />;
  if (!event) return <NotFound />;

  const isTeamEvent = event.format === 'team';
  const teamSizeLimit = Number.parseInt(event.teamSize, 10);
  const maxTeammates = Number.isFinite(teamSizeLimit) ? Math.max(teamSizeLimit - 1, 0) : undefined;
  const minTeamSize = event.minTeamSize ?? 2;
  const minTeammates = Math.max(minTeamSize - 1, 0);
  const problemStatementOptions = event.problemStatements ?? [];

  function updateTeammate(index: number, value: string) {
    setTeammateUsernames((prev) => prev.map((username, i) => (i === index ? value : username)));
  }

  function addTeammateRow() {
    setTeammateUsernames((prev) => (maxTeammates !== undefined && prev.length >= maxTeammates ? prev : [...prev, '']));
  }

  function removeTeammateRow(index: number) {
    setTeammateUsernames((prev) => prev.filter((_, i) => i !== index));
  }

  async function handleSubmit(formEvent: FormEvent) {
    formEvent.preventDefault();
    setError(null);

    if (!username.trim()) return setError('Your username is required.');
    if (!email.trim()) return setError('Your email ID is required.');

    let filledTeammates: string[] = [];
    if (isTeamEvent) {
      filledTeammates = teammateUsernames.map((value) => value.trim()).filter(Boolean);
      if (filledTeammates.length < minTeammates) {
        return setError(
          `Add at least ${minTeammates} teammate${minTeammates === 1 ? '' : 's'} — this event needs teams of ${minTeamSize} to ${event!.teamSize}.`,
        );
      }
    }

    if (problemStatementOptions.length > 0 && !problemStatement) {
      return setError('Please choose a problem statement.');
    }

    if (!pptFile) return setError('Please upload your PPT to submit.');

    setSubmitting(true);
    try {
      await submitPrequalifier(event!.id, {
        username: username.trim(),
        email: email.trim(),
        teammateUsernames: filledTeammates,
        problemStatement: problemStatement || undefined,
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
      <PageHero
        title="Prequalifier Round"
        subtitle={`Prequalifier participation for ${event.title}`}
      />

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

              <h2 className="mt-4 font-heading text-2xl font-semibold text-navy sm:text-3xl">
                Submission Received
              </h2>

              <p className="mx-auto mt-4 max-w-md font-body text-sm leading-7 text-slate sm:text-base">
                Thank you for participating in the prequalifier round for <strong>{event.title}</strong>. We will
                review your submission and update the results on the website&apos;s leaderboard page and via email.
              </p>

              <p className="mt-3 font-body text-sm font-semibold text-navy">
                Please check your email — a confirmation has been sent to {email}.
              </p>

              <p className="mt-5 font-heading text-xl font-bold text-brown">
                Stay tuned!!
              </p>

              <Button to={`/events/${event.id}`} variant="outline" size="md" className="mt-8">
                Back to {event.title}
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
                  Hackonex Prequalifier
                </p>
                <h2 className="mt-1 font-heading text-2xl font-semibold text-navy sm:text-3xl">
                  Prequalifier Participation for {event.title}
                </h2>
              </div>

              <Input
                label={isTeamEvent ? 'Team Leader Username *' : 'Your Username *'}
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                placeholder="Your Porikkalam username"
              />

              <Input
                label="Your Email ID *"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="you@example.com"
              />

              {isTeamEvent && (
                <div className="flex flex-col gap-2">
                  <p className="font-body text-xs font-semibold uppercase tracking-wide text-slate/70">
                    Other Participants&apos; Usernames — teams of {minTeamSize} to {event.teamSize} total
                    (including you)
                  </p>
                  {teammateUsernames.map((teammateUsername, index) => (
                    <div key={index} className="flex items-end gap-2">
                      <Input
                        value={teammateUsername}
                        onChange={(e) => updateTeammate(index, e.target.value)}
                        placeholder="Existing Porikkalam username"
                        className="flex-1"
                      />
                      {teammateUsernames.length > 1 && (
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
                  {(maxTeammates === undefined || teammateUsernames.length < maxTeammates) && (
                    <Button
                      variant="outline"
                      size="sm"
                      type="button"
                      onClick={addTeammateRow}
                      icon={<Plus size={14} />}
                      className="self-start"
                    >
                      Add Teammate
                    </Button>
                  )}
                </div>
              )}

              {problemStatementOptions.length > 0 ? (
                <Select
                  label="Problem Statement *"
                  value={problemStatement}
                  onChange={(e) => setProblemStatement(e.target.value)}
                >
                  <option value="">Choose a problem statement</option>
                  {problemStatementOptions.map((statement) => (
                    <option key={statement} value={statement}>
                      {statement}
                    </option>
                  ))}
                </Select>
              ) : (
                <p className="border border-navy/15 bg-cream/60 p-3 font-body text-xs text-slate/70">
                  Problem statements will be announced soon — check back before submitting.
                </p>
              )}

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
                {pptFile && (
                  <span className="font-body text-xs text-slate/70">Selected: {pptFile.name}</span>
                )}
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
