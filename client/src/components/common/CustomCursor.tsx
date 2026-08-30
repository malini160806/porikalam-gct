import { useCallback, useEffect, useRef, useState } from 'react';
import { AnimatePresence, motion, useMotionValue, useSpring } from 'framer-motion';
import { Sparkle, Star } from 'lucide-react';

const INTERACTIVE_SELECTOR = 'a, button, [role="button"], input, textarea, select, summary, label';
const SPARK_COLORS = ['#d4af37', '#e9c766', '#f5f1e8'];

type Spark = {
  id: number;
  x: number;
  y: number;
  size: number;
  dx: number;
  dy: number;
  rotate: number;
  color: string;
};

let sparkSeq = 0;

export function CustomCursor() {
  const [isFinePointer, setIsFinePointer] = useState(false);
  const [isHovering, setIsHovering] = useState(false);
  const [isVisible, setIsVisible] = useState(false);
  const [sparks, setSparks] = useState<Spark[]>([]);
  const lastSparkAt = useRef(0);

  const cursorX = useMotionValue(-100);
  const cursorY = useMotionValue(-100);
  const ringX = useSpring(cursorX, { damping: 22, stiffness: 240, mass: 0.6 });
  const ringY = useSpring(cursorY, { damping: 22, stiffness: 240, mass: 0.6 });

  useEffect(() => {
    const mql = window.matchMedia('(pointer: fine)');
    setIsFinePointer(mql.matches);
    const handleChange = (event: MediaQueryListEvent) => setIsFinePointer(event.matches);
    mql.addEventListener('change', handleChange);
    return () => mql.removeEventListener('change', handleChange);
  }, []);

  const spawnSpark = useCallback((x: number, y: number) => {
    const angle = Math.random() * Math.PI * 2;
    const distance = 18 + Math.random() * 28;
    const spark: Spark = {
      id: sparkSeq++,
      x,
      y,
      size: 6 + Math.random() * 9,
      dx: Math.cos(angle) * distance,
      dy: Math.sin(angle) * distance,
      rotate: Math.random() * 220 - 110,
      color: SPARK_COLORS[Math.floor(Math.random() * SPARK_COLORS.length)],
    };
    setSparks((prev) => [...prev.slice(-20), spark]);
  }, []);

  useEffect(() => {
    if (!isFinePointer) return;

    const handleMove = (event: MouseEvent) => {
      cursorX.set(event.clientX);
      cursorY.set(event.clientY);
      setIsVisible(true);

      const target = event.target as HTMLElement;
      setIsHovering(Boolean(target.closest?.(INTERACTIVE_SELECTOR)));

      const now = performance.now();
      if (now - lastSparkAt.current > 40) {
        lastSparkAt.current = now;
        spawnSpark(event.clientX, event.clientY);
      }
    };

    const handleLeaveWindow = () => setIsVisible(false);

    window.addEventListener('mousemove', handleMove);
    document.documentElement.addEventListener('mouseleave', handleLeaveWindow);
    document.body.classList.add('custom-cursor-active');

    return () => {
      window.removeEventListener('mousemove', handleMove);
      document.documentElement.removeEventListener('mouseleave', handleLeaveWindow);
      document.body.classList.remove('custom-cursor-active');
    };
  }, [isFinePointer, cursorX, cursorY, spawnSpark]);

  if (!isFinePointer) return null;

  return (
    <>
      {/* Star / spark trail shed as the cursor travels */}
      <AnimatePresence>
        {sparks.map((spark) => (
          <motion.div
            key={spark.id}
            className="pointer-events-none fixed left-0 top-0 z-[9997]"
            style={{ left: spark.x, top: spark.y, color: spark.color }}
            initial={{ opacity: 1, scale: 1, x: '-50%', y: '-50%', rotate: 0 }}
            animate={{
              opacity: 0,
              scale: 0.15,
              x: `calc(-50% + ${spark.dx}px)`,
              y: `calc(-50% + ${spark.dy}px)`,
              rotate: spark.rotate,
            }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.65, ease: 'easeOut' }}
            onAnimationComplete={() => {
              setSparks((prev) => prev.filter((s) => s.id !== spark.id));
            }}
          >
            <Star
              size={spark.size}
              fill="currentColor"
              strokeWidth={0}
            />
          </motion.div>
        ))}
      </AnimatePresence>

      {/* Trailing glow ring — lags behind with spring physics, blooms on hover */}
      <motion.div
        className="pointer-events-none fixed left-0 top-0 z-[9998] rounded-full border"
        style={{ x: ringX, y: ringY, translateX: '-50%', translateY: '-50%' }}
        animate={{
          opacity: isVisible ? 1 : 0,
          width: isHovering ? 68 : 42,
          height: isHovering ? 68 : 42,
          backgroundColor: isHovering ? 'rgba(212,175,55,0.14)' : 'rgba(212,175,55,0)',
          borderColor: isHovering ? 'rgba(212,175,55,0.9)' : 'rgba(212,175,55,0.4)',
        }}
        transition={{ duration: 0.25, ease: 'easeOut' }}
      />

      {/* Core sparkle — sits exactly at the pointer, spins slowly, flares on hover */}
      <motion.div
        className="pointer-events-none fixed left-0 top-0 z-[9999] text-gold drop-shadow-[0_0_10px_rgba(212,175,55,0.85)]"
        style={{ x: cursorX, y: cursorY, translateX: '-50%', translateY: '-50%' }}
        animate={{
          opacity: isVisible ? 1 : 0,
          scale: isHovering ? 1.5 : 1,
          rotate: 360,
        }}
        transition={{
          rotate: { duration: 5, repeat: Infinity, ease: 'linear' },
          scale: { duration: 0.25, ease: 'easeOut' },
          opacity: { duration: 0.2 },
        }}
      >
        <Sparkle
          size={30}
          fill="currentColor"
          strokeWidth={0.5}
        />
      </motion.div>
    </>
  );
}
