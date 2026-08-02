import { motion } from 'framer-motion';
import temple from '@/assets/heritage/temple-courtyard-wide.jpg';

export function HeritageBanner() {
  return (
    <section className="relative overflow-hidden bg-navy-deep py-20">
      <motion.div
        initial={{ opacity: 0, scale: 1.05 }}
        whileInView={{ opacity: 1, scale: 1 }}
        viewport={{ once: true, amount: 0.3 }}
        transition={{ duration: 0.9, ease: 'easeOut' }}
        className="relative mx-auto max-w-6xl px-4 sm:px-6 lg:px-8"
      >
        <div className="relative border border-gold/30 shadow-card">
          <img
            src={temple}
            alt="Sketch of a South Indian temple courtyard, gopuram and pillared hall"
            className="h-64 w-full object-cover sm:h-80 md:h-96"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-navy-deep via-navy-deep/10 to-transparent" />
          <div className="absolute inset-x-0 bottom-0 flex flex-col items-center gap-2 px-6 py-8 text-center">
            <span className="font-body text-xs font-semibold uppercase tracking-[0.3em] text-gold">
              Built On Legacy
            </span>
            <p className="font-quote max-w-xl text-xl italic text-cream sm:text-2xl">
              Every gopuram tells a story of precision passed down through generations of builders.
            </p>
          </div>
        </div>
      </motion.div>
    </section>
  );
}
