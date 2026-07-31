import { SectionHeading } from '@/components/ui/SectionHeading';
import { SponsorCard } from '@/components/cards/SponsorCard';
import { Button } from '@/components/ui/Button';
import { sponsors } from '@/data/sponsors';

export function SponsorsPreview() {
  const featured = sponsors.slice(0, 6);

  return (
    <section className="bg-cream py-24">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <SectionHeading
          eyebrow="Our Patrons"
          title="Sponsors & Partners"
          subtitle="Porikkalam is powered by organizations that champion engineering excellence."
        />

        <div className="mt-14 grid grid-cols-2 gap-5 sm:grid-cols-3 lg:grid-cols-6">
          {featured.map((sponsor, index) => (
            <SponsorCard key={sponsor.id} sponsor={sponsor} index={index} />
          ))}
        </div>

        <div className="mt-12 flex justify-center">
          <Button to="/sponsors" variant="outline">
            View All Sponsors
          </Button>
        </div>
      </div>
    </section>
  );
}
