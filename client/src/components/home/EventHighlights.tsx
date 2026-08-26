import { motion } from 'framer-motion';
import { getIcon } from '@/routes/utils/icons';
import { useCountUp } from '@/hooks/useCountUp';
import { statistics } from '@/data/statistics';

function NumberTile({
  stat,
  index,
}: {
  stat: (typeof statistics)[number];
  index: number;
}) {
  const Icon = getIcon(stat.icon);
  const { ref, value } = useCountUp(stat.value);

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.4 }}
      transition={{ duration: 0.45, delay: index * 0.08 }}
      whileHover={{
        y: -4,
        borderColor: 'rgba(212,175,55,0.7)',
      }}
      className="flex flex-col items-center gap-2 border border-gold/25 bg-charcoal px-4 py-7 text-center shadow-card"
    >
      <Icon
        size={26}
        className="text-gold"
        strokeWidth={1.5}
      />

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

      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {statistics.slice(0, 4).map((stat, index) => (
          <NumberTile
            key={stat.id}
            stat={stat}
            index={index}
          />
        ))}
      </div>
    </div>
  );
}