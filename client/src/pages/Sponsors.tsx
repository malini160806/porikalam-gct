import { PageHero } from '@/components/common/PageHero';
import { SectionHeading } from '@/components/ui/SectionHeading';
import { SponsorCard } from '@/components/cards/SponsorCard';
import { Button } from '@/components/ui/Button';
import { CornerOrnament } from '@/components/common/CornerOrnament';
import { sponsors, SPONSOR_TIER_LABELS } from '@/data/sponsors';
import type { Sponsor } from '@/data/types';

const tierOrder: Sponsor['tier'][] = ['title', 'platinum', 'gold', 'silver', 'bronze', 'partner'];

export default function Sponsors() {
  return (
    <>
      <PageHero
        title="Sponsors & Partners"
        subtitle="Porikkalam is proud to be powered by organizations that champion engineering excellence."
      />

      <section className="bg-cream py-24">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col gap-16">
            {tierOrder.map((tier) => {
              const tierSponsors = sponsors.filter((s) => s.tier === tier);
              if (tierSponsors.length === 0) return null;
              return (
                <div key={tier}>
                  <SectionHeading eyebrow="Tier" title={SPONSOR_TIER_LABELS[tier]} />
                  <div className="mt-10 grid grid-cols-2 gap-6 sm:grid-cols-3 lg:grid-cols-4">
                    {tierSponsors.map((sponsor, index) => (
                      <SponsorCard key={sponsor.id} sponsor={sponsor} index={index} />
                    ))}
                  </div>
                </div>
              );
            })}
          </div>

          <div className="relative mt-20 flex flex-col items-center gap-4 overflow-hidden border border-gold/30 bg-navy px-8 py-12 text-center">
            <CornerOrnament corner="top-left" />
            <CornerOrnament corner="bottom-right" />
            <h3 className="font-heading text-3xl font-semibold tracking-wide text-cream">Become a Sponsor</h3>
            <p className="max-w-md font-body text-sm text-beige/80">
              Partner with Porikkalam 2026 and connect your brand with thousands of engineering
              minds shaping tomorrow.
            </p>
            <Button to="/contact" variant="primary">
              Get In Touch
            </Button>
          </div>
        </div>
      </section>
    </>
  );
}
