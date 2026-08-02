import { SectionHeading } from '@/components/ui/SectionHeading';
import { StatsCard } from '@/components/cards/StatsCard';
import { FloatingIcon } from '@/components/common/FloatingIcon';
import { statistics } from '@/data/statistics';
import mandalaGold from '@/assets/heritage/mandala-gold.png';

export function StatisticsSection() {
  return (
    <section className="relative overflow-hidden bg-cream py-24">
      <FloatingIcon src={mandalaGold} className="absolute -right-16 -top-16 h-64 w-64" duration={70} />
      <FloatingIcon
        src={mandalaGold}
        className="absolute -bottom-20 -left-16 h-56 w-56"
        duration={60}
      />
      <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
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
