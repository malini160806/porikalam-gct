import { useParams } from 'react-router-dom';
import { motion } from 'framer-motion';
import { PageHero } from '@/components/common/PageHero';
import { Badge } from '@/components/ui/Badge';
import { Button } from '@/components/ui/Button';
import { PageLoader } from '@/components/common/PageLoader';
import { getEventIconComponent } from '@/components/icons/EventIcons';
import { EVENT_CATEGORY_LABELS } from '@/data/eventMeta';
import { useEvent } from '@/hooks/useEvents';
import NotFound from './NotFound';

function DetailRow({ label, value }: { label: string; value: string }) {
  return (
    <div className="flex flex-col gap-1 border-b border-navy/10 pb-3 last:border-b-0 last:pb-0">
      <span className="font-body text-xs font-semibold uppercase tracking-wider text-slate">
        {label}
      </span>
      <span className="font-body text-sm text-navy">{value}</span>
    </div>
  );
}

export default function EventDetail() {
  const { eventId } = useParams<{ eventId: string }>();
  const { event, loading } = useEvent(eventId);

  if (loading) {
    return <PageLoader />;
  }

  if (!event) {
    return <NotFound />;
  }

  const Icon = getEventIconComponent(event.icon);

  return (
    <>
      <PageHero title={event.title} subtitle={EVENT_CATEGORY_LABELS[event.category]} />

      <section className="bg-cream py-20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid gap-10 lg:grid-cols-[2fr_1fr]">
            <motion.div
              initial={{ opacity: 0, y: 24 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
            >
              <div className="mb-6 flex h-20 w-20 items-center justify-center border border-brown/40 bg-white/50 p-3 text-brown shadow-[0_0_18px_-4px_rgba(139,115,51,0.4)]">
                <Icon className="h-full w-full" />
              </div>

              <div className="flex flex-wrap gap-2">
                <Badge variant="navy">{EVENT_CATEGORY_LABELS[event.category]}</Badge>
                <Badge variant="gold">{event.eligibility}</Badge>
                {event.prequalifierRequired ? (
                  <Badge variant="navy">Prequalifier Required</Badge>
                ) : (
                  <Badge variant="outline">No Prequalifier</Badge>
                )}
              </div>

              <p className="mt-6 font-body text-base leading-relaxed text-slate">
                {event.description}
              </p>

              {event.primaryDomains && event.primaryDomains.length > 0 && (
                <p className="mt-4 font-body text-xs text-slate/70">
                  <span className="font-semibold uppercase tracking-wider text-brown">Primary Domains: </span>
                  {event.primaryDomains.join(', ')} — informational only, open to every department.
                </p>
              )}

              {event.whyIncluded && (
                <div className="mt-8 border-t border-navy/10 pt-6">
                  <h3 className="font-heading text-lg font-semibold tracking-wide text-navy">
                    Why This Event Is Included
                  </h3>
                  <p className="mt-2 font-body text-sm leading-relaxed text-slate">{event.whyIncluded}</p>
                </div>
              )}
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 24 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.1 }}
              className="flex flex-col gap-4 border border-navy/15 bg-white/40 p-6"
            >
              <DetailRow label="Eligibility" value={event.eligibility} />
              <DetailRow
                label="Team Size"
                value={event.format === 'team' ? `Team — ${event.teamSize}` : 'Individual'}
              />
              <DetailRow
                label="Type"
                value={event.formatMode === 'competition' ? 'Competition' : 'Participation'}
              />
              <DetailRow label="Prequalifier" value={event.prequalifierRequired ? 'Required' : 'Not Required'} />
              <DetailRow label="Duration" value={event.duration} />
              <DetailRow label="Expected Participants" value={String(event.expectedParticipants)} />
              <DetailRow label="Venue" value={event.venue} />
              {event.resources && <DetailRow label="Resources" value={event.resources} />}
              {event.budget && <DetailRow label="Budget" value={event.budget} />}
              {event.prizePool && <DetailRow label="Prize Pool" value={event.prizePool} />}
              {event.registrationFee && <DetailRow label="Registration Fee" value={event.registrationFee} />}

              <Button
                to={`/participate?event=${event.id}`}
                variant="primary"
                size="lg"
                className="mt-2 w-full"
              >
                Register for this Event
              </Button>
            </motion.div>
          </div>
        </div>
      </section>
    </>
  );
}
