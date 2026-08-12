import { motion } from 'framer-motion';
import designSwirl from '@/assets/elements/transitions/design.png';

/** Decorative gold-to-blue flow graphic marking the ancient-to-futuristic narrative shift between sections. */
export function SectionDivider() {
  return (
    <div className="relative overflow-hidden bg-cream py-6">
      <motion.img
        initial={{ opacity: 0, y: 10, scale: 0.96 }}
        whileInView={{ opacity: 0.9, y: 0, scale: 1 }}
        viewport={{ once: true, amount: 0.5 }}
        transition={{ duration: 0.8, ease: 'easeOut' }}
        src={designSwirl}
        alt=""
        aria-hidden="true"
        className="pointer-events-none mx-auto h-24 w-auto max-w-full sm:h-32 md:h-40"
      />
    </div>
  );
}
