import { motion } from 'framer-motion';
import { PageHero } from '@/components/common/PageHero';
import { WorkshopCard } from '@/components/cards/WorkshopCard';
import { events } from '@/data/events';
import workshopPanorama from '@/assets/hero/workshop-panorama.webp';

export default function Workshops() {
  const workshops = events.filter((event) => event.category === 'workshop');

  return (
    <div className="relative">
      <div className="fixed inset-0 -z-10 overflow-hidden">
        <motion.img
          src={workshopPanorama}
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
        <div className="absolute inset-0 bg-cream/30" />
      </div>

      <PageHero
        title="Workshops"
        subtitle="Hands-on sessions to build skills beyond the competition floor."
        backgroundImage={workshopPanorama}
        heroTone="light"
      />

      <section className="relative bg-cream/70 py-24">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          {workshops.length > 0 ? (
            <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {workshops.map((event, index) => (
                <WorkshopCard key={event.id} event={event} index={index} />
              ))}
            </div>
          ) : (
            <p className="text-center font-body text-sm text-slate">
              Workshop details will be announced soon. Check back later.
            </p>
          )}
        </div>
      </section>
    </div>
  );
}
