import { motion } from 'framer-motion';
import { Bot, Sparkles } from 'lucide-react';
import { getIcon } from '@/utils/icons';
import { useCountUp } from '@/hooks/useCountUp';
import { statistics } from '@/data/statistics';

function NumberTile({ stat, index }: { stat: (typeof statistics)[number]; index: number }) {
  const Icon = getIcon(stat.icon);
  const { ref, value } = useCountUp(stat.value);

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.4 }}
      transition={{ duration: 0.45, delay: index * 0.08 }}
      whileHover={{ y: -4, borderColor: 'rgba(212,175,55,0.7)' }}
      className="flex flex-col items-center gap-2 border border-gold/25 bg-charcoal px-4 py-7 text-center shadow-card"
    >
      <Icon size={26} className="text-gold" strokeWidth={1.5} />
      <span className="font-heading text-3xl font-bold tracking-wide text-cream sm:text-4xl">
        {value.toLocaleString()}
        {stat.suffix}
      </span>
      <span className="font-body text-xs font-semibold uppercase tracking-widest text-beige/80">
        {stat.label}
      </span>
    </motion.div>
  );
}

const DESCRIPTIVE_TILES = [
  { icon: Bot, label: 'Technical & Non-Technical Events' },
  { icon: Sparkles, label: 'Innovate · Collaborate · Inspire' },
];

export function EventHighlights() {
  return (
    <div className="relative z-10 mx-auto max-w-6xl px-4 pb-20 sm:px-6">
      <div className="mb-8 flex items-center justify-center gap-4">
        <span className="h-px w-16 bg-gold/50" />
        <span className="font-body text-xs font-bold uppercase tracking-[0.3em] text-gold">
          Event Highlights
        </span>
        <span className="h-px w-16 bg-gold/50" />
      </div>

      <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-6">
        {statistics.map((stat, index) => (
          <NumberTile key={stat.id} stat={stat} index={index} />
        ))}
        {DESCRIPTIVE_TILES.map((tile, index) => (
          <motion.div
            key={tile.label}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.4 }}
            transition={{ duration: 0.45, delay: (statistics.length + index) * 0.08 }}
            whileHover={{ y: -4, borderColor: 'rgba(212,175,55,0.7)' }}
            className="flex flex-col items-center justify-center gap-2 border border-gold/25 bg-charcoal px-4 py-7 text-center shadow-card"
          >
            <tile.icon size={26} className="text-gold" strokeWidth={1.5} />
            <span className="font-body text-xs font-semibold uppercase tracking-widest text-beige/80">
              {tile.label}
            </span>
          </motion.div>
        ))}
      </div>
    </div>
  );
}
