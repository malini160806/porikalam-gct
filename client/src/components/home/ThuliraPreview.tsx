import { motion } from 'framer-motion';
import {
  ArrowRight,
  Lightbulb,
  Rocket,
  Users,
  Cpu,
  Code2,
  Zap,
} from 'lucide-react';
import { Button } from '@/components/ui/Button';
import { thuliraObjectives } from '@/data/thulira';

const THULIRA_ICONS = [Lightbulb, Rocket, Users];

const TECH_THIRAL_HIGHLIGHTS = [
  {
    icon: Cpu,
    text: 'Explore emerging technologies and real-world applications.',
  },
  {
    icon: Code2,
    text: 'Solve challenges through innovation and technical excellence.',
  },
  {
    icon: Zap,
    text: 'Inspire the next generation of engineers and innovators.',
  },
];

export function EventHighlights() {
  return (
    <section className="relative overflow-hidden bg-navy-deep py-28">
      {/* Blueprint grid */}
      <div className="absolute inset-0 bp-grid-bg opacity-[0.12]" />

      {/* Gold background glow */}
      <div className="pointer-events-none absolute left-1/2 top-1/2 h-[500px] w-[900px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-gold/5 blur-[120px]" />

      <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">

        {/* ================= HEADING ================= */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.7 }}
          className="text-center"
        >
          <div className="mb-5 flex items-center justify-center gap-4">
            <span className="h-px w-16 bg-gold/50" />

            <span className="font-body text-xs font-bold uppercase tracking-[0.3em] text-gold">
              The Flagship Experiences
            </span>

            <span className="h-px w-16 bg-gold/50" />
          </div>

          <h2 className="font-heading text-3xl font-semibold uppercase tracking-wide text-cream sm:text-4xl lg:text-5xl">
            Two Platforms. One Extraordinary Journey.
          </h2>

          <p className="mx-auto mt-5 max-w-2xl font-quote text-base italic leading-relaxed text-beige/70 sm:text-lg">
            Discover the two signature experiences of Porikkalam 2026 —
            where creativity meets innovation and engineering meets the future.
          </p>
        </motion.div>

        {/* ================= FLAGSHIP CARDS ================= */}
        <div className="mt-16 grid grid-cols-1 gap-8 lg:grid-cols-2">

          {/* ================= THULIRA ================= */}
          <motion.div
            initial={{ opacity: 0, x: -40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{ duration: 0.7 }}
            whileHover={{ y: -8 }}
            className="group relative overflow-hidden border border-gold/30 bg-charcoal p-[1px] shadow-[0_0_40px_rgba(212,175,55,0.08)]"
          >
            {/* Gold glow border */}
            <div className="absolute inset-0 bg-gradient-to-br from-gold/50 via-transparent to-gold/20 opacity-60 transition-opacity duration-500 group-hover:opacity-100" />

            <div className="relative h-full overflow-hidden bg-charcoal p-8 sm:p-10">

              {/* Decorative corners */}
              <div className="absolute right-0 top-0 h-24 w-24 border-b border-l border-gold/20" />

              <div className="absolute bottom-0 left-0 h-20 w-20 border-r border-t border-gold/20" />

              {/* Badge */}
              <div className="mb-7 flex items-center gap-3">
                <div className="flex h-12 w-12 items-center justify-center rounded-full border border-gold/50 bg-navy-deep text-gold shadow-[0_0_20px_rgba(212,175,55,0.15)]">
                  <Rocket size={22} strokeWidth={1.5} />
                </div>

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
              <h3 className="font-heading text-4xl font-semibold uppercase tracking-wide text-cream sm:text-5xl">
                Thulira
              </h3>

              {/* Divider */}
              <div className="mt-5 flex items-center gap-3">
                <span className="h-px w-16 bg-gold" />
                <span className="h-2 w-2 rotate-45 bg-gold" />
                <span className="h-px w-10 bg-gold/40" />
              </div>

              {/* Description */}
              <p className="mt-7 font-quote text-lg italic leading-relaxed text-beige/80">
                The Student Startup Challenge — a premier platform where
                aspiring student entrepreneurs showcase innovative startup
                ideas, prototypes, and entrepreneurial solutions.
              </p>

              {/* Highlights */}
              <div className="mt-8 flex flex-col gap-5">
                {thuliraObjectives.slice(0, 3).map((objective, index) => {
                  const Icon = THULIRA_ICONS[index] ?? Lightbulb;

                  return (
                    <div
                      key={objective.id}
                      className="flex items-start gap-4"
                    >
                      <div className="mt-0.5 flex h-9 w-9 shrink-0 items-center justify-center rounded-full border border-gold/40 bg-navy-deep text-gold">
                        <Icon size={16} strokeWidth={1.5} />
                      </div>

                      <p className="font-body text-sm leading-relaxed text-beige/80">
                        {objective.description}
                      </p>
                    </div>
                  );
                })}
              </div>

              {/* Button */}
              <div className="mt-10">
                <Button
                  to="/thulira"
                  variant="primary"
                  size="lg"
                  icon={<ArrowRight size={16} />}
                  className="transition-all duration-300 group-hover:shadow-[0_0_25px_rgba(212,175,55,0.25)]"
                >
                  Explore Thulira
                </Button>
              </div>
            </div>
          </motion.div>

          {/* ================= TECH THIRAL ================= */}
          <motion.div
            initial={{ opacity: 0, x: 40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{ duration: 0.7, delay: 0.1 }}
            whileHover={{ y: -8 }}
            className="group relative overflow-hidden border border-gold/30 bg-navy-deep p-[1px] shadow-[0_0_40px_rgba(212,175,55,0.08)]"
          >
            {/* Gold glow border */}
            <div className="absolute inset-0 bg-gradient-to-br from-gold/20 via-transparent to-gold/50 opacity-60 transition-opacity duration-500 group-hover:opacity-100" />

            <div className="relative h-full overflow-hidden bg-navy-deep p-8 sm:p-10">

              {/* Decorative circles */}
              <div className="absolute right-[-30px] top-[-30px] h-40 w-40 rounded-full border border-gold/10" />

              <div className="absolute right-[-10px] top-[-10px] h-28 w-28 rounded-full border border-gold/10" />

              {/* Badge */}
              <div className="mb-7 flex items-center gap-3">
                <div className="flex h-12 w-12 items-center justify-center rounded-full border border-gold/50 bg-charcoal text-gold shadow-[0_0_20px_rgba(212,175,55,0.15)]">
                  <Cpu size={22} strokeWidth={1.5} />
                </div>

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
              <h3 className="font-heading text-4xl font-semibold uppercase tracking-wide text-cream sm:text-5xl">
                Tech Thiral
              </h3>

              {/* Divider */}
              <div className="mt-5 flex items-center gap-3">
                <span className="h-px w-16 bg-gold" />
                <span className="h-2 w-2 rotate-45 bg-gold" />
                <span className="h-px w-10 bg-gold/40" />
              </div>

              {/* Description */}
              <p className="mt-7 font-quote text-lg italic leading-relaxed text-beige/80">
                A technology-driven platform where engineering minds come
                together to explore innovation, emerging technologies and
                ideas shaping the future.
              </p>

              {/* Highlights */}
              <div className="mt-8 flex flex-col gap-5">
                {TECH_THIRAL_HIGHLIGHTS.map((item) => {
                  const Icon = item.icon;

                  return (
                    <div
                      key={item.text}
                      className="flex items-start gap-4"
                    >
                      <div className="mt-0.5 flex h-9 w-9 shrink-0 items-center justify-center rounded-full border border-gold/40 bg-charcoal text-gold">
                        <Icon size={16} strokeWidth={1.5} />
                      </div>

                      <p className="font-body text-sm leading-relaxed text-beige/80">
                        {item.text}
                      </p>
                    </div>
                  );
                })}
              </div>

              {/* Button */}
              <div className="mt-10">
                <Button
                  to="/tech-thiral"
                  variant="primary"
                  size="lg"
                  icon={<ArrowRight size={16} />}
                  className="transition-all duration-300 group-hover:shadow-[0_0_25px_rgba(212,175,55,0.25)]"
                >
                  Explore Tech Thiral
                </Button>
              </div>
            </div>
          </motion.div>
        </div>

        {/* ================= BOTTOM MESSAGE ================= */}
        <motion.div
          initial={{ opacity: 0, y: 25 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.7, delay: 0.2 }}
          className="mx-auto mt-10 max-w-5xl border border-gold/20 bg-charcoal/40 px-6 py-6 text-center backdrop-blur-sm"
        >
          <p className="font-body text-sm font-bold uppercase tracking-[0.25em] text-gold sm:text-base">
            Innovate · Collaborate · Create Impact
          </p>

          <p className="mt-2 font-quote text-sm italic text-beige/60 sm:text-base">
            Two flagship platforms celebrating ideas, transforming
            possibilities, and building the future.
          </p>
        </motion.div>

      </div>
    </section>
  );
}