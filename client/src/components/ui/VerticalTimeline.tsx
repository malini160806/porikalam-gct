import { motion } from 'framer-motion';
import type { ReactNode } from 'react';

export type VerticalTimelineItem = {
  id: string;
  title: string;
  meta?: string;
  description?: string;
  badge?: ReactNode;
};

type VerticalTimelineProps = {
  items: VerticalTimelineItem[];
  tone?: 'light' | 'dark';
};

/** Dense vertical timeline for multi-entry lists (Schedule, Legacy) — same gold-node language as Timeline.tsx. */
export function VerticalTimeline({ items, tone = 'light' }: VerticalTimelineProps) {
  const titleColor = tone === 'dark' ? 'text-cream' : 'text-navy';
  const metaColor = tone === 'dark' ? 'text-gold' : 'text-brown';
  const descColor = tone === 'dark' ? 'text-beige/75' : 'text-slate';
  const lineColor = tone === 'dark' ? 'bg-gold/30' : 'bg-navy/15';

  return (
    <div className="relative flex flex-col gap-8 pl-10 sm:pl-14">
      <div className={`absolute left-[15px] top-2 bottom-2 w-px sm:left-[23px] ${lineColor}`} />
      {items.map((item, index) => (
        <motion.div
          key={item.id}
          initial={{ opacity: 0, x: -16 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true, amount: 0.4 }}
          transition={{ duration: 0.45, delay: index * 0.06 }}
          className="relative"
        >
          <span className="absolute -left-10 top-0 z-10 flex h-8 w-8 items-center justify-center rounded-full border-2 border-gold bg-navy sm:-left-14 sm:h-10 sm:w-10">
            <span className="h-2 w-2 rounded-full bg-gold" />
          </span>
          <div className="flex flex-col gap-1 border-b border-current/10 pb-6">
            <div className="flex flex-wrap items-center gap-3">
              <h4 className={`font-heading text-lg font-semibold tracking-wide sm:text-xl ${titleColor}`}>
                {item.title}
              </h4>
              {item.badge}
            </div>
            {item.meta && (
              <span className={`font-body text-xs font-semibold uppercase tracking-wider ${metaColor}`}>
                {item.meta}
              </span>
            )}
            {item.description && (
              <p className={`font-body text-sm leading-relaxed ${descColor}`}>{item.description}</p>
            )}
          </div>
        </motion.div>
      ))}
    </div>
  );
}
