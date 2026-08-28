import { useEffect, useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import logoImage from '@/assets/porikkalam-logo.webp';

const DISPLAY_DURATION = 1600;

export function LoadingScreen() {
  const [visible, setVisible] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => setVisible(false), DISPLAY_DURATION);
    return () => clearTimeout(timer);
  }, []);

  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          initial={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.6, ease: 'easeInOut' }}
          className="fixed inset-0 z-[9999] flex items-center justify-center overflow-hidden bg-navy-deep"
        >
          {/* Gold glow */}
          <div className="pointer-events-none absolute left-1/2 top-1/2 h-[400px] w-[400px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-gold/10 blur-[120px]" />

          <div className="relative z-10 flex flex-col items-center">
            <motion.img
              src={logoImage}
              alt="Porikkalam 2026"
              initial={{ opacity: 0, scale: 0.92 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.7, ease: 'easeOut' }}
              className="h-auto w-56 sm:w-72"
            />

            <motion.div
              initial={{ scaleX: 0 }}
              animate={{ scaleX: 1 }}
              transition={{ duration: DISPLAY_DURATION / 1000, ease: 'linear' }}
              className="mt-10 h-px w-40 origin-left bg-gold/60 sm:w-56"
            />
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
