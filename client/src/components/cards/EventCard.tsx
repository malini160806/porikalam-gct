import type { ReactNode } from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { Users, Wallet, Trophy } from 'lucide-react';
import type { EventItem } from '@/data/types';
import { getEventIconComponent } from '@/components/icons/EventIcons';
import posterPlaceholder from '@/assets/heritage/gct-building-banner.png';

type EventCardProps = {
  event: EventItem;
  index?: number;
};

function StatPill({ icon, label }: { icon: ReactNode; label: string }) {
  return (
    <span className="inline-flex items-center gap-1.5 rounded-full border border-gold/50 bg-navy-deep/80 px-2.5 py-1 font-body text-xs font-semibold text-cream backdrop-blur-sm">
      <span className="shrink-0 text-gold">{icon}</span>
      {label}
    </span>
  );
}

export function EventCard({ event, index = 0 }: EventCardProps) {
  const Icon = getEventIconComponent(event.icon);

  return (
    <motion.article
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.3 }}
      transition={{ duration: 0.5, delay: index * 0.06 }}
      whileHover={{
        y: -6,
        boxShadow:
          '0 12px 36px -8px rgba(212,175,55,0.45), 0 8px 24px -10px rgba(61,90,117,0.35)',
        borderColor: 'rgba(212,175,55,0.8)',
      }}
      className="group relative h-80 overflow-hidden rounded-sm border border-gold/30 shadow-card transition-colors duration-300"
    >
      <Link to={`/events/${event.id}`} className="block h-full w-full">
        <img
          src={event.poster ?? posterPlaceholder}
          alt={event.poster ? `${event.title} poster` : ''}
          className="absolute inset-0 h-full w-full object-cover transition-transform duration-500 ease-out group-hover:scale-105"
        />

        {!event.poster && (
          <div className="absolute inset-0 flex items-center justify-center bg-navy-deep/45">
            <div className="flex h-14 w-14 items-center justify-center rounded-full border-2 border-gold/60 bg-navy-deep/60 p-3 text-gold shadow-[0_0_24px_-4px_rgba(212,175,55,0.5)] backdrop-blur-sm">
              <Icon className="h-full w-full" />
            </div>
          </div>
        )}

        {/* Scrim for text legibility */}
        <div className="absolute inset-0 bg-gradient-to-t from-navy-deep via-navy-deep/75 via-45% to-transparent" />

        <div className="absolute inset-x-0 bottom-0 p-4">
          <h3 className="font-heading text-lg font-semibold tracking-wide text-cream drop-shadow-[0_1px_4px_rgba(0,0,0,0.6)]">
            {event.title}
          </h3>

          <p className="mt-1.5 line-clamp-2 font-body text-xs leading-relaxed text-beige/90 drop-shadow-[0_1px_3px_rgba(0,0,0,0.6)]">
            {event.description}
          </p>

          <div className="mt-3 flex flex-wrap gap-2">
            {/* Team / Individual */}
            <StatPill
              icon={<Users size={13} />}
              label={
                event.format === 'team'
                  ? `Team of ${event.teamSize}`
                  : 'Individual'
              }
            />

            {/* Registration Fee */}
            {event.registrationFee && (
              <StatPill
                icon={<Wallet size={13} />}
                label={event.registrationFee}
              />
            )}

            {/* Prize Pool */}
            {event.prizePool && (
              <StatPill
                icon={<Trophy size={13} />}
                label={`Prize Pool: ${event.prizePool}`}
              />
            )}
          </div>
        </div>
      </Link>
    </motion.article>
  );
}
