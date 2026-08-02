import { motion } from 'framer-motion';
import { Pin } from 'lucide-react';
import { PageHero } from '@/components/common/PageHero';
import { Badge } from '@/components/ui/Badge';
import { announcements } from '@/data/announcements';
import type { AnnouncementItem } from '@/data/types';

const CATEGORY_LABELS: Record<AnnouncementItem['category'], string> = {
  registration: 'Registration',
  schedule: 'Schedule',
  workshop: 'Workshop',
  general: 'General',
};

const sorted = [...announcements].sort((a, b) => {
  if (!!a.pinned !== !!b.pinned) return a.pinned ? -1 : 1;
  return new Date(b.date).getTime() - new Date(a.date).getTime();
});

export default function Announcements() {
  return (
    <>
      <PageHero title="Announcements" subtitle="Stay current on registration, schedule, and workshop updates." />

      <section className="bg-cream py-24">
        <div className="mx-auto max-w-3xl px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col gap-6">
            {sorted.map((item, index) => (
              <motion.article
                key={item.id}
                initial={{ opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.4 }}
                transition={{ duration: 0.4, delay: index * 0.06 }}
                className={`flex flex-col gap-2 border p-6 ${
                  item.pinned ? 'border-gold bg-navy/5' : 'border-navy/15 bg-white/40'
                }`}
              >
                <div className="flex flex-wrap items-center gap-3">
                  {item.pinned && <Pin size={14} className="text-brown" />}
                  <Badge variant={item.pinned ? 'navy' : 'outline'}>{CATEGORY_LABELS[item.category]}</Badge>
                  <span className="font-body text-xs text-slate/70">
                    {new Date(item.date).toLocaleDateString(undefined, {
                      day: 'numeric',
                      month: 'short',
                      year: 'numeric',
                    })}
                  </span>
                </div>
                <h3 className="font-heading text-xl font-semibold tracking-wide text-navy">{item.title}</h3>
                <p className="font-body text-sm text-slate leading-relaxed">{item.content}</p>
              </motion.article>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
