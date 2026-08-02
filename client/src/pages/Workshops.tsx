import { PageHero } from '@/components/common/PageHero';
import { EventCard } from '@/components/cards/EventCard';
import { events } from '@/data/events';

export default function Workshops() {
  const workshops = events.filter((event) => event.category === 'workshop');

  return (
    <>
      <PageHero title="Workshops" subtitle="Hands-on sessions to build skills beyond the competition floor." />

      <section className="bg-cream py-24">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          {workshops.length > 0 ? (
            <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {workshops.map((event, index) => (
                <EventCard key={event.id} event={event} index={index} />
              ))}
            </div>
          ) : (
            <p className="text-center font-body text-sm text-slate">
              Workshop details will be announced soon. Check back later.
            </p>
          )}
        </div>
      </section>
    </>
  );
}
