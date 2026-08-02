import { motion } from 'framer-motion';
import { ArrowRight, Clock, MapPin, Users } from 'lucide-react';
import { Link } from 'react-router-dom';
import type { EventItem } from '@/data/types';
import { getEventIconSrc } from '@/utils/eventIcons';
import { Badge } from '@/components/ui/Badge';

type EventCardProps = {
  event: EventItem;
  index?: number;
};

export function EventCard({ event, index = 0 }: EventCardProps) {
  return (
    <motion.article
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.3 }}
      transition={{ duration: 0.5, delay: index * 0.06 }}
      whileHover={{ y: -6, boxShadow: '0 12px 32px -8px rgba(212,175,55,0.4)', borderColor: 'rgba(212,175,55,0.8)' }}
      className="group flex h-full flex-col justify-between border border-gold/30 bg-navy p-6 shadow-card transition-colors duration-300"
    >
      <div>
        <div className="mb-5 flex h-14 w-14 items-center justify-center overflow-hidden border border-gold/50 bg-cream/95 p-1">
          <img
            src={getEventIconSrc(event.icon)}
            alt=""
            className={`h-full w-full scale-150 object-contain ${event.icon === 'rocket' ? 'rotate-180' : ''}`}
          />
        </div>
        <h3 className="font-heading text-2xl font-semibold tracking-wide text-cream">{event.title}</h3>
        <p className="mt-1 font-body text-xs font-semibold uppercase tracking-wider text-gold">
          {event.format === 'team' ? 'Team Event' : 'Individual Event'}
        </p>
        <p className="mt-3 line-clamp-4 font-body text-sm text-beige/80 leading-relaxed">
          {event.description}
        </p>

        <dl className="mt-4 grid grid-cols-2 gap-x-4 gap-y-2 border-t border-gold/15 pt-4">
          <div className="flex items-center gap-1.5 font-body text-xs text-beige/70">
            <Clock size={13} className="shrink-0 text-gold" />
            {event.duration}
          </div>
          <div className="flex items-center gap-1.5 font-body text-xs text-beige/70">
            <MapPin size={13} className="shrink-0 text-gold" />
            {event.venue}
          </div>
          <div className="flex items-center gap-1.5 font-body text-xs text-beige/70">
            <Users size={13} className="shrink-0 text-gold" />
            {event.formatMode === 'competition' ? 'Competition' : 'Participation'}
          </div>
          {event.prequalifierRequired && (
            <Badge variant="gold" className="w-fit">
              Prequalifier Required
            </Badge>
          )}
        </dl>

        <div className="mt-4 flex flex-wrap gap-2">
          {event.tags.map((tag) => (
            <Badge key={tag} variant={tag === 'Open to All' ? 'gold' : 'navy'}>
              {tag}
            </Badge>
          ))}
        </div>
      </div>
      <Link
        to={`/events/${event.id}`}
        className="mt-6 inline-flex items-center gap-2 font-body text-xs font-semibold uppercase tracking-widest text-gold hover:text-gold-light"
      >
        View Event <ArrowRight size={14} />
      </Link>
    </motion.article>
  );
}
