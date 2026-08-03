import { motion, useScroll, useTransform } from 'framer-motion';

/**
 * A fixed, low-opacity color wash that sweeps through the brand's full Earthy → Bronze →
 * Gold → Slate → Steel → Tech Blue → Neon Blue → Future Purple transition as the user
 * scrolls, reinforcing the ancient-to-futuristic narrative. Mounted once in MainLayout so
 * it applies site-wide.
 */
const STOPS = [0, 1 / 7, 2 / 7, 3 / 7, 4 / 7, 5 / 7, 6 / 7, 1];
const COLORS = [
  'rgba(164,102,33,0.07)', // earthy
  'rgba(139,115,51,0.06)', // bronze
  'rgba(212,175,55,0.07)', // gold
  'rgba(42,58,77,0.05)', // slate
  'rgba(61,90,117,0.06)', // steel
  'rgba(56,145,255,0.07)', // tech blue
  'rgba(31,111,214,0.07)', // neon blue
  'rgba(107,79,196,0.08)', // future purple
];

export function ScrollTint() {
  const { scrollYProgress } = useScroll();
  const backgroundColor = useTransform(scrollYProgress, STOPS, COLORS);

  return (
    <motion.div
      aria-hidden="true"
      className="pointer-events-none fixed inset-0 z-30 mix-blend-soft-light"
      style={{ backgroundColor }}
    />
  );
}
