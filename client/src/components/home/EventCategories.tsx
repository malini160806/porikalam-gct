import { motion } from 'framer-motion';
import { ArrowRight, Sparkles } from 'lucide-react';
import { Button } from '@/components/ui/Button';

const FEATURED_EVENTS = [
  {
    name: 'SketchShift',
    description:
      'Unleash your creativity by transforming ideas into expressive sketches and unique visual concepts.',
  },
  {
    name: 'Civil CBI',
    description:
      'Put your civil engineering knowledge to the test through challenging real-world construction scenarios.',
  },
  {
    name: 'FlightCraft',
    description:
      'Design, build and launch a paper glider while testing creativity, balance and aerodynamic thinking.',
  },
  {
    name: 'SkyWorks',
    description:
      'Take on an exciting engineering challenge where design, precision and innovation come together.',
  },
];

export function EventCategories() {
  return (
    <section className="relative overflow-hidden bg-navy-deep py-24 sm:py-28">

      {/* Background grid */}
      <div className="absolute inset-0 bp-grid-bg opacity-[0.12]" />

      {/* Main ambient glow */}
      <motion.div
        className="pointer-events-none absolute left-1/2 top-1/2 h-[450px] w-[800px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-gold/5 blur-[120px]"
        animate={{
          scale: [1, 1.15, 1],
          opacity: [0.25, 0.5, 0.25],
        }}
        transition={{
          duration: 7,
          repeat: Infinity,
          ease: 'easeInOut',
        }}
      />

      {/* Floating glowing element - left */}
      <motion.div
        className="pointer-events-none absolute left-[12%] top-[25%] h-2 w-2 rounded-full bg-gold shadow-[0_0_18px_rgba(212,175,55,0.9)]"
        animate={{
          y: [0, -20, 0],
          opacity: [0.3, 1, 0.3],
          scale: [1, 1.4, 1],
        }}
        transition={{
          duration: 3,
          repeat: Infinity,
          ease: 'easeInOut',
        }}
      />

      {/* Floating glowing element - right */}
      <motion.div
        className="pointer-events-none absolute right-[14%] top-[35%] h-1.5 w-1.5 rounded-full bg-gold shadow-[0_0_15px_rgba(212,175,55,0.9)]"
        animate={{
          y: [0, 25, 0],
          opacity: [0.2, 1, 0.2],
          scale: [1, 1.5, 1],
        }}
        transition={{
          duration: 4,
          repeat: Infinity,
          ease: 'easeInOut',
          delay: 1,
        }}
      />

      <div className="relative mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">

        {/* Heading */}
        <motion.div
          initial={{ opacity: 0, y: 25 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.7 }}
          className="text-center"
        >
          <p className="font-body text-xs font-bold uppercase tracking-[0.3em] text-gold">
            What's In Store
          </p>

          <h2 className="mt-3 font-heading text-4xl uppercase tracking-wide text-cream sm:text-5xl">
            Featured Events
          </h2>

          {/* Gold divider */}
          <div className="mt-6 flex items-center justify-center gap-4">
            <motion.span
              initial={{ width: 0 }}
              whileInView={{ width: 70 }}
              viewport={{ once: true }}
              transition={{ duration: 0.7 }}
              className="h-px bg-gold/60"
            />

            <motion.span
              animate={{
                rotate: [45, 135, 225, 315, 405],
                scale: [1, 1.3, 1],
                boxShadow: [
                  '0 0 0 rgba(212,175,55,0)',
                  '0 0 15px rgba(212,175,55,0.8)',
                  '0 0 0 rgba(212,175,55,0)',
                ],
              }}
              transition={{
                duration: 4,
                repeat: Infinity,
                ease: 'easeInOut',
              }}
              className="h-2.5 w-2.5 bg-gold"
            />

            <motion.span
              initial={{ width: 0 }}
              whileInView={{ width: 70 }}
              viewport={{ once: true }}
              transition={{ duration: 0.7 }}
              className="h-px bg-gold/60"
            />
          </div>

          <p className="mx-auto mt-6 max-w-2xl font-quote text-lg italic leading-relaxed text-beige/70">
            Discover the arenas waiting for you at Porikkalam 2026.
          </p>
        </motion.div>

        {/* Four Featured Events */}
        <div className="mx-auto mt-14 grid max-w-5xl grid-cols-1 gap-5 sm:grid-cols-2">
          {FEATURED_EVENTS.map((event, index) => (
            <motion.div
              key={event.name}
              initial={{
                opacity: 0,
                y: 40,
                scale: 0.96,
              }}
              whileInView={{
                opacity: 1,
                y: 0,
                scale: 1,
              }}
              viewport={{
                once: true,
                amount: 0.25,
              }}
              transition={{
                duration: 0.6,
                delay: index * 0.1,
                ease: 'easeOut',
              }}
              whileHover={{
                y: -8,
                scale: 1.015,
              }}
              className="group relative cursor-default overflow-hidden border border-gold/25 bg-charcoal/70 p-7 text-center backdrop-blur-sm transition-all duration-300 hover:border-gold/70 hover:shadow-[0_0_35px_rgba(212,175,55,0.15)] sm:p-8"
            >

              {/* Animated top line */}
              <motion.div
                className="absolute left-1/2 top-0 h-px -translate-x-1/2 bg-gold shadow-[0_0_10px_rgba(212,175,55,0.8)]"
                initial={{ width: 0 }}
                whileHover={{ width: '70%' }}
                transition={{ duration: 0.3 }}
              />

              {/* Animated bottom line */}
              <motion.div
                className="absolute bottom-0 left-1/2 h-px -translate-x-1/2 bg-gold shadow-[0_0_10px_rgba(212,175,55,0.8)]"
                initial={{ width: 0 }}
                whileHover={{ width: '50%' }}
                transition={{ duration: 0.3 }}
              />

              {/* Corner glow */}
              <motion.div
                className="pointer-events-none absolute -right-10 -top-10 h-24 w-24 rounded-full bg-gold/10 blur-2xl"
                animate={{
                  opacity: [0.2, 0.5, 0.2],
                }}
                transition={{
                  duration: 3,
                  repeat: Infinity,
                  delay: index * 0.4,
                }}
              />

              {/* Content */}
              <div className="relative">

                {/* Event number */}
                <motion.span
                  className="block font-body text-[10px] font-bold tracking-[0.35em] text-gold/50"
                  whileHover={{
                    color: 'rgba(212,175,55,0.95)',
                  }}
                >
                  {String(index + 1).padStart(2, '0')}
                </motion.span>

                {/* Event name */}
                <motion.h3
                  className="mt-3 font-heading text-2xl uppercase tracking-wide text-cream sm:text-3xl"
                  whileHover={{
                    letterSpacing: '0.08em',
                  }}
                  transition={{ duration: 0.25 }}
                >
                  {event.name}
                </motion.h3>

                {/* Divider */}
                <div className="mt-5 flex items-center justify-center gap-2">
                  <motion.span
                    className="h-px bg-gold/40"
                    initial={{ width: 20 }}
                    whileHover={{ width: 45 }}
                    transition={{ duration: 0.3 }}
                  />

                  <motion.span
                    animate={{
                      rotate: [45, 225, 405],
                      opacity: [0.4, 1, 0.4],
                      boxShadow: [
                        '0 0 0 rgba(212,175,55,0)',
                        '0 0 12px rgba(212,175,55,0.9)',
                        '0 0 0 rgba(212,175,55,0)',
                      ],
                    }}
                    transition={{
                      duration: 2.5,
                      repeat: Infinity,
                      delay: index * 0.2,
                    }}
                    className="h-1.5 w-1.5 bg-gold"
                  />

                  <motion.span
                    className="h-px bg-gold/40"
                    initial={{ width: 20 }}
                    whileHover={{ width: 45 }}
                    transition={{ duration: 0.3 }}
                  />
                </div>

                {/* Description */}
                <p className="mx-auto mt-5 max-w-md font-body text-sm leading-relaxed text-beige/65">
                  {event.description}
                </p>

                {/* Hover indicator */}
                <motion.div
                  className="mx-auto mt-6 flex items-center justify-center gap-2 font-body text-[10px] font-bold uppercase tracking-[0.2em] text-gold/60"
                  initial={{ opacity: 0, y: 5 }}
                  whileHover={{ opacity: 1, y: 0 }}
                >
                  Discover
                  <ArrowRight size={13} />
                </motion.div>

              </div>
            </motion.div>
          ))}
        </div>

        {/* Explore All Events */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{
            duration: 0.6,
            delay: 0.45,
          }}
          className="mt-12 flex justify-center"
        >
          <Button
            to="/events"
            variant="primary"
            size="lg"
            icon={<ArrowRight size={17} />}
          >
            Explore All Events
          </Button>
        </motion.div>

        {/* Bottom tagline */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{
            duration: 0.8,
            delay: 0.6,
          }}
          className="mt-10 flex items-center justify-center gap-3"
        >
          <Sparkles size={14} className="text-gold/50" />

          <span className="font-body text-[10px] uppercase tracking-[0.3em] text-beige/40">
            Discover · Compete · Conquer
          </span>

          <Sparkles size={14} className="text-gold/50" />
        </motion.div>

      </div>
    </section>
  );
}