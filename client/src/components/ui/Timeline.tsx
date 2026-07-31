import { motion } from 'framer-motion';
import type { TimelineStep } from '@/data/types';

type TimelineProps = {
  steps: TimelineStep[];
};

export function Timeline({ steps }: TimelineProps) {
  return (
    <div className="relative">
      <div className="absolute left-0 right-0 top-6 hidden h-px bg-gold/40 sm:block" />
      <div className="grid grid-cols-1 gap-10 sm:grid-cols-4 sm:gap-6">
        {steps.map((step, index) => (
          <motion.div
            key={step.id}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.5 }}
            transition={{ duration: 0.5, delay: index * 0.12 }}
            className="relative flex flex-col items-center text-center gap-3"
          >
            <div className="relative z-10 flex h-12 w-12 items-center justify-center rounded-full border-2 border-gold bg-navy font-heading text-gold">
              {index + 1}
            </div>
            <h4 className="font-heading text-sm sm:text-base uppercase tracking-wider text-navy">
              {step.label}
            </h4>
            <span className="font-body text-xs font-semibold text-brown">{step.date}</span>
            <p className="font-body text-xs sm:text-sm text-slate max-w-[200px]">{step.description}</p>
          </motion.div>
        ))}
      </div>
    </div>
  );
}
