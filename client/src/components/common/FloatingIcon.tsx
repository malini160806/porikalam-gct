import { motion } from 'framer-motion';

type FloatingIconProps = {
  src: string;
  className?: string;
  duration?: number;
  variant?: 'rotate' | 'bob';
};

/** Ambient decorative accent for the Drive icon set — faint, slow-moving, non-interactive. */
export function FloatingIcon({ src, className = '', duration = 30, variant = 'rotate' }: FloatingIconProps) {
  const animate = variant === 'rotate' ? { rotate: 360 } : { y: [0, -14, 0] };

  return (
    <motion.img
      src={src}
      alt=""
      aria-hidden="true"
      className={`pointer-events-none select-none opacity-[0.08] ${className}`}
      animate={animate}
      transition={{ duration, repeat: Infinity, ease: variant === 'rotate' ? 'linear' : 'easeInOut' }}
    />
  );
}
