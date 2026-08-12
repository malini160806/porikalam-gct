import { useMemo, useState } from 'react';
import { motion } from 'framer-motion';
import { PageHero } from '@/components/common/PageHero';
import { Tabs } from '@/components/ui/Tabs';
import { SearchBar } from '@/components/ui/SearchBar';
import { EventCard } from '@/components/cards/EventCard';
import { events, EVENT_FILTERS } from '@/data/events';
import type { EventItem } from '@/data/types';
import eventsPanorama from '@/assets/hero/events-panorama.webp';

export default function Events() {
  const [filter, setFilter] = useState<'all' | EventItem['category']>('all');
  const [query, setQuery] = useState('');

  const filtered = useMemo(() => {
    const normalizedQuery = query.trim().toLowerCase();
    return events.filter((event) => {
      const matchesFilter = filter === 'all' || event.category === filter;
      const matchesQuery =
        !normalizedQuery ||
        [event.title, event.category, event.description].some((field) =>
          field.toLowerCase().includes(normalizedQuery),
        );
      return matchesFilter && matchesQuery;
    });
  }, [filter, query]);

  return (
    <div className="relative">
      <div className="fixed inset-0 -z-10 overflow-hidden">
        <motion.img
          src={eventsPanorama}
          alt=""
          aria-hidden="true"
          initial={{ opacity: 0, scale: 1.15 }}
          animate={{ opacity: 1, scale: [1.15, 1, 1.06, 1] }}
          transition={{
            opacity: { duration: 2, ease: 'easeOut' },
            scale: { duration: 26, times: [0, 0.08, 0.54, 1], repeat: Infinity, ease: 'easeInOut' },
          }}
          className="h-full w-full object-cover"
        />
        <div className="absolute inset-0 bg-navy-deep/85" />
      </div>

      <PageHero
        title="Events"
        subtitle="Discover. Compete. Conquer. Explore every arena Porikkalam has to offer."
        backgroundImage={eventsPanorama}
      />

      <section className="relative bg-cream/90 py-20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col items-center gap-6">
            <Tabs options={EVENT_FILTERS} value={filter} onChange={setFilter} />
            <SearchBar
              className="w-full max-w-2xl"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
            />
          </div>

          {filtered.length > 0 ? (
            <div className="mt-14 grid grid-cols-1 gap-6 lg:grid-cols-2">
              {filtered.map((event, index) => (
                <div id={event.id} key={event.id} className="h-full">
                  <EventCard event={event} index={index} />
                </div>
              ))}
            </div>
          ) : (
            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="mt-16 text-center font-body text-sm text-slate"
            >
              No events match your search. Try a different keyword or filter.
            </motion.p>
          )}
        </div>
      </section>
    </div>
  );
}
