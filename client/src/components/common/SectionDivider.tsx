import { motion } from 'framer-motion';
import swirlFlow from '@/assets/elements/transitions/swirl-flow.webp';

/** Decorative gold-to-blue flow graphic marking the ancient-to-futuristic narrative shift between sections. */
export function SectionDivider() {
  return (
    <div className="relative overflow-hidden bg-cream py-6">
      <motion.img
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 0.8 }}
        viewport={{ once: true, amount: 0.5 }}
        transition={{ duration: 0.8 }}
        src={swirlFlow}
        alt=""
        aria-hidden="true"
        className="pointer-events-none mx-auto h-16 w-auto max-w-full sm:h-20"
      />
    </div>
  );
}
