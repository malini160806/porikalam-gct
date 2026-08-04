import { motion } from 'framer-motion';
import { ArrowRight, Clock, MapPin, ShieldCheck, Users } from 'lucide-react';
import { Link } from 'react-router-dom';
import type { EventItem } from '@/data/types';
import { getEventIconComponent } from '@/components/icons/EventIcons';
import { Badge } from '@/components/ui/Badge';
import { CornerOrnament } from '@/components/common/CornerOrnament';
import { SITE } from '@/constants/site';

type WorkshopCardProps = {
  event: EventItem;
  index?: number;
};

/** Parchment "workshop plate" card — richer framing than the standard EventCard to match the Workshops page's illustrated hero. */
export function WorkshopCard({ event, index = 0 }: WorkshopCardProps) {
  const Icon = getEventIconComponent(event.icon);

  return (
    <motion.article
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.3 }}
      transition={{ duration: 0.5, delay: index * 0.06 }}
      whileHover={{
        y: -6,
        boxShadow: '0 16px 36px -10px rgba(139,105,20,0.35), 0 10px 24px -12px rgba(61,90,117,0.25)',
        borderColor: 'rgba(212,175,55,0.9)',
      }}
      className="group relative flex h-full flex-col justify-between overflow-hidden border border-gold/40 bg-[linear-gradient(160deg,#fdf8ec_0%,#f3e6c8_100%)] p-7 shadow-card transition-colors duration-300"
    >
      <CornerOrnament corner="top-left" variant="floral" size={44} opacity={0.4} />
      <CornerOrnament corner="bottom-right" variant="floral" size={44} opacity={0.4} />

      <div>
        <div className="mb-5 flex items-center gap-4">
          <div className="flex h-16 w-16 shrink-0 items-center justify-center rounded-full border-2 border-gold/60 bg-cream p-3 text-brown shadow-[0_0_0_4px_rgba(212,175,55,0.12)]">
            <Icon className="h-full w-full" />
          </div>
          <div>
            <p className="font-body text-[11px] font-semibold uppercase tracking-[0.2em] text-brown/70">Workshop</p>
            <h3 className="font-heading text-xl font-semibold tracking-wide text-navy sm:text-2xl">{event.title}</h3>
          </div>
        </div>

        <div className="mb-4 flex items-center gap-2">
          <span className="h-1.5 w-1.5 rotate-45 bg-navy/70" />
          <span className="h-px w-10 bg-navy/40" />
        </div>

        <p className="line-clamp-4 font-body text-sm leading-relaxed text-slate">{event.description}</p>

        <dl className="mt-4 grid grid-cols-2 gap-x-4 gap-y-2 border-t border-brown/15 pt-4">
          <div className="flex items-center gap-1.5 font-body text-xs text-brown/80">
            <Clock size={13} className="shrink-0 text-brown" />
            {event.duration}
          </div>
          <div className="flex items-center gap-1.5 font-body text-xs text-brown/80">
            <MapPin size={13} className="shrink-0 text-brown" />
            {event.venue}
          </div>
          <div className="flex items-center gap-1.5 font-body text-xs text-brown/80">
            <Users size={13} className="shrink-0 text-brown" />
            {event.formatMode === 'competition' ? 'Competition' : 'Participation'}
          </div>
          {event.prequalifierRequired && (
            <Badge variant="navy" className="w-fit">
              Prequalifier Required
            </Badge>
          )}
        </dl>

        <div className="mt-4 flex flex-wrap gap-2">
          {event.tags.map((tag) => (
            <Badge key={tag} variant={tag === 'Open to All' ? 'gold' : 'outline'}>
              {tag}
            </Badge>
          ))}
        </div>

        {event.prequalifierRequired && (
          <p className="mt-4 flex items-start gap-2 border-t border-brown/15 pt-4 font-body text-xs text-brown/80">
            <ShieldCheck size={14} className="mt-0.5 shrink-0 text-brown" />
            All registrants compete in an online prequalifier round in {SITE.prequalifierWindow} — only
            those who qualify are selected to compete in the 2-day mega event on campus.
          </p>
        )}

        {event.prerequisites && (
          <p className="mt-4 border-t border-brown/15 pt-4 font-body text-xs text-brown/80">
            <span className="font-semibold uppercase tracking-wider text-brown">Prerequisites: </span>
            {event.prerequisites}
          </p>
        )}
      </div>

      <Link
        to={`/events/${event.id}`}
        className="relative mt-6 inline-flex items-center gap-2 font-body text-xs font-semibold uppercase tracking-widest text-brown transition-colors group-hover:text-navy"
      >
        View Workshop <ArrowRight size={14} className="transition-transform group-hover:translate-x-1" />
      </Link>
    </motion.article>
  );
}
