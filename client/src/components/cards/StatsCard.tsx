import type { StatItem } from '@/data/types';
import { getIcon } from '@/routes/utils/icons';
import { useCountUp } from '@/hooks/useCountUp';

type StatsCardProps = {
  stat: StatItem;
};

export function StatsCard({ stat }: StatsCardProps) {
  const Icon = getIcon(stat.icon);
  const { ref, value } = useCountUp(stat.value);

  return (
    <div
      ref={ref}
      className="flex flex-col items-center gap-2 border border-gold/25 bg-navy px-6 py-8 text-center shadow-card"
    >
      <Icon size={28} className="text-gold" strokeWidth={1.5} />
      <span className="font-heading text-4xl font-bold tracking-wide text-cream sm:text-5xl">
        {value.toLocaleString()}
        {stat.suffix}
      </span>
      <span className="font-body text-xs font-semibold uppercase tracking-widest text-beige/80">
        {stat.label}
      </span>
    </div>
  );
}
