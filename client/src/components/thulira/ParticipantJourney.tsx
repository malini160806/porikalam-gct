import { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { thuliraJourney, type ThuliraJourneyStage } from '@/data/thulira';

type ParticipantJourneyProps = {
  steps?: ThuliraJourneyStage[];
};

/** Scroll-linked stage journey — the gold rail fills in as the visitor scrolls past each stage.
 * Defaults to the Thulira journey; pass `steps` to reuse for other flagship tracks (e.g. Tech Thiral). */
export function ParticipantJourney({ steps = thuliraJourney }: ParticipantJourneyProps) {
  const sectionRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ['start 0.75', 'end 0.4'],
  });
  const lineScale = useTransform(scrollYProgress, [0, 1], [0, 1]);

  return (
    <div ref={sectionRef} className="relative mx-auto max-w-3xl pl-16 sm:pl-20">
      <div className="absolute left-6 top-3 bottom-3 w-px bg-gold/15 sm:left-8" />
      <motion.div
        style={{ scaleY: lineScale }}
        className="absolute left-6 top-3 bottom-3 w-px origin-top bg-gradient-to-b from-gold via-gold-light to-gold sm:left-8"
      />
      <div className="flex flex-col gap-10 sm:gap-12">
        {steps.map((stage, index) => (
          <motion.div
            key={stage.id}
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, amount: 0.5 }}
            transition={{ duration: 0.5, delay: index * 0.08 }}
            whileHover={{ x: 4 }}
            className="relative"
          >
            <span className="absolute -left-16 top-0 z-10 flex h-12 w-12 items-center justify-center rounded-full border-2 border-gold bg-navy-deep font-heading text-sm font-bold text-gold shadow-[0_0_16px_-4px_rgba(212,175,55,0.5)] sm:-left-20 sm:h-14 sm:w-14 sm:text-base">
              {stage.number}
            </span>
            <div className="border border-gold/20 bg-navy-deep/50 p-6 shadow-[inset_0_0_30px_-20px_rgba(212,175,55,0.5)] transition-colors duration-300 hover:border-gold/50">
              <h4 className="font-heading text-lg font-semibold uppercase tracking-wide text-cream sm:text-xl">
                {stage.title}
              </h4>
              <p className="mt-2 font-body text-sm leading-relaxed text-beige/75">{stage.description}</p>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
}
