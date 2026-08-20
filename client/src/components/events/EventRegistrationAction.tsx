import { useState } from 'react';
import { CheckCircle2 } from 'lucide-react';
import { Button } from '@/components/ui/Button';
import { useSession } from '@/context/SessionContext';
import { ApiError } from '@/lib/apiClient';
import { registerForEvent } from '@/lib/registrationApi';
import type { EventItem } from '@/data/types';

const STATUS_LABEL: Record<string, string> = {
  submitted: 'Pending payment at the registration desk',
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

/** Register CTA for a logged-in participant — reuses their existing profile, never re-collects it. */
export function EventRegistrationAction({ event }: { event: EventItem }) {
  const { user, registrations, refresh } = useSession();
  const [showConfirm, setShowConfirm] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [justRegistered, setJustRegistered] = useState(false);

  if (!user) return null;

  const existing = registrations.find((r) => r.event_key === event.id);
  const isRegistered = Boolean(existing) || justRegistered;
  const isClosed = event.registrationStatus === 'closed';

  async function handleConfirm() {
    setSubmitting(true);
    setError(null);
    try {
      await registerForEvent(event.id);
      await refresh();
      setJustRegistered(true);
      setShowConfirm(false);
    } catch (err) {
      setError(err instanceof ApiError ? err.message : 'Something went wrong. Please try again.');
    } finally {
      setSubmitting(false);
    }
  }

  if (isRegistered) {
    return (
      <div className="mt-2 flex flex-col gap-2 border border-gold/40 bg-gold/10 p-4">
        <p className="flex items-center gap-2 font-heading text-sm font-bold uppercase tracking-wide text-brown">
          <CheckCircle2 size={16} /> You&apos;re Registered
        </p>
        <p className="font-body text-xs text-slate">
          Status: {STATUS_LABEL[existing?.status ?? 'confirmed']}
        </p>
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
      <div className="mt-2 flex flex-col gap-3 border border-navy/15 bg-white/60 p-5">
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
            {submitting ? 'Registering…' : event.registrationFee ? 'Proceed to Payment' : 'Confirm Registration'}
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
