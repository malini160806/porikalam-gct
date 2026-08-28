import { useMemo, useState, type ReactNode } from 'react';
import { motion } from 'framer-motion';
import {
  ArrowRight,
  Bot,
  Building2,
  Clock,
  Compass,
  Cpu,
  Droplets,
  FileText,
  Gavel,
  HardHat,
  Handshake,
  Image,
  Landmark,
  MapPin,
  Mic2,
  Music,
  PenTool,
  Plane,
  Rocket,
  Search,
  Sparkles,
  Terminal,
  Trophy,
  UtensilsCrossed,
  Users,
  Wrench,
} from 'lucide-react';
import { Link } from 'react-router-dom';
import { PageHero } from '@/components/common/PageHero';
import { SectionHeading } from '@/components/ui/SectionHeading';
import { Tabs } from '@/components/ui/Tabs';
import { schedule } from '@/data/schedule';
import type { ScheduleItem } from '@/data/types';

type IconType = typeof Rocket;

const DAY_OPTIONS: { label: string; value: '1' | '2' }[] = [
  { label: 'Day 1 — 25 Sept', value: '1' },
  { label: 'Day 2 — 26 Sept', value: '2' },
];

const DAY_META: Record<'1' | '2', { title: string; tagline: string }> = {
  '1': { title: 'Day 1', tagline: 'Discover · Compete · Connect' },
  '2': { title: 'Day 2', tagline: 'Compete · Experience · Celebrate' },
};

/** Icons keyed by relatedEventId — most precise, matches the actual event being run. */
const RELATED_ICONS: Record<string, IconType> = {
  'paper-presentation': FileText,
  hackathon: Terminal,
  'deep-dive-challenge': Compass,
  'civil-cbi': HardHat,
  sketchshift: PenTool,
  'human-matrix': Users,
  'robo-soccer': Bot,
  'what-if-reverse-engineering-debugging': Cpu,
  'flightcraft-skyworks': Plane,
  structron: Building2,
  'code-detective-speed-relay': Search,
  'poster-designing': Image,
  'robo-rally': Bot,
  'water-rocketry': Droplets,
  'ipl-auction': Gavel,
};

/** Icons for the schedule's own titles — ceremonies, breaks, and the two flagship tracks. */
const TITLE_ICONS: Record<string, IconType> = {
  Inauguration: Landmark,
  'Opening Ceremony — Thulira & Tech Thiral': Sparkles,
  'Thulira — Student Startup Challenge': Rocket,
  'Tech Thiral — Industry Expo': Building2,
  'Tech Talks': Mic2,
  Workshop: Wrench,
  'Lunch Break': UtensilsCrossed,
  'Porikkalam Connect': Handshake,
  Culturals: Music,
  'Valedictory & Prize Distribution': Trophy,
};

const TYPE_FALLBACK_ICONS: Record<ScheduleItem['type'], IconType> = {
  session: Compass,
  workshop: Wrench,
  ceremony: Sparkles,
  break: UtensilsCrossed,
};

function getIcon(item: ScheduleItem): IconType {
  if (item.relatedEventId && RELATED_ICONS[item.relatedEventId]) return RELATED_ICONS[item.relatedEventId];
  if (TITLE_ICONS[item.title]) return TITLE_ICONS[item.title];
  return TYPE_FALLBACK_ICONS[item.type];
}

function formatTime(time: string) {
  const [hours, minutes] = time.split(':').map(Number);
  const period = hours >= 12 ? 'PM' : 'AM';
  const hour12 = hours % 12 === 0 ? 12 : hours % 12;
  return `${hour12}:${String(minutes).padStart(2, '0')} ${period}`;
}

type TimeBlock = { startTime: string; endTime: string; items: ScheduleItem[]; isLast: boolean };
type AgendaEntry = { kind: 'block'; block: TimeBlock } | { kind: 'gap'; startTime: string; endTime: string };

/** Groups same-day items by shared start time (parallel tracks share a block instead of reading as
 * back-to-back), then flags any real idle window between blocks as a subtle transition — never invented. */
function buildAgenda(items: ScheduleItem[]): AgendaEntry[] {
  const map = new Map<string, ScheduleItem[]>();
  for (const item of items) {
    const list = map.get(item.startTime) ?? [];
    list.push(item);
    map.set(item.startTime, list);
  }

  const blocks: TimeBlock[] = [...map.entries()]
    .sort(([a], [b]) => a.localeCompare(b))
    .map(([startTime, groupItems]) => ({
      startTime,
      endTime: groupItems.reduce((latest, i) => (i.endTime > latest ? i.endTime : latest), groupItems[0].endTime),
      items: groupItems,
      isLast: false,
    }));

  if (blocks.length > 0) blocks[blocks.length - 1].isLast = true;

  const entries: AgendaEntry[] = [];
  blocks.forEach((block, index) => {
    entries.push({ kind: 'block', block });
    const next = blocks[index + 1];
    if (next && block.endTime < next.startTime) {
      entries.push({ kind: 'gap', startTime: block.endTime, endTime: next.startTime });
    }
  });
  return entries;
}

