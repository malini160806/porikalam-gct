import { useEffect, useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { GearMotif } from './GearMotif';
import logoImage from '@/assets/porikkalam-logo.webp';

const MIN_DISPLAY_MS = 700;

/** Branded loading screen shown briefly while the app boots. */
export function LoadingScreen() {
  const [visible, setVisible] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => setVisible(false), MIN_DISPLAY_MS);
    return () => clearTimeout(timer);
  }, []);

  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          initial={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.5, ease: 'easeInOut' }}
          className="fixed inset-0 z-[100] flex flex-col items-center justify-center gap-6 navy-paper"
        >
          <motion.img
            src={logoImage}
            alt="Porikkalam 2026"
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5, ease: 'easeOut' }}
            className="h-16 w-auto sm:h-20"
          />
          <motion.div
            className="h-10 w-10 text-gold"
            animate={{ rotate: 360 }}
            transition={{ duration: 1.6, repeat: Infinity, ease: 'linear' }}
          >
            <GearMotif className="h-full w-full" />
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
