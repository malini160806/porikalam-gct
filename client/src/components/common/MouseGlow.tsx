import { useEffect, useState } from 'react';
import { motion, useMotionValue, useReducedMotion, useSpring } from 'framer-motion';

/** Subtle radial gold glow that follows the cursor. Desktop pointer devices only. */
export function MouseGlow() {
  const prefersReducedMotion = useReducedMotion();
  const [enabled, setEnabled] = useState(false);
  const x = useMotionValue(-200);
  const y = useMotionValue(-200);
  const smoothX = useSpring(x, { stiffness: 60, damping: 20, mass: 0.5 });
  const smoothY = useSpring(y, { stiffness: 60, damping: 20, mass: 0.5 });

  useEffect(() => {
    if (prefersReducedMotion) return;
    const isFinePointer = window.matchMedia('(pointer: fine)').matches;
    if (!isFinePointer) return;
    setEnabled(true);

    function handleMove(event: PointerEvent) {
      x.set(event.clientX);
      y.set(event.clientY);
    }
    window.addEventListener('pointermove', handleMove);
    return () => window.removeEventListener('pointermove', handleMove);
  }, [prefersReducedMotion, x, y]);

  if (!enabled) return null;

  return (
    <motion.div
      aria-hidden="true"
      className="pointer-events-none fixed left-0 top-0 z-0 h-[420px] w-[420px] rounded-full opacity-[0.08] mix-blend-screen"
      style={{
        translateX: smoothX,
        translateY: smoothY,
        x: '-50%',
        y: '-50%',
        background: 'radial-gradient(circle, #d4af37 0%, transparent 70%)',
      }}
    />
  );
}
