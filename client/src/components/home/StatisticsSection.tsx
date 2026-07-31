import { SectionHeading } from '@/components/ui/SectionHeading';
import { StatsCard } from '@/components/cards/StatsCard';
import { statistics } from '@/data/statistics';

export function StatisticsSection() {
  return (
    <section className="bg-cream py-24">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <SectionHeading
          eyebrow="By The Numbers"
          title="A Legacy In Motion"
          subtitle="Porikkalam brings together colleges, competitors, and creators from across the region."
        />

        <div className="mt-14 grid grid-cols-2 gap-6 sm:grid-cols-4">
          {statistics.map((stat) => (
            <StatsCard key={stat.id} stat={stat} />
          ))}
        </div>
      </div>
    </section>
  );
}
