import { motion } from 'framer-motion';
import { ChevronRight } from 'lucide-react';
import { thuliraJourney, type ThuliraJourneyStage } from '@/data/thulira';

type ParticipantJourneyProps = {
  steps?: ThuliraJourneyStage[];
};

/** Single-line stage strip — each stage as a compact chip connected by chevrons.
 * Defaults to the Thulira journey; pass `steps` to reuse for other flagship tracks (e.g. Tech Thiral). */
export function ParticipantJourney({ steps = thuliraJourney }: ParticipantJourneyProps) {
  return (
    <div className="mx-auto flex max-w-4xl flex-wrap items-center justify-center gap-x-2 gap-y-3">
      {steps.map((stage, index) => (
        <span key={stage.id} className="flex items-center gap-2">
          <motion.span
            initial={{ opacity: 0, y: 8 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.6 }}
            transition={{ duration: 0.4, delay: index * 0.08 }}
            whileHover={{ y: -2, borderColor: 'rgba(212,175,55,0.7)' }}
            className="flex items-center gap-2 border border-gold/25 bg-navy-deep/50 px-4 py-2 font-body text-xs font-semibold uppercase tracking-wide text-beige/90 transition-colors duration-300 sm:text-sm"
          >
            <span className="text-gold">{stage.number}</span>
            {stage.title}
          </motion.span>
          {index < steps.length - 1 && <ChevronRight size={14} className="shrink-0 text-gold/40" />}
        </span>
      ))}
    </div>
  );
}
