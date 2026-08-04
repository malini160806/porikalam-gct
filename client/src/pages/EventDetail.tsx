import { useParams } from 'react-router-dom';
import { motion } from 'framer-motion';
import { PageHero } from '@/components/common/PageHero';
import { Badge } from '@/components/ui/Badge';
import { Button } from '@/components/ui/Button';
import { getEventIconComponent } from '@/components/icons/EventIcons';
import { events, EVENT_CATEGORY_LABELS } from '@/data/events';
import NotFound from './NotFound';

const TBA = 'To Be Announced';

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
  const event = events.find((e) => e.id === eventId);

  if (!event) {
    return <NotFound />;
  }

  const Icon = getEventIconComponent(event.icon);

  return (
    <>
      <PageHero title={event.title} subtitle={event.department} />

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
                {event.tags.map((tag) => (
                  <Badge key={tag} variant={tag === 'Open to All' ? 'gold' : 'navy'}>
                    {tag}
                  </Badge>
                ))}
              </div>

              <p className="mt-6 font-body text-base leading-relaxed text-slate">
                {event.description}
              </p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 24 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.1 }}
              className="flex flex-col gap-4 border border-navy/15 bg-white/40 p-6"
            >
              <DetailRow label="Eligibility" value={event.department} />
              <DetailRow label="Participation" value={event.format === 'team' ? 'Team' : 'Individual'} />
              <DetailRow
                label="Type"
                value={event.formatMode === 'competition' ? 'Competition' : 'Participation'}
              />
              <DetailRow label="Duration" value={event.duration} />
              <DetailRow label="Venue" value={event.venue} />
              <DetailRow
                label="Prequalifier"
                value={event.prequalifierRequired ? 'Required' : 'Not Required'}
              />
              <DetailRow label="Date" value={TBA} />
              <DetailRow label="Prize" value={TBA} />

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
