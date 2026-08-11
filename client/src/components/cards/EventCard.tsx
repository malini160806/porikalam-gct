import type { ReactNode } from 'react';
import { motion } from 'framer-motion';
import { ArrowRight, Clock, GraduationCap, MapPin, ShieldCheck, Trophy, Users } from 'lucide-react';
import type { EventItem } from '@/data/types';
import { getEventIconComponent } from '@/components/icons/EventIcons';
import { Badge } from '@/components/ui/Badge';
import { Button } from '@/components/ui/Button';
import { CornerOrnament } from '@/components/common/CornerOrnament';
import { SITE } from '@/constants/site';
import { EVENT_CATEGORY_LABELS } from '@/data/events';
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

function DetailRow({ icon, children }: { icon: ReactNode; children: ReactNode }) {
  return (
    <div className="flex items-start gap-1.5 font-body text-xs text-beige/70">
      <span className="mt-0.5 shrink-0 text-gold">{icon}</span>
      <span className="leading-snug">{children}</span>
    </div>
  );
}

export function EventCard({ event, index = 0 }: EventCardProps) {
  const Icon = getEventIconComponent(event.icon);
  const registrationStatus = event.registrationStatus ?? 'open';
  const isOpenToAll = event.tags.includes('Open to All');

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
      className="group relative grid h-full grid-cols-1 overflow-hidden rounded-sm border border-gold/30 shadow-card transition-colors duration-300 sm:grid-cols-2"
    >
      <CornerOrnament corner="top-left" variant="scroll" size={36} opacity={0.5} className="z-20 drop-shadow-[0_2px_6px_rgba(0,15,24,0.65)]" />
      <CornerOrnament corner="bottom-right" variant="scroll" size={36} opacity={0.5} className="z-20 drop-shadow-[0_2px_6px_rgba(0,15,24,0.65)]" />

      {/* Left half — poster */}
      <div className="relative h-56 overflow-hidden sm:h-full">
        <img
          src={event.poster ?? posterPlaceholder}
          alt={event.poster ? `${event.title} poster` : ''}
          className="absolute inset-0 h-full w-full object-cover transition-transform duration-500 ease-out group-hover:scale-105"
        />
        {!event.poster && (
          <div className="absolute inset-0 flex items-center justify-center bg-navy-deep/45">
            <div className="flex h-20 w-20 items-center justify-center rounded-full border-2 border-gold/60 bg-navy-deep/60 p-4 text-gold shadow-[0_0_24px_-4px_rgba(212,175,55,0.5)] backdrop-blur-sm">
              <Icon className="h-full w-full" />
            </div>
          </div>
        )}
        <div className="absolute inset-x-0 bottom-0 h-2/3 bg-gradient-to-t from-navy-deep/90 via-navy-deep/20 to-transparent" />
        <span className="absolute left-4 top-4 z-10 inline-flex items-center rounded-full border border-gold/50 bg-navy-deep/70 px-3 py-1 font-body text-[10px] font-semibold uppercase tracking-widest text-gold backdrop-blur-sm">
          {EVENT_CATEGORY_LABELS[event.category]}
        </span>
        <span className="absolute right-4 top-4 z-10 inline-flex items-center rounded-full border border-gold/30 bg-navy-deep/70 px-3 py-1 backdrop-blur-sm">
          <RegistrationStatus status={registrationStatus} />
        </span>
      </div>

      {/* Right half — details */}
      <div className="navy-paper bp-grid-bg relative flex flex-col justify-between border-t border-gold/20 p-6 shadow-[inset_0_0_44px_-24px_rgba(212,175,55,0.5)] sm:border-l sm:border-t-0">
        <div>
          <h3 className="font-heading text-xl font-semibold tracking-wide text-cream sm:text-2xl">
            {event.title}
          </h3>
          <p className="mt-1 font-body text-xs font-semibold uppercase tracking-wider text-gold">
            {event.format === 'team' ? 'Team Event' : 'Individual Event'}
          </p>

          <p className="mt-3 line-clamp-3 font-body text-sm leading-relaxed text-beige/80">
            {event.description}
          </p>

          <dl className="mt-4 grid grid-cols-2 gap-x-4 gap-y-2 border-t border-gold/15 pt-4">
            <DetailRow icon={<Clock size={13} />}>{event.duration}</DetailRow>
            <DetailRow icon={<MapPin size={13} />}>{event.venue}</DetailRow>
            <DetailRow icon={<GraduationCap size={13} />}>{event.department}</DetailRow>
            <DetailRow icon={<Users size={13} />}>
              {event.formatMode === 'competition' ? 'Competition' : 'Participation'}
            </DetailRow>
            {event.prizePool && (
              <DetailRow icon={<Trophy size={13} />}>{event.prizePool}</DetailRow>
            )}
          </dl>

          <div className="mt-4 flex flex-wrap gap-2">
            {event.prequalifierRequired && <Badge variant="gold">Prequalifier Required</Badge>}
            {isOpenToAll && <Badge variant="gold">Open to All</Badge>}
            {event.tags
              .filter((tag) => tag !== 'Open to All')
              .map((tag) => (
                <Badge key={tag} variant={event.category === 'technical' ? 'tech' : 'navy'}>
                  {tag}
                </Badge>
              ))}
          </div>

          {event.prequalifierRequired && (
            <p className="mt-4 flex items-start gap-2 border-t border-gold/15 pt-4 font-body text-xs text-beige/70">
              <ShieldCheck size={14} className="mt-0.5 shrink-0 text-gold" />
              All registrants compete in an online prequalifier round in {SITE.prequalifierWindow} — only
              those who qualify are selected to compete in the 2-day mega event on campus.
            </p>
          )}

          {event.prerequisites && (
            <p className="mt-4 border-t border-gold/15 pt-4 font-body text-xs text-beige/70">
              <span className="font-semibold uppercase tracking-wider text-gold">Prerequisites: </span>
              {event.prerequisites}
            </p>
          )}
        </div>

        <Button
          to={`/events/${event.id}`}
          variant="secondary"
          size="sm"
          className="mt-6 w-fit"
          icon={<ArrowRight size={14} className="transition-transform group-hover:translate-x-1" />}
        >
          View Event
        </Button>
      </div>
    </motion.article>
  );
}
