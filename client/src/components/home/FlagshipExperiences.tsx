import { motion } from 'framer-motion';
import {
  ArrowRight,
  Lightbulb,
  Rocket,
  Users,
  Cpu,
  Code2,
  Zap,
  Sparkles,
} from 'lucide-react';
import { Button } from '@/components/ui/Button';

const thuliraPoints = [
  {
    icon: Lightbulb,
    text: 'Encouraging innovative startup ideas and entrepreneurial thinking.',
  },
  {
    icon: Rocket,
    text: 'Providing mentorship, resources and exposure to the startup ecosystem.',
  },
  {
    icon: Users,
    text: 'Empowering students to build, pitch and transform ideas into impact.',
  },
];

const techThiralPoints = [
  {
    icon: Cpu,
    text: 'Exploring emerging technologies and real-world applications.',
  },
  {
    icon: Code2,
    text: 'Connecting with startups, founders, industry professionals and researchers.',
  },
  {
    icon: Zap,
    text: 'Discovering innovation, entrepreneurial ideas and technologies shaping the future.',
  },
];

export function FlagshipExperiences() {
  return (
    <section className="relative overflow-hidden bg-navy-deep py-24 sm:py-28">

      {/* Background grid */}
      <div className="absolute inset-0 bp-grid-bg opacity-[0.12]" />

      {/* Main ambient glow */}
      <motion.div
        className="pointer-events-none absolute left-1/2 top-1/2 h-[500px] w-[900px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-gold/5 blur-[120px]"
        animate={{
          scale: [1, 1.12, 1],
          opacity: [0.25, 0.5, 0.25],
        }}
        transition={{
          duration: 7,
          repeat: Infinity,
          ease: 'easeInOut',
        }}
      />

      {/* Floating gold particles */}
      <motion.div
        className="pointer-events-none absolute left-[8%] top-[25%] h-2 w-2 rounded-full bg-gold shadow-[0_0_18px_rgba(212,175,55,0.9)]"
        animate={{
          y: [0, -20, 0],
          opacity: [0.2, 1, 0.2],
        }}
        transition={{
          duration: 3,
          repeat: Infinity,
          ease: 'easeInOut',
        }}
      />

      <motion.div
        className="pointer-events-none absolute right-[8%] top-[40%] h-1.5 w-1.5 rounded-full bg-gold shadow-[0_0_15px_rgba(212,175,55,0.9)]"
        animate={{
          y: [0, 25, 0],
          opacity: [0.2, 1, 0.2],
        }}
        transition={{
          duration: 4,
          repeat: Infinity,
          ease: 'easeInOut',
          delay: 1,
        }}
      />

      <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">

        {/* Section Heading */}
        <motion.div
          initial={{ opacity: 0, y: 25 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.7 }}
          className="text-center"
        >
          <div className="mb-5 flex items-center justify-center gap-4">
            <span className="h-px w-16 bg-gold/50" />

            <span className="font-body text-xs font-bold uppercase tracking-[0.3em] text-gold">
              Explore More
            </span>

            <span className="h-px w-16 bg-gold/50" />
          </div>

          <h2 className="font-heading text-4xl uppercase tracking-wide text-cream sm:text-5xl">
            Flagship Event
          </h2>

          {/* Animated divider */}
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
                scale: [1, 1.25, 1],
              }}
              transition={{
                duration: 4,
                repeat: Infinity,
                ease: 'easeInOut',
              }}
              className="h-2.5 w-2.5 bg-gold shadow-[0_0_15px_rgba(212,175,55,0.9)]"
            />

            <motion.span
              initial={{ width: 0 }}
              whileInView={{ width: 70 }}
              viewport={{ once: true }}
              transition={{ duration: 0.7 }}
              className="h-px bg-gold/60"
            />
          </div>

          <p className="mx-auto mt-6 max-w-2xl font-quote text-lg italic leading-relaxed text-beige/75">
            Beyond competitions, Porikkalam 2026 brings together two flagship
            platforms that celebrate creativity, entrepreneurship, technology
            and innovation.
          </p>
        </motion.div>

        {/* Flagship Cards */}
        <div className="mt-14 grid grid-cols-1 gap-8 lg:grid-cols-2">

          {/* ================= THULIRA ================= */}
          <motion.div
            initial={{ opacity: 0, x: -40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, amount: 0.25 }}
            transition={{ duration: 0.7 }}
            whileHover={{ y: -8 }}
            className="group relative"
          >

            {/* Animated border glow */}
            <motion.div
              className="absolute -inset-[1px] bg-gradient-to-r from-gold/20 via-gold to-gold/20 blur-[2px]"
              animate={{
                opacity: [0.25, 0.75, 0.25],
              }}
              transition={{
                duration: 3,
                repeat: Infinity,
                ease: 'easeInOut',
              }}
            />

            <div className="relative h-full border border-gold/30 bg-charcoal p-8 sm:p-10">

              {/* Platform heading */}
              <div className="flex items-center gap-4">

                <motion.div
                  animate={{
                    scale: [1, 1.08, 1],
                    boxShadow: [
                      '0 0 0 rgba(212,175,55,0)',
                      '0 0 25px rgba(212,175,55,0.4)',
                      '0 0 0 rgba(212,175,55,0)',
                    ],
                  }}
                  transition={{
                    duration: 2.5,
                    repeat: Infinity,
                    ease: 'easeInOut',
                  }}
                  className="flex h-14 w-14 shrink-0 items-center justify-center rounded-full border border-gold/60 bg-navy-deep text-gold"
                >
                  <Rocket size={25} strokeWidth={1.4} />
                </motion.div>

                <div>
                  <p className="font-body text-xs font-bold uppercase tracking-[0.25em] text-gold">
                    Flagship Platform
                  </p>

                  <p className="mt-1 font-body text-xs text-beige/50">
                    Culture · Creativity · Expression
                  </p>
                </div>

              </div>

              {/* Title */}
              <h3 className="mt-8 font-heading text-4xl uppercase tracking-wide text-cream sm:text-5xl">
                Thulira
              </h3>

              {/* Divider */}
              <div className="mt-5 flex items-center gap-3">
                <span className="h-px w-16 bg-gold" />
                <motion.span
                  animate={{
                    rotate: [45, 135, 45],
                    scale: [1, 1.2, 1],
                  }}
                  transition={{
                    duration: 2.5,
                    repeat: Infinity,
                  }}
                  className="h-2 w-2 bg-gold"
                />
                <span className="h-px w-12 bg-gold/30" />
              </div>

              {/* Description */}
              <p className="mt-7 font-quote text-lg italic leading-relaxed text-beige/80">
                The Student Startup Challenge — a premier platform where
                aspiring student entrepreneurs showcase innovative startup
                ideas, prototypes, and entrepreneurial solutions.
              </p>

              {/* Points */}
              <div className="mt-8 flex flex-col gap-5">

                {thuliraPoints.map((item, index) => {
                  const Icon = item.icon;

                  return (
                    <motion.div
                      key={index}
                      initial={{ opacity: 0, x: -15 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      viewport={{ once: true }}
                      transition={{
                        duration: 0.5,
                        delay: index * 0.12,
                      }}
                      whileHover={{ x: 5 }}
                      className="flex items-start gap-4"
                    >
                      <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full border border-gold/40 bg-navy-deep text-gold transition-all duration-300 group-hover:border-gold/70">
                        <Icon size={16} strokeWidth={1.7} />
                      </div>

                      <p className="pt-1 font-body text-sm leading-relaxed text-beige/80">
                        {item.text}
                      </p>
                    </motion.div>
                  );
                })}

              </div>

              {/* Button */}
              <motion.div
                className="mt-10"
                whileHover={{ x: 4 }}
              >
                <Button
                  to="/thulira"
                  variant="primary"
                  size="lg"
                  icon={<ArrowRight size={16} />}
                >
                  Explore Thulira
                </Button>
              </motion.div>

            </div>
          </motion.div>

          {/* ================= TECH THIRAL ================= */}
          <motion.div
            initial={{ opacity: 0, x: 40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, amount: 0.25 }}
            transition={{
              duration: 0.7,
              delay: 0.1,
            }}
            whileHover={{ y: -8 }}
            className="group relative"
          >

            {/* Animated border glow */}
            <motion.div
              className="absolute -inset-[1px] bg-gradient-to-r from-gold/20 via-gold to-gold/20 blur-[2px]"
              animate={{
                opacity: [0.25, 0.75, 0.25],
              }}
              transition={{
                duration: 3,
                repeat: Infinity,
                ease: 'easeInOut',
                delay: 1,
              }}
            />

            <div className="relative h-full border border-gold/30 bg-navy-deep p-8 sm:p-10">

              {/* Platform heading */}
              <div className="flex items-center gap-4">

                <motion.div
                  animate={{
                    scale: [1, 1.08, 1],
                    boxShadow: [
                      '0 0 0 rgba(212,175,55,0)',
                      '0 0 25px rgba(212,175,55,0.4)',
                      '0 0 0 rgba(212,175,55,0)',
                    ],
                  }}
                  transition={{
                    duration: 2.5,
                    repeat: Infinity,
                    ease: 'easeInOut',
                    delay: 1,
                  }}
                  className="flex h-14 w-14 shrink-0 items-center justify-center rounded-full border border-gold/60 bg-charcoal text-gold"
                >
                  <Cpu size={25} strokeWidth={1.4} />
                </motion.div>

                <div>
                  <p className="font-body text-xs font-bold uppercase tracking-[0.25em] text-gold">
                    Flagship Platform
                  </p>

                  <p className="mt-1 font-body text-xs text-beige/50">
                    Technology · Innovation · Future
                  </p>
                </div>

              </div>

              {/* Title */}
              <h3 className="mt-8 font-heading text-4xl uppercase tracking-wide text-cream sm:text-5xl">
                Tech Thiral
              </h3>

              {/* Divider */}
              <div className="mt-5 flex items-center gap-3">
                <span className="h-px w-16 bg-gold" />

                <motion.span
                  animate={{
                    rotate: [45, 135, 45],
                    scale: [1, 1.2, 1],
                  }}
                  transition={{
                    duration: 2.5,
                    repeat: Infinity,
                    delay: 0.5,
                  }}
                  className="h-2 w-2 bg-gold"
                />

                <span className="h-px w-12 bg-gold/30" />
              </div>

              {/* Description */}
              <p className="mt-7 font-quote text-lg italic leading-relaxed text-beige/80">
                A technology-driven platform where engineering minds come
                together to explore innovation, emerging technologies and
                ideas shaping the future.
              </p>

              {/* Points */}
              <div className="mt-8 flex flex-col gap-5">

                {techThiralPoints.map((item, index) => {
                  const Icon = item.icon;

                  return (
                    <motion.div
                      key={index}
                      initial={{ opacity: 0, x: 15 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      viewport={{ once: true }}
                      transition={{
                        duration: 0.5,
                        delay: index * 0.12,
                      }}
                      whileHover={{ x: 5 }}
                      className="flex items-start gap-4"
                    >
                      <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full border border-gold/40 bg-charcoal text-gold transition-all duration-300 group-hover:border-gold/70">
                        <Icon size={16} strokeWidth={1.7} />
                      </div>

                      <p className="pt-1 font-body text-sm leading-relaxed text-beige/80">
                        {item.text}
                      </p>
                    </motion.div>
                  );
                })}

              </div>

              {/* Button */}
              <motion.div
                className="mt-10"
                whileHover={{ x: 4 }}
              >
                <Button
                  to="/tech-thiral"
                  variant="primary"
                  size="lg"
                  icon={<ArrowRight size={16} />}
                >
                  Explore Tech Thiral
                </Button>
              </motion.div>

            </div>
          </motion.div>

        </div>

        {/* Bottom Highlight */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{
            duration: 0.7,
            delay: 0.2,
          }}
          className="mt-10 border border-gold/20 bg-charcoal/50 px-6 py-7 text-center"
        >
          <div className="flex flex-wrap items-center justify-center gap-3">

            <Sparkles size={18} className="text-gold" />

            <p className="font-body text-sm font-bold uppercase tracking-[0.25em] text-gold">
              Innovate · Connect · Create Impact
            </p>

            <Sparkles size={18} className="text-gold" />

          </div>

          <p className="mt-2 font-quote text-sm italic text-beige/60">
            Two flagship platforms. One stage for ideas, innovation and
            the future.
          </p>
        </motion.div>

      </div>
    </section>
  );
}