function FlagshipCard({
  icon: Icon,
  title,
  subtitle,
  description,
  to,
  delay = 0,
}: {
  icon: IconType;
  title: string;
  subtitle: string;
  description: string;
  to: string;
  delay?: number;
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.3 }}
      transition={{ duration: 0.6, delay }}
      whileHover={{ y: -6 }}
    >
      <Link
        to={to}
        className="group flex h-full flex-col gap-5 border border-gold/40 bg-navy-deep p-8 shadow-card transition-colors duration-300 hover:border-gold sm:p-10"
      >
        <div className="flex items-center gap-4">
          <div className="flex h-14 w-14 shrink-0 items-center justify-center rounded-full border border-gold/50 bg-navy text-gold">
            <Icon size={26} strokeWidth={1.5} />
          </div>
          <div>
            <h3 className="font-heading text-2xl font-bold uppercase tracking-wide text-cream">{title}</h3>
            <p className="font-body text-xs font-semibold uppercase tracking-[0.15em] text-gold/80">{subtitle}</p>
          </div>
        </div>
        <p className="font-body text-sm leading-relaxed text-beige/80">{description}</p>
        <div className="mt-auto flex items-center gap-2 pt-2 font-body text-xs font-bold uppercase tracking-[0.2em] text-gold transition-transform duration-300 group-hover:translate-x-1">
          View Details
          <ArrowRight size={14} />
        </div>
      </Link>
    </motion.div>
  );
}

function BlockShell({
  children,
  time,
  prominent = false,
}: {
  children: ReactNode;
  time: string;
  prominent?: boolean;
}) {
  return (
    <motion.section
      initial={{ opacity: 0, y: 16 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.3 }}
      transition={{ duration: 0.45 }}
      className={
        prominent
          ? 'relative overflow-hidden border-2 border-gold bg-navy px-6 py-7 shadow-[0_0_36px_-10px_rgba(212,175,55,0.55)] sm:px-8'
          : 'relative border border-gold/20 bg-navy-deep/60 p-5 sm:p-6'
      }
    >
      <div className="mb-4 flex items-center gap-2">
        <Clock size={14} className="text-gold" />
        <span className="font-heading text-xs font-bold uppercase tracking-[0.15em] text-gold sm:text-sm">
          {time}
        </span>
      </div>
      {children}
    </motion.section>
  );
}

const FULL_DAY_TITLES = new Set([
  'Thulira — Student Startup Challenge',
  'Tech Thiral — Industry Expo',
]);

function EventCard({ item, blockEndTime, index }: { item: ScheduleItem; blockEndTime: string; index: number }) {
  const Icon = getIcon(item);
  const isFullDay = FULL_DAY_TITLES.has(item.title);
  const showEndTime = !isFullDay && item.endTime !== blockEndTime;

  return (
    <motion.div
      initial={{ opacity: 0, y: 14 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.4 }}
      transition={{ duration: 0.35, delay: index * 0.04 }}
      whileHover={{ y: -4, borderColor: 'rgba(212,175,55,0.6)' }}
      className="flex flex-col gap-2 border border-gold/15 bg-navy/50 p-4 transition-colors duration-300"
    >
      <Icon size={18} strokeWidth={1.6} className="text-gold" />
      <h4 className="font-heading text-sm font-semibold leading-snug tracking-wide text-cream">{item.title}</h4>
      <span className="flex items-center gap-1 font-body text-[11px] text-beige/60">
        <MapPin size={11} className="shrink-0" />
        {item.venue}
        {isFullDay && ' · Full Day'}
        {showEndTime && ` · until ${formatTime(item.endTime)}`}
      </span>
    </motion.div>
  );
}

function MomentRow({ item }: { item: ScheduleItem }) {
  const Icon = getIcon(item);
  return (
    <div className="flex items-center gap-4">
      <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full border border-gold/40 bg-navy text-gold">
        <Icon size={20} strokeWidth={1.5} />
      </div>
      <div>
        <h4 className="font-heading text-base font-semibold tracking-wide text-cream sm:text-lg">{item.title}</h4>
        <span className="font-body text-xs text-beige/65">{item.venue}</span>
      </div>
    </div>
  );
}

