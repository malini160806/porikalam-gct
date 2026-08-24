import { motion } from 'framer-motion';
import { CornerOrnament } from './CornerOrnament';

type SpecimenCardProps = {
  image: string;
  title: string;
  caption?: string;
  index?: number;
  tone?: 'light' | 'dark';
};

/** Framed "museum plate" presentation for a single illustrated artifact/asset. */
export function SpecimenCard({ image, title, caption, index = 0, tone = 'light' }: SpecimenCardProps) {
  const isDark = tone === 'dark';
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.4 }}
      transition={{ duration: 0.45, delay: index * 0.08 }}
      className={`relative overflow-hidden border p-6 text-center ${
        isDark ? 'border-gold/25 bg-navy/60' : 'border-gold/25 bg-white/50 shadow-card'
      }`}
    >
      <CornerOrnament corner="top-left" variant="floral" size={40} opacity={0.35} />
      <div className="relative z-10 flex flex-col items-center gap-3">
        <div className="flex h-28 w-28 items-center justify-center sm:h-32 sm:w-32">
          <img src={image} alt={title} className="max-h-full max-w-full object-contain" />
        </div>
        <h3 className={`font-heading text-base font-semibold tracking-wide ${isDark ? 'text-cream' : 'text-navy'}`}>
          {title}
        </h3>
        {caption && (
          <p className={`font-body text-xs leading-relaxed ${isDark ? 'text-beige/70' : 'text-slate'}`}>{caption}</p>
        )}
      </div>
    </motion.div>
  );
}
