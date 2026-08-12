import { EventCard } from '@/components/cards/EventCard';
import { SectionHeading } from '@/components/ui/SectionHeading';
import { Button } from '@/components/ui/Button';
import { useEvents } from '@/hooks/useEvents';

export function EventCategories() {
  const { events, loading } = useEvents();
  const featuredEvents = events.slice(0, 6);

  return (
    <section className="relative bg-navy py-24">
      <div className="absolute inset-0 bp-grid-bg opacity-[0.25]" />
      <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <SectionHeading
          eyebrow="What's In Store"
          title="Featured Events"
          subtitle="A first look at the arenas of Porikkalam 2026 — every event, pulled straight from the official event list."
          tone="dark"
        />

        {!loading && (
          <div className="mt-14 grid grid-cols-1 gap-6 lg:grid-cols-2">
            {featuredEvents.map((event, index) => (
              <EventCard key={event.id} event={event} index={index} />
            ))}
          </div>
        )}

        <div className="mt-14 flex justify-center">
          <Button to="/events" variant="primary" size="md">
            View All Events
          </Button>
        </div>
      </div>
    </section>
  );
}
