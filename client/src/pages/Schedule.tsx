import { useState } from 'react';
import { motion } from 'framer-motion';
import { PageHero } from '@/components/common/PageHero';
import { Tabs } from '@/components/ui/Tabs';
import { Badge } from '@/components/ui/Badge';
import { Divider } from '@/components/ui/Divider';
import { VerticalTimeline } from '@/components/ui/VerticalTimeline';
import { schedule } from '@/data/schedule';
import type { ScheduleItem } from '@/data/types';
import schedulePanorama from '@/assets/hero/schedule-panorama.jpg';

const DAY_OPTIONS: { label: string; value: '1' | '2' }[] = [
  { label: 'Day 1 — 25 Sept', value: '1' },
  { label: 'Day 2 — 26 Sept', value: '2' },
];

const TYPE_LABELS: Record<ScheduleItem['type'], string> = {
  session: 'Competition',
  workshop: 'Workshop',
  ceremony: 'Ceremony',
  break: 'Break',
};

const TYPE_VARIANTS: Record<ScheduleItem['type'], 'gold' | 'navy' | 'tech'> = {
  session: 'navy',
  workshop: 'gold',
  ceremony: 'tech',
  break: 'tech',
};

export default function Schedule() {
  const [day, setDay] = useState<'1' | '2'>('1');
  const items = schedule.filter((item) => String(item.day) === day);

  return (
    <div className="relative">
      <div className="fixed inset-0 -z-10 overflow-hidden">
        <motion.img
          src={schedulePanorama}
          alt=""
          aria-hidden="true"
          initial={{ opacity: 0, scale: 1.15 }}
          animate={{ opacity: 1, scale: [1.15, 1, 1.06, 1] }}
          transition={{
            opacity: { duration: 2, ease: 'easeOut' },
            scale: { duration: 26, times: [0, 0.08, 0.54, 1], repeat: Infinity, ease: 'easeInOut' },
          }}
          className="h-full w-full object-cover"
        />
        <div className="absolute inset-0 bg-navy-deep/80" />
      </div>

      <PageHero
        title="Schedule"
        subtitle="Two days of competition, learning, and celebration."
        backgroundImage={schedulePanorama}
      />

      <section className="relative py-24">
        <div className="relative mx-auto max-w-5xl px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.15 }}
            transition={{ duration: 0.6 }}
            className="relative overflow-hidden border border-gold/50 bg-navy-deep/80 p-6 shadow-card backdrop-blur-sm sm:p-10"
            style={{
              clipPath:
                'polygon(0 16px, 16px 0, calc(100% - 16px) 0, 100% 16px, 100% calc(100% - 16px), calc(100% - 16px) 100%, 16px 100%, 0 calc(100% - 16px))',
            }}
          >
            <div className="pointer-events-none absolute inset-2 border border-gold/25" />
            <div className="pointer-events-none absolute inset-0 bp-grid-bg opacity-[0.15]" />

            <div className="relative flex justify-center">
              <Tabs options={DAY_OPTIONS} value={day} onChange={setDay} tone="dark" />
            </div>

            <Divider className="relative mt-10" />

            <div className="relative mt-10">
              <VerticalTimeline
                tone="dark"
                items={items.map((item) => ({
                  id: item.id,
                  title: item.title,
                  meta: `${item.startTime} – ${item.endTime} · ${item.venue}`,
                  badge: <Badge variant={TYPE_VARIANTS[item.type]}>{TYPE_LABELS[item.type]}</Badge>,
                }))}
              />
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  );
}
