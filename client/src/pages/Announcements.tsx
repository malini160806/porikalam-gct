import type { ComponentType } from 'react';
import { motion } from 'framer-motion';
import { Pin, ExternalLink } from 'lucide-react';
import { FaInstagram, FaFacebookF } from 'react-icons/fa';
import { PageHero } from '@/components/common/PageHero';
import { Badge } from '@/components/ui/Badge';
import { useAnnouncements } from '@/hooks/useAnnouncements';
import type { AnnouncementItem } from '@/data/types';

const CATEGORY_LABELS: Record<AnnouncementItem['category'], string> = {
  registration: 'Registration',
  schedule: 'Schedule',
  workshop: 'Workshop',
  general: 'General',
  social: 'Social',
};

const SOURCE_ICONS: Partial<Record<NonNullable<AnnouncementItem['source']>, ComponentType<{ size?: number; className?: string }>>> = {
  instagram: FaInstagram,
  facebook: FaFacebookF,
};

export default function Announcements() {
  const { announcements, loading, error } = useAnnouncements();

  return (
    <>
      <PageHero title="Announcements" subtitle="Stay current on registration, schedule, and workshop updates." />

      <section className="bg-cream py-24">
        <div className="mx-auto max-w-3xl px-4 sm:px-6 lg:px-8">
          {loading ? (
            <p className="text-center font-body text-sm text-slate/70">Loading announcements…</p>
          ) : error ? (
            <p className="text-center font-body text-sm text-slate/70">{error}</p>
          ) : (
            <div className="flex flex-col gap-6">
              {announcements.map((item, index) => {
                const SourceIcon = item.source ? SOURCE_ICONS[item.source] : undefined;
                return (
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
                      {SourceIcon && <SourceIcon size={14} className="text-brown" />}
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
                    {item.mediaUrl && (
                      <img
                        src={item.mediaUrl}
                        alt=""
                        className="mt-2 max-h-72 w-full rounded-sm object-cover"
                        loading="lazy"
                      />
                    )}
                    {item.sourceUrl && (
                      <a
                        href={item.sourceUrl}
                        target="_blank"
                        rel="noreferrer"
                        className="mt-1 inline-flex w-fit items-center gap-1.5 font-body text-xs font-semibold text-brown hover:underline"
                      >
                        View original post <ExternalLink size={12} />
                      </a>
                    )}
                  </motion.article>
                );
              })}
            </div>
          )}
        </div>
      </section>
    </>
  );
}
