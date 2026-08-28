import type { ReactNode } from 'react';
import { motion } from 'framer-motion';
import { ArrowRight, Clock, MapPin, ShieldCheck, Users, Users2 } from 'lucide-react';
import type { EventItem } from '@/data/types';
import { getEventIconComponent } from '@/components/icons/EventIcons';
import { Badge } from '@/components/ui/Badge';
import { Button } from '@/components/ui/Button';
import { CornerOrnament } from '@/components/common/CornerOrnament';
import { SITE } from '@/constants/site';
import { EVENT_CATEGORY_LABELS } from '@/data/eventMeta';
import posterPlaceholder from '@/assets/heritage/gct-building-banner.png';

type EventCardProps = {
  event: EventItem;
  index?: number;
};

const REGISTRATION_LABELS: Record<NonNullable<EventItem['registrationStatus']>, string> = {
  open: 'Registrations Open',
  closed: 'Registrations Closed',
  'coming-soon': 'Opening Soon',
};

function RegistrationStatus({ status = 'open' }: { status?: EventItem['registrationStatus'] }) {
  const dotClasses: Record<NonNullable<EventItem['registrationStatus']>, string> = {
    open: 'bg-gold animate-pulse',
    closed: 'bg-beige/40',
    'coming-soon': 'bg-tech-blue animate-pulse',
  };
  const textClasses: Record<NonNullable<EventItem['registrationStatus']>, string> = {
    open: 'text-gold',
    closed: 'text-beige/50',
    'coming-soon': 'text-tech-blue',
  };

  return (
    <span
      className={`inline-flex shrink-0 items-center gap-1.5 font-body text-[10px] font-semibold uppercase tracking-widest ${textClasses[status]}`}
    >
      <span className={`h-1.5 w-1.5 rounded-full ${dotClasses[status]}`} />
      {REGISTRATION_LABELS[status]}
    </span>
  );
}

function DetailRow({ icon, label, value }: { icon: ReactNode; label: string; value: ReactNode }) {
  return (
    <div className="flex items-start gap-2">
      <span className="mt-0.5 shrink-0 text-gold">{icon}</span>
      <div className="min-w-0">
        <p className="font-body text-[9px] font-semibold uppercase tracking-wider text-gold/80">{label}</p>
        <p className="font-body text-xs leading-snug text-beige/80">{value}</p>
      </div>
    </div>
  );
}

export function EventCard({ event, index = 0 }: EventCardProps) {
  const Icon = getEventIconComponent(event.icon);
  const registrationStatus = event.registrationStatus ?? 'open';

  return (
    <motion.article
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.3 }}
      transition={{ duration: 0.5, delay: index * 0.06 }}
      whileHover={{
        y: -6,
        boxShadow: '0 12px 36px -8px rgba(212,175,55,0.45), 0 8px 24px -10px rgba(61,90,117,0.35)',
        borderColor: 'rgba(212,175,55,0.8)',
      }}
      className="group relative flex h-full flex-col overflow-hidden rounded-sm border border-gold/30 shadow-card transition-colors duration-300"
    >
      {/* Poster */}
      <div className="relative h-36 shrink-0 overflow-hidden">
        <img
          src={event.poster ?? posterPlaceholder}
          alt={event.poster ? `${event.title} poster` : ''}
          className="absolute inset-0 h-full w-full object-cover transition-transform duration-500 ease-out group-hover:scale-105"
        />
        {!event.poster && (
          <div className="absolute inset-0 flex items-center justify-center bg-navy-deep/45">
            <div className="flex h-12 w-12 items-center justify-center rounded-full border-2 border-gold/60 bg-navy-deep/60 p-2.5 text-gold shadow-[0_0_24px_-4px_rgba(212,175,55,0.5)] backdrop-blur-sm">
              <Icon className="h-full w-full" />
            </div>
          </div>
        )}
        <div className="absolute inset-x-0 bottom-0 h-2/3 bg-gradient-to-t from-navy-deep/90 via-navy-deep/20 to-transparent" />
        <span className="absolute left-3 top-3 z-10 inline-flex items-center rounded-full border border-gold/50 bg-navy-deep/70 px-2.5 py-0.5 font-body text-[9px] font-semibold uppercase tracking-widest text-gold backdrop-blur-sm">
          {EVENT_CATEGORY_LABELS[event.category]}
        </span>
        <span className="absolute right-3 top-3 z-10 inline-flex items-center rounded-full border border-gold/30 bg-navy-deep/70 px-2.5 py-0.5 backdrop-blur-sm">
          <RegistrationStatus status={registrationStatus} />
        </span>
      </div>

      {/* Details */}
      <div className="navy-paper bp-grid-bg relative flex-1 overflow-y-auto border-t border-gold/20 p-4 shadow-[inset_0_0_44px_-24px_rgba(212,175,55,0.5)]">
        <CornerOrnament corner="top-left" variant="scroll" size={22} opacity={0.5} className="drop-shadow-[0_2px_6px_rgba(0,15,24,0.65)]" />
        <CornerOrnament corner="bottom-right" variant="scroll" size={22} opacity={0.5} className="drop-shadow-[0_2px_6px_rgba(0,15,24,0.65)]" />

        <div className="relative z-10 flex h-full flex-col justify-between">
          <div>
            <h3 className="font-heading text-lg font-semibold tracking-wide text-cream">
              {event.title}
            </h3>
            <p className="mt-0.5 font-body text-[11px] font-semibold uppercase tracking-wider text-gold">
              {event.format === 'team' ? 'Team Event' : 'Individual Event'}
            </p>

            <p className="mt-2 line-clamp-2 font-body text-xs leading-relaxed text-beige/80">
              {event.description}
            </p>

            <dl className="mt-3 grid grid-cols-2 gap-x-3 gap-y-2 border-t border-gold/15 pt-3">
              <DetailRow icon={<Clock size={12} />} label="Duration" value={event.duration} />
              <DetailRow
                icon={<Users size={12} />}
                label="Team Size"
                value={event.format === 'team' ? `Team of ${event.teamSize}` : 'Individual'}
              />
              <DetailRow icon={<MapPin size={12} />} label="Location" value={event.venue} />
              <DetailRow
                icon={<Users2 size={12} />}
                label="Registration Limit"
                value={`${event.expectedParticipants} Participants`}
              />
            </dl>

            <div className="mt-3 flex flex-wrap gap-1.5">
              <Badge variant="gold">{event.eligibility}</Badge>
              {event.prequalifierRequired ? (
                <Badge variant="navy">Prequalifier Required</Badge>
              ) : (
                <Badge variant="outline">No Prequalifier</Badge>
              )}
            </div>

            {event.prequalifierRequired && (
              <p className="mt-3 flex items-start gap-2 border-t border-gold/15 pt-3 font-body text-[11px] text-beige/70">
                <ShieldCheck size={13} className="mt-0.5 shrink-0 text-gold" />
                All registrants compete in an online prequalifier round in {SITE.prequalifierWindow} — only
                those who qualify are selected to compete in the 2-day mega event on campus.
              </p>
            )}
          </div>

          <Button
            to={`/events/${event.id}`}
            variant="secondary"
            size="sm"
            className="mt-4 w-fit"
            icon={<ArrowRight size={14} className="transition-transform group-hover:translate-x-1" />}
          >
            View Event
          </Button>
        </div>
      </div>
    </motion.article>
  );
}
