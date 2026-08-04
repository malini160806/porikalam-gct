import { motion } from 'framer-motion';
import { CalendarDays } from 'lucide-react';
import { useCountdown } from '@/hooks/useCountdown';
import { SITE } from '@/constants/site';

const UNITS: { key: 'days' | 'hours' | 'minutes' | 'seconds'; label: string }[] = [
  { key: 'days', label: 'Days' },
  { key: 'hours', label: 'Hours' },
  { key: 'minutes', label: 'Minutes' },
  { key: 'seconds', label: 'Seconds' },
];

export function Countdown() {
  const countdown = useCountdown(SITE.eventStart);

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, delay: 0.5 }}
      className="mt-10 flex flex-col items-center gap-5"
    >
      <span className="inline-flex items-center gap-2 font-body text-sm font-semibold uppercase tracking-[0.2em] text-beige">
        <CalendarDays size={16} className="text-gold" />
        {SITE.eventDateRange}
      </span>

      {countdown.isOver ? (
        <span className="font-heading text-xl font-semibold uppercase tracking-wide text-gold">
          Happening Now
        </span>
      ) : (
        <div className="flex flex-wrap items-center justify-center gap-2 sm:gap-4">
          {UNITS.map((unit) => (
            <div
              key={unit.key}
              className="flex flex-col items-center gap-1 border border-gold/30 bg-navy/50 px-3 py-2 backdrop-blur-sm sm:px-6 sm:py-4"
            >
              <span className="font-heading text-2xl font-bold tabular-nums text-gold sm:text-4xl">
                {String(countdown[unit.key]).padStart(2, '0')}
              </span>
              <span className="font-body text-[10px] font-semibold uppercase tracking-widest text-beige/70 sm:text-xs">
                {unit.label}
              </span>
            </div>
          ))}
        </div>
      )}
    </motion.div>
  );
}
