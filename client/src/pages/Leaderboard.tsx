import { useState } from 'react';
import { Trophy } from 'lucide-react';
import { PageHero } from '@/components/common/PageHero';
import { Tabs } from '@/components/ui/Tabs';

const BOARD_OPTIONS = [
  { label: 'Top Colleges', value: 'colleges' },
  { label: 'Top Departments', value: 'departments' },
  { label: 'Winning Teams', value: 'teams' },
] as const;

export default function Leaderboard() {
  const [board, setBoard] = useState<(typeof BOARD_OPTIONS)[number]['value']>('colleges');
  const activeLabel = BOARD_OPTIONS.find((b) => b.value === board)!.label;

  return (
    <>
      <PageHero title="Leaderboard" subtitle="Standings will publish live during the event." />

      <section className="bg-cream py-24">
        <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
          <div className="flex justify-center">
            <Tabs options={[...BOARD_OPTIONS]} value={board} onChange={setBoard} />
          </div>

          <div className="mt-14 flex flex-col items-center gap-4 border border-navy/15 bg-white/40 px-8 py-16 text-center">
            <Trophy size={32} className="text-gold" strokeWidth={1.5} />
            <p className="font-heading text-xl font-semibold tracking-wide text-navy">{activeLabel}</p>
            <p className="max-w-sm font-body text-sm text-slate">
              Live standings will be published here once Porikkalam 2026 is underway. Check back on 25–26
              September.
            </p>
          </div>
        </div>
      </section>
    </>
  );
}
