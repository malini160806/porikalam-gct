import { motion } from 'framer-motion';
import { ArrowRight, CheckCircle2, Rocket } from 'lucide-react';
import { SectionHeading } from '@/components/ui/SectionHeading';
import { Button } from '@/components/ui/Button';
import { expoBenefits } from '@/data/expo';

export function ExpoPreview() {
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
          <SectionHeading eyebrow="Innovate. Showcase. Inspire." title="Project Expo" align="left" tone="dark" />
          <p className="font-quote text-lg italic leading-relaxed text-beige/80">
            A dedicated stage for student startups, prototypes, and bold engineering ideas —
            where innovation meets industry.
          </p>
          <Button to="/expo" variant="primary" size="lg" icon={<ArrowRight size={16} />} className="w-fit">
            Register Your Project
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
            {expoBenefits.map((benefit) => (
              <li key={benefit.id} className="flex items-center gap-3 font-body text-sm text-beige/85">
                <CheckCircle2 size={16} className="shrink-0 text-gold" />
                {benefit.label}
              </li>
            ))}
          </ul>
        </motion.div>
      </div>
    </section>
  );
}