function ClosingMoment({ item }: { item: ScheduleItem }) {
  const Icon = getIcon(item);
  return (
    <div className="relative z-10 flex flex-col items-center gap-3 text-center">
      <div className="flex h-14 w-14 items-center justify-center rounded-full border border-gold bg-navy-deep text-gold">
        <Icon size={26} strokeWidth={1.5} />
      </div>
      <h4 className="font-heading text-xl font-bold uppercase tracking-wide text-gold sm:text-2xl">{item.title}</h4>
      <span className="font-body text-xs text-beige/70">{item.venue}</span>
    </div>
  );
}

function LunchDivider({ item }: { item: ScheduleItem }) {
  return (
    <div className="flex items-center gap-4 border-y border-gold/15 py-3">
      <span className="h-px flex-1 bg-gold/15" />
      <div className="flex items-center gap-2 text-beige/60">
        <UtensilsCrossed size={16} className="text-gold/70" />
        <span className="font-body text-xs font-semibold uppercase tracking-[0.2em]">{item.title}</span>
        <span className="font-body text-xs text-beige/45">· {item.venue}</span>
      </div>
      <span className="h-px flex-1 bg-gold/15" />
    </div>
  );
}

function TransitionGap({ startTime, endTime }: { startTime: string; endTime: string }) {
  return (
    <div className="flex items-center gap-3 px-1 text-beige/35">
      <span className="h-px flex-1 bg-gold/10" />
      <span className="font-body text-[10px] font-semibold uppercase tracking-[0.2em]">
        {formatTime(startTime)} – {formatTime(endTime)} · Open / Transition
      </span>
      <span className="h-px flex-1 bg-gold/10" />
    </div>
  );
}

function AgendaBlock({ block }: { block: TimeBlock }) {
  const timeLabel =
    block.startTime === block.endTime
      ? formatTime(block.startTime)
      : `${formatTime(block.startTime)} — ${formatTime(block.endTime)}`;

  if (block.items.length === 1) {
    const item = block.items[0];
    if (item.type === 'break') {
      return <LunchDivider item={item} />;
    }
    if (block.isLast) {
      return (
        <BlockShell time={timeLabel} prominent>
          <ClosingMoment item={item} />
        </BlockShell>
      );
    }
    return (
      <BlockShell time={timeLabel}>
        <MomentRow item={item} />
      </BlockShell>
    );
  }

  return (
    <BlockShell time={timeLabel}>
      <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-3">
        {block.items.map((item, index) => (
          <EventCard key={item.id} item={item} blockEndTime={block.endTime} index={index} />
        ))}
      </div>
    </BlockShell>
  );
}

export default function Schedule() {
  const [day, setDay] = useState<'1' | '2'>('1');
  const entries = useMemo(
    () => buildAgenda(schedule.filter((item) => String(item.day) === day)),
    [day],
  );
  const dayMeta = DAY_META[day];

  return (
    <div className="relative">
      <PageHero title="Event Agenda" subtitle="Two days of competition, innovation, connection and celebration." />

      {/* Flagship Experiences */}
      <section className="relative overflow-hidden bg-cream/95 py-20 sm:py-24">
        <div className="absolute inset-0 bp-grid-bg opacity-20" />
        <div className="relative mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
          <SectionHeading
            eyebrow="Flagship Platforms"
            title="Flagship Events"
            subtitle="Both run full day, across Day 1 & Day 2."
          />
          <div className="mt-12 grid grid-cols-1 gap-6 lg:grid-cols-2">
            <FlagshipCard
              icon={Rocket}
              title="Thulira"
              subtitle="Student Startup Challenge"
              description="A platform for aspiring student entrepreneurs to showcase innovative startup ideas, prototypes and entrepreneurial solutions."
              to="/thulira"
            />
            <FlagshipCard
              icon={Building2}
              title="Tech Thiral"
              subtitle="Industry & Startup Summit"
              description="A technology-driven platform where engineering minds connect with startups, innovators, industry professionals and emerging technologies."
              to="/tech-thiral"
              delay={0.1}
            />
          </div>
        </div>
      </section>

      {/* Day Agenda */}
      <section className="relative overflow-hidden bg-navy-deep py-20 sm:py-24">
        <div className="absolute inset-0 bp-grid-bg opacity-20" />
        <div className="relative mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
          <div className="flex justify-center">
            <Tabs options={DAY_OPTIONS} value={day} onChange={setDay} tone="dark" />
          </div>

          <div className="mt-10">
            <SectionHeading eyebrow={dayMeta.tagline} title={dayMeta.title} tone="dark" />
          </div>

          <div className="mt-12 flex flex-col gap-5">
            {entries.map((entry) =>
              entry.kind === 'block' ? (
                <AgendaBlock key={entry.block.startTime} block={entry.block} />
              ) : (
                <TransitionGap key={`gap-${entry.startTime}`} startTime={entry.startTime} endTime={entry.endTime} />
              ),
            )}
          </div>
        </div>
      </section>
    </div>
  );
}
