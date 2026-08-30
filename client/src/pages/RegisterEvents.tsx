import { useMemo, useState } from 'react';
import { Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import {
  CheckCircle2,
  Wallet,
  Users,
  ShoppingCart,
  Plus,
  X,
  ArrowRight,
  Lock,
  AlertTriangle,
} from 'lucide-react';
import { PageHero } from '@/components/common/PageHero';
import { PageLoader } from '@/components/common/PageLoader';
import { Button } from '@/components/ui/Button';
import { Input } from '@/components/ui/Input';
import { useEvents } from '@/hooks/useEvents';
import { useSession } from '@/context/SessionContext';
import { registerForEvent } from '@/lib/registrationApi';
import { ApiError } from '@/lib/apiClient';
import { SITE } from '@/constants/site';
import type { EventItem } from '@/data/types';

type CartItem = {
  teamName: string;
  teammateUsernames: string[];
  username: string;
};

type SubmitOutcome = { status: 'success' } | { status: 'error'; message: string };

/** Extracts the numeric rupee amount from strings like '₹149' or '₹1,200'; 0 for 'No fee' / unset. */
function parseFee(fee?: string): number {
  if (!fee) return 0;
  const digits = fee.replace(/[^0-9]/g, '');
  return digits ? Number(digits) : 0;
}

function formatRupees(amount: number): string {
  return `₹${amount.toLocaleString('en-IN')}`;
}

export default function RegisterEvents() {
  const { events, loading } = useEvents();
  const { user, registrations, refresh } = useSession();

  const registeredEventIds = useMemo(
    () => new Set(registrations.map((registration) => registration.event_key)),
    [registrations],
  );

  const [cart, setCart] = useState<Record<string, CartItem>>({});
  const [showPayment, setShowPayment] = useState(false);
  const [paymentReference, setPaymentReference] = useState('');
  const [submitting, setSubmitting] = useState(false);
  const [outcomes, setOutcomes] = useState<Record<string, SubmitOutcome> | null>(null);
  const [validationAttempted, setValidationAttempted] = useState(false);
  const [prequalifierNotice, setPrequalifierNotice] = useState<EventItem | null>(null);

  const selectedEvents = useMemo(
    () => events.filter((event) => cart[event.id]),
    [events, cart],
  );

  const total = useMemo(
    () => selectedEvents.reduce((sum, event) => sum + parseFee(event.registrationFee), 0),
    [selectedEvents],
  );

  function getMaxTeammates(event: EventItem): number | undefined {
    const teamSizeLimit = Number.parseInt(event.teamSize, 10);
    return Number.isFinite(teamSizeLimit) ? Math.max(teamSizeLimit - 1, 0) : undefined;
  }

  /** Minimum required teammates (team headcount minus the leader) — defaults to 1 (team of 2) when unset. */
  function getMinTeammates(event: EventItem): number {
    return Math.max((event.minTeamSize ?? 2) - 1, 0);
  }

  /** Returns a human-readable validation error for a selected event's cart item, or null if it's ready to submit. */
  function getEventError(event: EventItem, item: CartItem): string | null {
    if (event.format === 'team') {
      if (!item.username.trim()) return 'Team leader username is required.';
      if (user && item.username.trim().toLowerCase() !== user.username.toLowerCase()) {
        return `Team leader username must match your account (${user.username}).`;
      }
      if (!item.teamName.trim()) return 'Team name is required.';
      const filled = item.teammateUsernames.map((u) => u.trim()).filter(Boolean);
      const maxTeammates = getMaxTeammates(event);
      const minTeammates = getMinTeammates(event);
      const minTeamSize = event.minTeamSize ?? 2;
      if (filled.length < minTeammates) {
        return `Add at least ${minTeammates} teammate${minTeammates === 1 ? '' : 's'} — this event needs teams of ${minTeamSize} to ${event.teamSize}.`;
      }
      if (maxTeammates !== undefined && filled.length > maxTeammates) {
        return `Too many teammates — this event allows teams of up to ${event.teamSize}.`;
      }
      return null;
    }

    if (!item.username.trim()) return 'Your username is required.';
    if (user && item.username.trim().toLowerCase() !== user.username.toLowerCase()) {
      return `Username must match your account (${user.username}).`;
    }
    return null;
  }

  function toggleEvent(event: EventItem) {
    if (event.prequalifierRequired && !cart[event.id]) {
      setPrequalifierNotice(event);
      return;
    }
    setOutcomes(null);
    setShowPayment(false);
    setCart((prev) => {
      if (prev[event.id]) {
        const next = { ...prev };
        delete next[event.id];
        return next;
      }
      return {
        ...prev,
        [event.id]: { teamName: '', teammateUsernames: [''], username: user?.username ?? '' },
      };
    });
  }

  function updateTeamName(eventId: string, value: string) {
    setCart((prev) => ({ ...prev, [eventId]: { ...prev[eventId], teamName: value } }));
  }

  function updateUsername(eventId: string, value: string) {
    setCart((prev) => ({ ...prev, [eventId]: { ...prev[eventId], username: value } }));
  }

  function updateTeammate(eventId: string, index: number, value: string) {
    setCart((prev) => ({
      ...prev,
      [eventId]: {
        ...prev[eventId],
        teammateUsernames: prev[eventId].teammateUsernames.map((username, i) => (i === index ? value : username)),
      },
    }));
  }

  function addTeammateRow(eventId: string, maxTeammates?: number) {
    setCart((prev) => {
      const item = prev[eventId];
      if (maxTeammates !== undefined && item.teammateUsernames.length >= maxTeammates) return prev;
      return { ...prev, [eventId]: { ...item, teammateUsernames: [...item.teammateUsernames, ''] } };
    });
  }

  function removeTeammateRow(eventId: string, index: number) {
    setCart((prev) => ({
      ...prev,
      [eventId]: {
        ...prev[eventId],
        teammateUsernames: prev[eventId].teammateUsernames.filter((_, i) => i !== index),
      },
    }));
  }

  function handleRegisterNowClick() {
    const hasErrors = selectedEvents.some((event) => getEventError(event, cart[event.id]) !== null);
    if (hasErrors) {
      setValidationAttempted(true);
      return;
    }
    setShowPayment(true);
  }

  async function handleConfirmAndSubmit() {
    setSubmitting(true);
    const nextOutcomes: Record<string, SubmitOutcome> = {};

    for (const event of selectedEvents) {
      const item = cart[event.id];
      const isTeamEvent = event.format === 'team';
      try {
        await registerForEvent(event.id, {
          teamName: isTeamEvent ? item.teamName.trim() || undefined : undefined,
          teammateUsernames: isTeamEvent
            ? item.teammateUsernames.map((username) => username.trim()).filter(Boolean)
            : undefined,
          paymentReference: parseFee(event.registrationFee) > 0 ? paymentReference.trim() : undefined,
        });
        nextOutcomes[event.id] = { status: 'success' };
      } catch (err) {
        nextOutcomes[event.id] = {
          status: 'error',
          message: err instanceof ApiError ? err.message : 'Something went wrong. Please try again.',
        };
      }
    }

    setOutcomes(nextOutcomes);
    setSubmitting(false);
    void refresh();
  }

  if (loading) {
    return <PageLoader />;
  }

  const allSucceeded = outcomes && Object.values(outcomes).every((outcome) => outcome.status === 'success');

  return (
    <div className="relative">
      <PageHero
        title="Register for Events"
        subtitle="Select every event you want to compete in, then pay once for everything you've chosen."
      />

      <section className="relative bg-cream py-14 sm:py-16">
        <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">

          {outcomes ? (
            /* =====================================================
                RESULT SUMMARY
            ====================================================== */
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="mx-auto max-w-2xl border border-navy/15 bg-white/70 p-6 shadow-card sm:p-10"
            >
              <div className="text-center">
                <div
                  className={`mx-auto flex h-14 w-14 items-center justify-center rounded-full border ${
                    allSucceeded ? 'border-gold/50 bg-gold/10 text-brown' : 'border-navy/20 bg-navy/5 text-navy'
                  }`}
                >
                  <CheckCircle2 size={26} strokeWidth={1.5} />
                </div>
                <h2 className="mt-4 font-heading text-2xl font-semibold text-navy sm:text-3xl">
                  {allSucceeded ? 'Registration Submitted' : 'Registration Partially Completed'}
                </h2>
                <p className="mx-auto mt-2 max-w-md font-body text-sm text-slate">
                  We&apos;ll confirm each registration once your payment reference is verified.
                </p>
              </div>

              <div className="mt-6 flex flex-col gap-3">
                {selectedEvents.map((event) => {
                  const outcome = outcomes[event.id];
                  return (
                    <div
                      key={event.id}
                      className={`flex items-center justify-between gap-4 border p-4 font-body text-sm ${
                        outcome.status === 'success'
                          ? 'border-gold/30 bg-gold/5 text-navy'
                          : 'border-red-700/30 bg-red-50 text-red-800'
                      }`}
                    >
                      <span className="font-semibold">{event.title}</span>
                      <span className="text-xs uppercase tracking-wide">
                        {outcome.status === 'success' ? 'Submitted' : outcome.message}
                      </span>
                    </div>
                  );
                })}
              </div>

              <div className="mt-8 flex flex-col gap-3 sm:flex-row">
                <Button to="/dashboard?tab=registrations" variant="primary" size="md" className="flex-1">
                  View My Registrations
                </Button>
                <Button
                  variant="outline"
                  size="md"
                  className="flex-1"
                  onClick={() => {
                    setCart({});
                    setOutcomes(null);
                    setPaymentReference('');
                  }}
                >
                  Register More Events
                </Button>
              </div>
            </motion.div>
          ) : (
            /* =====================================================
                EVENT PICKER + CART
            ====================================================== */
            <div className="grid grid-cols-1 gap-8 lg:grid-cols-[1.6fr_1fr]">

              {/* EVENT OPTIONS */}
              <div className="flex flex-col gap-4">
                <div>
                  <p className="font-body text-[10px] font-bold uppercase tracking-[0.25em] text-brown">
                    Step 1
                  </p>
                  <h2 className="mt-1 font-heading text-2xl font-semibold text-navy sm:text-3xl">
                    Choose Your Events
                  </h2>
                </div>

                {events.map((event) => {
                  const isSelected = Boolean(cart[event.id]);
                  const alreadyRegistered = registeredEventIds.has(event.id);
                  const isClosed = event.registrationStatus === 'closed';
                  const isDisabled = alreadyRegistered || isClosed;
                  const isTeamEvent = event.format === 'team';
                  const fee = parseFee(event.registrationFee);
                  const maxTeammates = getMaxTeammates(event);
                  const minTeammates = getMinTeammates(event);
                  const minTeamSize = event.minTeamSize ?? 2;
                  const item = cart[event.id];
                  const eventError = isSelected ? getEventError(event, item) : null;
                  const showError = validationAttempted && eventError !== null;

                  const requiresPrequalifier = event.prequalifierRequired && !alreadyRegistered && !isClosed;

                  return (
                    <div
                      key={event.id}
                      className={`border bg-white/70 transition-colors duration-200 ${
                        isSelected ? 'border-gold shadow-[0_10px_30px_-20px_rgba(212,175,55,0.6)]' : 'border-navy/10'
                      } ${isDisabled ? 'opacity-60' : ''}`}
                    >
                      {requiresPrequalifier ? (
                        <div className="flex flex-col items-start gap-3 p-4 sm:flex-row sm:items-center sm:gap-4 sm:p-5">
                          <div className="min-w-0 flex-1">
                            <p className="font-heading text-base font-semibold text-navy sm:text-lg">
                              {event.title}
                            </p>
                            <div className="mt-1 flex flex-wrap items-center gap-x-3 gap-y-1 font-body text-xs text-slate">
                              <span className="inline-flex items-center gap-1">
                                <Users size={12} />
                                {isTeamEvent ? `Team of ${event.teamSize}` : 'Individual'}
                              </span>
                              <span className="inline-flex items-center gap-1">
                                <Wallet size={12} />
                                {fee > 0 ? formatRupees(fee) : 'Free'}
                              </span>
                              <span className="inline-flex items-center gap-1 text-brown">
                                <AlertTriangle size={12} />
                                Prequalifier Required
                              </span>
                            </div>
                          </div>

                          <Button
                            variant="primary"
                            size="sm"
                            onClick={() => setPrequalifierNotice(event)}
                            className="shrink-0"
                          >
                            Register Here for {event.title}
                          </Button>
                        </div>
                      ) : (
                        <label
                          htmlFor={`event-${event.id}`}
                          className={`flex items-center gap-4 p-4 sm:p-5 ${isDisabled ? 'cursor-not-allowed' : 'cursor-pointer'}`}
                        >
                          <input
                            type="checkbox"
                            id={`event-${event.id}`}
                            checked={isSelected}
                            disabled={isDisabled}
                            onChange={() => !isDisabled && toggleEvent(event)}
                            className="h-4 w-4 shrink-0 accent-[#d4af37] border border-navy/40"
                          />

                          <div className="min-w-0 flex-1">
                            <p className="font-heading text-base font-semibold text-navy sm:text-lg">
                              {event.title}
                            </p>
                            <div className="mt-1 flex flex-wrap items-center gap-x-3 gap-y-1 font-body text-xs text-slate">
                              <span className="inline-flex items-center gap-1">
                                <Users size={12} />
                                {isTeamEvent ? `Team of ${event.teamSize}` : 'Individual'}
                              </span>
                              <span className="inline-flex items-center gap-1">
                                <Wallet size={12} />
                                {fee > 0 ? formatRupees(fee) : 'Free'}
                              </span>
                            </div>
                          </div>

                          {alreadyRegistered ? (
                            <span className="shrink-0 rounded-full border border-gold/40 bg-gold/10 px-3 py-1 font-body text-[10px] font-bold uppercase tracking-wide text-brown">
                              Registered
                            </span>
                          ) : isClosed ? (
                            <span className="shrink-0 rounded-full border border-navy/20 bg-navy/5 px-3 py-1 font-body text-[10px] font-bold uppercase tracking-wide text-navy/60">
                              Closed
                            </span>
                          ) : null}
                        </label>
                      )}

                      {/* TEAM MEMBER BOX */}
                      <AnimatePresence>
                        {isSelected && isTeamEvent && item && (
                          <motion.div
                            initial={{ opacity: 0, height: 0 }}
                            animate={{ opacity: 1, height: 'auto' }}
                            exit={{ opacity: 0, height: 0 }}
                            transition={{ duration: 0.25 }}
                            className="overflow-hidden border-t border-navy/10 bg-cream/60"
                          >
                            <div className="flex flex-col gap-3 p-4 sm:p-5">
                              <p className="font-body text-xs font-semibold uppercase tracking-wide text-slate/70">
                                Team Details — this event needs teams of {minTeamSize} to {event.teamSize} members.
                                Enter every participant&apos;s username, including yourself as team leader.
                              </p>

                              <Input
                                label="Team Leader Username *"
                                value={item.username}
                                onChange={(e) => updateUsername(event.id, e.target.value)}
                                placeholder="Your Porikkalam username"
                              />

                              <Input
                                label="Team Name *"
                                value={item.teamName}
                                onChange={(e) => updateTeamName(event.id, e.target.value)}
                                placeholder="Enter your team name"
                              />

                              <div className="flex flex-col gap-2">
                                {item.teammateUsernames.map((username, index) => (
                                  <div key={index} className="flex items-end gap-2">
                                    <Input
                                      label={index === 0 ? 'Teammate Username(s) *' : undefined}
                                      value={username}
                                      onChange={(e) => updateTeammate(event.id, index, e.target.value)}
                                      placeholder="Existing Porikkalam username"
                                      className="flex-1"
                                    />
                                    {item.teammateUsernames.length > 1 && (
                                      <button
                                        type="button"
                                        onClick={() => removeTeammateRow(event.id, index)}
                                        className="flex h-11 w-11 shrink-0 items-center justify-center border border-navy/25 text-slate hover:border-red-700 hover:text-red-700"
                                        aria-label="Remove teammate"
                                      >
                                        <X size={16} />
                                      </button>
                                    )}
                                  </div>
                                ))}
                              </div>

                              {(maxTeammates === undefined || item.teammateUsernames.length < maxTeammates) && (
                                <Button
                                  variant="outline"
                                  size="sm"
                                  onClick={() => addTeammateRow(event.id, maxTeammates)}
                                  icon={<Plus size={14} />}
                                  className="self-start"
                                >
                                  Add Teammate
                                </Button>
                              )}

                              <p className="font-body text-xs text-slate/60">
                                Teammates must already have a Porikkalam account — they register on the site first,
                                then you add their username here. At least {minTeammates} teammate
                                {minTeammates === 1 ? '' : 's'} {minTeammates === 1 ? 'is' : 'are'} required (team of{' '}
                                {minTeamSize} minimum).
                              </p>

                              {showError && (
                                <p className="font-body text-xs font-semibold text-red-700">{eventError}</p>
                              )}
                            </div>
                          </motion.div>
                        )}
                      </AnimatePresence>

                      {/* INDIVIDUAL PARTICIPANT BOX */}
                      <AnimatePresence>
                        {isSelected && !isTeamEvent && item && (
                          <motion.div
                            initial={{ opacity: 0, height: 0 }}
                            animate={{ opacity: 1, height: 'auto' }}
                            exit={{ opacity: 0, height: 0 }}
                            transition={{ duration: 0.25 }}
                            className="overflow-hidden border-t border-navy/10 bg-cream/60"
                          >
                            <div className="flex flex-col gap-3 p-4 sm:p-5">
                              <p className="font-body text-xs font-semibold uppercase tracking-wide text-slate/70">
                                Participant Details
                              </p>

                              <Input
                                label="Your Username *"
                                value={item.username}
                                onChange={(e) => updateUsername(event.id, e.target.value)}
                                placeholder="Your Porikkalam username"
                                error={showError ? eventError ?? undefined : undefined}
                              />
                            </div>
                          </motion.div>
                        )}
                      </AnimatePresence>
                    </div>
                  );
                })}
              </div>

              {/* CART / PAYMENT */}
              <div className="lg:sticky lg:top-24 lg:self-start">
                <div className="border border-navy/15 bg-white/80 p-5 shadow-card sm:p-6">
                  <div className="flex items-center gap-2">
                    <ShoppingCart size={18} className="text-brown" />
                    <h3 className="font-heading text-lg font-semibold tracking-wide text-navy">
                      Your Selection
                    </h3>
                  </div>

                  {selectedEvents.length === 0 ? (
                    <p className="mt-4 font-body text-sm text-slate/70">
                      Select events on the left — they&apos;ll appear here with the amount due.
                    </p>
                  ) : (
                    <div className="mt-4 flex flex-col gap-2">
                      {selectedEvents.map((event) => {
                        const fee = parseFee(event.registrationFee);
                        return (
                          <div
                            key={event.id}
                            className="flex items-center justify-between gap-3 border-b border-navy/10 py-2 font-body text-sm text-navy last:border-b-0"
                          >
                            <span className="truncate">{event.title}</span>
                            <span className="shrink-0 font-semibold">{fee > 0 ? formatRupees(fee) : 'Free'}</span>
                          </div>
                        );
                      })}
                    </div>
                  )}

                  <div className="mt-4 flex items-center justify-between border-t border-navy/15 pt-4">
                    <span className="font-body text-sm font-bold uppercase tracking-wide text-slate">
                      Total
                    </span>
                    <span className="font-heading text-2xl font-bold text-navy">
                      {formatRupees(total)}
                    </span>
                  </div>

                  {!user ? (
                    <Button to="/login" variant="primary" size="lg" className="mt-5 w-full" icon={<Lock size={14} />}>
                      Login to Register
                    </Button>
                  ) : !showPayment ? (
                    <>
                      <Button
                        variant="primary"
                        size="lg"
                        className="mt-5 w-full"
                        disabled={selectedEvents.length === 0}
                        onClick={handleRegisterNowClick}
                        icon={<ArrowRight size={14} />}
                      >
                        Register Now
                      </Button>
                      {validationAttempted &&
                        selectedEvents.some((event) => getEventError(event, cart[event.id]) !== null) && (
                          <p className="mt-2 text-center font-body text-xs text-red-700">
                            Please complete the required details for each selected event above.
                          </p>
                        )}
                    </>
                  ) : (
                    <motion.div
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      className="mt-5 flex flex-col gap-4 border-t border-navy/10 pt-5"
                    >
                      <p className="font-body text-xs font-semibold uppercase tracking-wide text-slate/70">
                        Payment
                      </p>

                      {total > 0 ? (
                        <div className="border border-gold/40 bg-gold/10 p-3">
                          <p className="font-body text-xs text-slate">
                            Pay <span className="font-semibold text-navy">{formatRupees(total)}</span> via UPI to:
                          </p>
                          <p className="font-heading text-sm font-bold text-navy">{SITE.upiId}</p>
                          <p className="font-body text-xs text-slate/70">{SITE.upiPayeeName}</p>
                        </div>
                      ) : (
                        <p className="font-body text-xs text-slate/70">
                          All selected events are free — no payment needed.
                        </p>
                      )}

                      {total > 0 && (
                        <Input
                          label="UPI Transaction / Reference ID"
                          value={paymentReference}
                          onChange={(e) => setPaymentReference(e.target.value)}
                          placeholder="e.g. 123456789012"
                        />
                      )}

                      <div className="flex gap-3">
                        <Button
                          variant="outline"
                          size="md"
                          className="flex-1"
                          disabled={submitting}
                          onClick={() => setShowPayment(false)}
                        >
                          Back
                        </Button>
                        <Button
                          variant="primary"
                          size="md"
                          className="flex-1"
                          disabled={submitting || (total > 0 && !paymentReference.trim())}
                          onClick={handleConfirmAndSubmit}
                        >
                          {submitting ? 'Submitting…' : 'Confirm & Submit'}
                        </Button>
                      </div>
                    </motion.div>
                  )}
                </div>

                <p className="mt-4 text-center font-body text-xs text-slate/60">
                  Already registered for something?{' '}
                  <Link to="/dashboard?tab=registrations" className="font-semibold text-brown hover:underline">
                    View your registrations
                  </Link>
                </p>
              </div>
            </div>
          )}
        </div>
      </section>

      <AnimatePresence>
        {prequalifierNotice && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center bg-navy-deep/70 p-4"
            onClick={() => setPrequalifierNotice(null)}
          >
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 10 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95 }}
              onClick={(e) => e.stopPropagation()}
              className="w-full max-w-sm border border-gold/40 bg-white p-6 text-center shadow-2xl"
            >
              <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-full border border-gold/50 bg-gold/10 text-brown">
                <AlertTriangle size={22} strokeWidth={1.6} />
              </div>

              <h3 className="mt-4 font-heading text-lg font-semibold text-navy">Prequalifier Required</h3>

              <p className="mt-2 font-body text-sm text-slate">
                {prequalifierNotice.title} requires a prequalifier round. Please register for{' '}
                {prequalifierNotice.title} directly from its event page.
              </p>

              <div className="mt-5 flex flex-col gap-2 sm:flex-row">
                <Button
                  variant="outline"
                  size="sm"
                  className="flex-1"
                  onClick={() => setPrequalifierNotice(null)}
                >
                  Cancel
                </Button>
                <Button to={`/events/${prequalifierNotice.id}`} variant="primary" size="sm" className="flex-1">
                  Go to {prequalifierNotice.title} Page
                </Button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
