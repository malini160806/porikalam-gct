import { useState } from 'react';
import { PageHero } from '@/components/common/PageHero';
import { Tabs } from '@/components/ui/Tabs';
import { Badge } from '@/components/ui/Badge';
import { VerticalTimeline } from '@/components/ui/VerticalTimeline';
import { schedule } from '@/data/schedule';
import type { ScheduleItem } from '@/data/types';

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

const TYPE_VARIANTS: Record<ScheduleItem['type'], 'gold' | 'navy' | 'outline'> = {
  session: 'navy',
  workshop: 'gold',
  ceremony: 'outline',
  break: 'outline',
};

export default function Schedule() {
  const [day, setDay] = useState<'1' | '2'>('1');
  const items = schedule.filter((item) => String(item.day) === day);

  return (
    <>
      <PageHero title="Schedule" subtitle="Two days of competition, learning, and celebration." />

      <section className="bg-cream py-24">
        <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
          <div className="flex justify-center">
            <Tabs options={DAY_OPTIONS} value={day} onChange={setDay} />
          </div>

          <div className="mt-14">
            <VerticalTimeline
              items={items.map((item) => ({
                id: item.id,
                title: item.title,
                meta: `${item.startTime} – ${item.endTime} · ${item.venue}`,
                badge: <Badge variant={TYPE_VARIANTS[item.type]}>{TYPE_LABELS[item.type]}</Badge>,
              }))}
            />
          </div>
        </div>
      </section>
    </>
  );
}
