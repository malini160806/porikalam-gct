import { useState } from 'react';
import { CheckCircle2, Plus, X } from 'lucide-react';
import { Button } from '@/components/ui/Button';
import { Input } from '@/components/ui/Input';
import { useSession } from '@/context/SessionContext';
import { ApiError } from '@/lib/apiClient';
import { registerForEvent } from '@/lib/registrationApi';
import { SITE } from '@/constants/site';
import type { EventItem } from '@/data/types';
import type { RegistrationDto } from '@/types/api';

const STATUS_LABEL: Record<string, string> = {
  submitted: 'Pending payment verification',
  confirmed: 'Confirmed',
  cancelled: 'Cancelled',
};

function DetailLine({ label, value }: { label: string; value: string }) {
  return (
    <div className="flex justify-between gap-4 border-b border-navy/10 py-1.5 last:border-b-0">
      <dt className="font-body text-xs font-semibold uppercase tracking-wide text-slate/70">{label}</dt>
      <dd className="font-body text-sm text-navy">{value}</dd>
    </div>
  );
}

function TeamRoster({ registration }: { registration: RegistrationDto }) {
  if (registration.teammates.length <= 1) return null;
  return (
    <div className="mt-1 flex flex-col gap-1 border-t border-gold/20 pt-2">
      <p className="font-body text-xs font-semibold uppercase tracking-wide text-slate/70">
        Team{registration.team_name ? `: ${registration.team_name}` : ''}
      </p>
      {registration.teammates.map((teammate) => (
        <p key={teammate.user_id} className="font-body text-xs text-slate">
          {teammate.name} <span className="text-slate/60">({teammate.username})</span>
          {teammate.role === 'leader' && <span className="text-brown"> · Leader</span>}
        </p>
      ))}
    </div>
  );
}

