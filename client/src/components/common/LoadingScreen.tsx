import { useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { Laptop, ArrowRight } from 'lucide-react';
import logoImage from '@/assets/porikkalam-logo.webp';

export function LoadingScreen() {
const [visible, setVisible] = useState(true);
const [entering, setEntering] = useState(false);
  const handleEnter = () => {
  setEntering(true);

  setTimeout(() => {
    setVisible(false);
  }, 500);
};

  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          initial={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.6, ease: 'easeInOut' }}
          className="fixed inset-0 z-[9999] flex min-h-screen items-center justify-center overflow-hidden bg-navy-deep"
        >
          {/* Background grid */}
          <div className="absolute inset-0 bp-grid-bg opacity-20" />

          {/* Gold glow */}
          <div className="pointer-events-none absolute left-1/2 top-1/2 h-[500px] w-[500px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-gold/10 blur-[120px]" />

          {/* Main content */}
          <div className="relative z-10 mx-auto flex w-full max-w-3xl flex-col items-center px-6 text-center">

            {/* Logo */}
            <motion.img
              src={logoImage}
              alt="Porikkalam 2026"
              initial={{ opacity: 0, y: -20, scale: 0.9 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              transition={{ duration: 0.7 }}
              className="mb-10 h-auto w-64 sm:w-80"
            />

            {/* Laptop icon */}
            <motion.div
              initial={{ opacity: 0, scale: 0.7 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="mb-7 flex h-20 w-20 items-center justify-center rounded-full border border-gold/50 bg-navy/70 text-gold shadow-[0_0_35px_rgba(212,175,55,0.25)]"
            >
              <Laptop size={38} strokeWidth={1.4} />
            </motion.div>

            {/* Heading */}
            <motion.h1
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.35 }}
              className="font-heading text-3xl font-semibold uppercase tracking-wider text-cream sm:text-5xl"
            >
              Best Experienced
              <span className="mt-2 block text-gold">
                On Laptop
              </span>
            </motion.h1>

            {/* Decorative divider */}
            <motion.div
              initial={{ opacity: 0, scaleX: 0 }}
              animate={{ opacity: 1, scaleX: 1 }}
              transition={{ duration: 0.6, delay: 0.5 }}
              className="my-6 flex items-center gap-3"
            >
              <span className="h-px w-14 bg-gold/50" />
              <span className="text-xs text-gold">◆</span>
              <span className="h-px w-14 bg-gold/50" />
            </motion.div>

            {/* Description */}
            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.6, delay: 0.6 }}
              className="max-w-xl font-body text-sm leading-relaxed text-beige/70 sm:text-base"
            >
              Experience Porikkalam 2026 with the best visual
              quality, animations and interactive features.
              For the best experience, we recommend using a
              laptop or desktop.
            </motion.p>

            {/* Enter button */}
          <motion.button
  initial={{ opacity: 0, y: 15 }}
  animate={{ opacity: 1, y: 0 }}
  transition={{ duration: 0.6, delay: 0.8 }}
  onClick={handleEnter}
  disabled={entering}
  className="group mt-9 flex items-center gap-3 border border-gold bg-gold px-8 py-4 font-body text-sm font-bold uppercase tracking-widest text-navy-deep transition-all duration-300 hover:bg-transparent hover:text-gold disabled:cursor-wait"
>
  {entering ? 'Entering...' : 'Enter Website'}

  <motion.span
    animate={
      entering
        ? { x: 8, rotate: 90 }
        : { x: [0, 5, 0] }
    }
    transition={
      entering
        ? { duration: 0.4 }
        : { duration: 1, repeat: Infinity, ease: 'easeInOut' }
    }
  >
    <ArrowRight size={17} />
  </motion.span>
</motion.button>

            {/* Recommendation */}
            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 1 }}
              className="mt-5 font-body text-[10px] uppercase tracking-[0.25em] text-beige/40"
            >
              Recommended · Laptop / Desktop
            </motion.p>

          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}