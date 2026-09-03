import { Sparkles } from 'lucide-react';
import { SITE } from '@/constants/site';

const ANNOUNCEMENT = `Porikkalam ${SITE.year} — ${SITE.eventDateRange} at ${SITE.college}, Coimbatore — Registrations Open Now!`;

export function AnnouncementBar() {
  return (
    <div
      role="note"
      aria-label="Site announcement"
      className="fixed inset-x-0 top-0 z-50 flex h-9 items-center justify-center overflow-hidden border-b border-navy-deep/15 bg-gradient-to-r from-gold-light via-gold to-gold-light px-4"
    >
      <span className="flex items-center gap-3 truncate font-body text-[11px] font-semibold uppercase tracking-[0.14em] text-navy-deep sm:text-xs">
        <Sparkles size={13} className="shrink-0 text-navy-deep/70" />
        <span className="truncate">{ANNOUNCEMENT}</span>
      </span>
    </div>
  );
}