/** Register CTA for a logged-in participant — reuses their existing profile, never re-collects it. */
export function EventRegistrationAction({ event }: { event: EventItem }) {
  const { user, registrations, refresh } = useSession();
  const [showConfirm, setShowConfirm] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [result, setResult] = useState<RegistrationDto | null>(null);
  const [teamName, setTeamName] = useState('');
  const [teammateUsernames, setTeammateUsernames] = useState<string[]>(['']);
  const [paymentReference, setPaymentReference] = useState('');

  if (!user) {
    return (
      <Button to="/login" variant="primary" size="lg" className="mt-2 w-full">
        Login to Register
      </Button>
    );
  }

  const existing = registrations.find((r) => r.event_key === event.id);
  const displayRegistration = existing ?? result;
  const isRegistered = Boolean(displayRegistration);
  const isClosed = event.registrationStatus === 'closed';
  const isTeamEvent = event.format === 'team';

  const teamSizeLimit = Number.parseInt(event.teamSize, 10);
  const maxTeammates = isTeamEvent && Number.isFinite(teamSizeLimit) ? Math.max(teamSizeLimit - 1, 0) : undefined;

  function updateTeammate(index: number, value: string) {
    setTeammateUsernames((prev) => prev.map((username, i) => (i === index ? value : username)));
  }

  function addTeammateRow() {
    setTeammateUsernames((prev) => (maxTeammates !== undefined && prev.length >= maxTeammates ? prev : [...prev, '']));
  }

  function removeTeammateRow(index: number) {
    setTeammateUsernames((prev) => prev.filter((_, i) => i !== index));
  }

  async function handleConfirm() {
    setSubmitting(true);
    setError(null);
    try {
      const registration = await registerForEvent(event.id, {
        teamName: isTeamEvent ? teamName.trim() || undefined : undefined,
        teammateUsernames: isTeamEvent ? teammateUsernames.map((u) => u.trim()).filter(Boolean) : undefined,
        paymentReference: event.registrationFee ? paymentReference.trim() : undefined,
      });
      setResult(registration);
      setShowConfirm(false);
      void refresh();
    } catch (err) {
      setError(err instanceof ApiError ? err.message : 'Something went wrong. Please try again.');
    } finally {
      setSubmitting(false);
    }
  }

  if (isRegistered && displayRegistration) {
    return (
      <div className="mt-2 flex flex-col gap-2 border border-gold/40 bg-gold/10 p-4">
        <p className="flex items-center gap-2 font-heading text-sm font-bold uppercase tracking-wide text-brown">
          <CheckCircle2 size={16} /> You&apos;re Registered
        </p>
        <p className="font-body text-xs text-slate">Status: {STATUS_LABEL[displayRegistration.status]}</p>
        {displayRegistration.status === 'submitted' && (
          <p className="font-body text-xs text-slate/70">
            We&apos;ll confirm your registration once your payment reference is verified.
          </p>
        )}
        <TeamRoster registration={displayRegistration} />
        <Button to="/dashboard?tab=registrations" variant="outline" size="sm" className="mt-1 w-full">
          View Registration
        </Button>
      </div>
    );
  }

  if (isClosed) {
    return (
      <Button variant="outline" size="lg" className="mt-2 w-full" disabled>
        Registrations Closed
      </Button>
    );
  }

  if (showConfirm) {
    return (
      <div className="mt-2 flex flex-col gap-4 border border-navy/15 bg-white/60 p-5">
        <p className="font-heading text-sm font-bold uppercase tracking-wide text-navy">Confirm Registration</p>
        <dl>
          <DetailLine label="Event" value={event.title} />
          <DetailLine label="Participant" value={user.display_name} />
          <DetailLine label="Username" value={user.username} />
          <DetailLine label="College" value={user.college ?? '—'} />
          <DetailLine label="Department" value={user.department ?? '—'} />
          <DetailLine label="Year" value={user.year_of_study ?? '—'} />
          {event.registrationFee && <DetailLine label="Registration Fee" value={event.registrationFee} />}
        </dl>

        {isTeamEvent && (
          <div className="flex flex-col gap-3 border-t border-navy/10 pt-4">
            <p className="font-body text-xs font-semibold uppercase tracking-wide text-slate/70">
              Team Details {maxTeammates !== undefined && `(up to ${maxTeammates} teammate${maxTeammates === 1 ? '' : 's'})`}
            </p>
            <Input
              label="Team Name (optional)"
              value={teamName}
              onChange={(e) => setTeamName(e.target.value)}
              placeholder="Enter your team name"
            />
            <div className="flex flex-col gap-2">
              {teammateUsernames.map((username, index) => (
                <div key={index} className="flex items-end gap-2">
                  <Input
                    label={index === 0 ? 'Teammate Username(s)' : undefined}
                    value={username}
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
            </div>
            {(maxTeammates === undefined || teammateUsernames.length < maxTeammates) && (
              <Button variant="outline" size="sm" onClick={addTeammateRow} icon={<Plus size={14} />} className="self-start">
                Add Teammate
              </Button>
            )}
            <p className="font-body text-xs text-slate/60">
              Teammates must already have a Porikkalam account — they register on the site first, then you add their
              username here.
            </p>
          </div>
        )}

        {event.registrationFee && (
          <div className="flex flex-col gap-3 border-t border-navy/10 pt-4">
            <p className="font-body text-xs font-semibold uppercase tracking-wide text-slate/70">Payment</p>
            <div className="border border-gold/40 bg-gold/10 p-3">
              <p className="font-body text-xs text-slate">
                Pay <span className="font-semibold text-navy">{event.registrationFee}</span> via UPI to:
              </p>
              <p className="font-heading text-sm font-bold text-navy">{SITE.upiId}</p>
              <p className="font-body text-xs text-slate/70">{SITE.upiPayeeName}</p>
            </div>
            <Input
              label="UPI Transaction / Reference ID"
              value={paymentReference}
              onChange={(e) => setPaymentReference(e.target.value)}
              placeholder="e.g. 123456789012"
            />
          </div>
        )}

        {error && <p className="font-body text-xs text-red-700">{error}</p>}

        <div className="flex gap-3">
          <Button
            variant="outline"
            size="md"
            className="flex-1"
            disabled={submitting}
            onClick={() => setShowConfirm(false)}
          >
            Back
          </Button>
          <Button variant="primary" size="md" className="flex-1" disabled={submitting} onClick={handleConfirm}>
            {submitting ? 'Registering…' : event.registrationFee ? 'Submit for Verification' : 'Confirm Registration'}
          </Button>
        </div>
      </div>
    );
  }

  return (
    <Button variant="primary" size="lg" className="mt-2 w-full" onClick={() => setShowConfirm(true)}>
      Register for this Event
    </Button>
  );
}
