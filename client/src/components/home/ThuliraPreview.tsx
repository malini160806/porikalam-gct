import { motion } from 'framer-motion';
import { ArrowRight, Lightbulb, Rocket, Users } from 'lucide-react';
import { SectionHeading } from '@/components/ui/SectionHeading';
import { Button } from '@/components/ui/Button';
import { thuliraObjectives } from '@/data/thulira';

const HIGHLIGHT_ICONS = [Lightbulb, Rocket, Users];

export function ThuliraPreview() {
  return (
    <section className="relative overflow-hidden bg-charcoal py-24">
      <div className="absolute inset-0 bp-grid-bg opacity-[0.15]" />
      <div className="relative mx-auto grid max-w-6xl grid-cols-1 items-center gap-12 px-4 sm:px-6 lg:grid-cols-2 lg:px-8">
        <motion.div
          initial={{ opacity: 0, x: -24 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.6 }}
          className="flex flex-col gap-6"
        >
          <SectionHeading eyebrow="Inspiring Ideas. Igniting Innovation." title="Thulira" align="left" tone="dark" />
          <p className="font-quote text-lg italic leading-relaxed text-beige/80">
            The Student Startup Challenge — a premier platform where aspiring student entrepreneurs
            showcase innovative startup ideas, prototypes, and entrepreneurial solutions.
          </p>
          <Button to="/thulira" variant="primary" size="lg" icon={<ArrowRight size={16} />} className="w-fit">
            Explore Thulira
          </Button>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, x: 24 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="flex flex-col gap-4 border border-gold/25 bg-navy-deep p-8"
        >
          <Rocket size={28} className="text-gold" strokeWidth={1.5} />
          <ul className="flex flex-col gap-4">
            {thuliraObjectives.map((objective, index) => {
              const Icon = HIGHLIGHT_ICONS[index] ?? Lightbulb;
              return (
                <li key={objective.id} className="flex items-start gap-3 font-body text-sm text-beige/85">
                  <Icon size={16} className="mt-0.5 shrink-0 text-gold" />
                  {objective.description}
                </li>
              );
            })}
          </ul>
        </motion.div>
      </div>
    </section>
  );
}
