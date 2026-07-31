import { motion } from 'framer-motion';
import { ArrowRight } from 'lucide-react';
import type { EventItem } from '@/data/types';
import { getIcon } from '@/utils/icons';
import { Badge } from '@/components/ui/Badge';

type EventCardProps = {
  event: EventItem;
  index?: number;
};

export function EventCard({ event, index = 0 }: EventCardProps) {
  const Icon = getIcon(event.icon);

  return (
    <motion.article
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.3 }}
      transition={{ duration: 0.5, delay: index * 0.06 }}
      whileHover={{ y: -6 }}
      className="group flex flex-col justify-between border border-gold/30 bg-navy p-6 shadow-card"
    >
      <div>
        <div className="mb-5 flex h-14 w-14 items-center justify-center border border-gold/50 text-gold transition-colors duration-200 group-hover:bg-gold group-hover:text-navy">
          <Icon size={26} strokeWidth={1.5} />
        </div>
        <h3 className="font-heading text-lg text-cream">{event.title}</h3>
        <p className="mt-1 font-body text-xs uppercase tracking-wider text-gold">{event.tagline}</p>
        <p className="mt-3 font-body text-sm text-beige/80 leading-relaxed">{event.description}</p>
        <div className="mt-4 flex flex-wrap gap-2">
          {event.tags.map((tag) => (
            <Badge key={tag} variant="navy">
              {tag}
            </Badge>
          ))}
        </div>
      </div>
      <a
        href={`/events#${event.id}`}
        className="mt-6 inline-flex items-center gap-2 font-body text-xs font-semibold uppercase tracking-widest text-gold hover:text-gold-light"
      >
        View Event <ArrowRight size={14} />
      </a>
    </motion.article>
  );
}
