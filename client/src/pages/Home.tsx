import { Hero } from '@/components/home/Hero';
import { EraJourney } from '@/components/home/EraJourney';
import { EventCategories } from '@/components/home/EventCategories';
import { TimelineSection } from '@/components/home/TimelineSection';
import { ThuliraPreview } from '@/components/home/ThuliraPreview';
import { SponsorsPreview } from '@/components/home/SponsorsPreview';
import { CoreTeamPreview } from '@/components/home/CoreTeamPreview';
import { FaqPreview } from '@/components/home/FaqPreview';
import { ContactTeaser } from '@/components/home/ContactTeaser';

export default function Home() {
  return (
    <>
      <Hero />
      <EraJourney />
      <EventCategories />
      <TimelineSection />
      <ThuliraPreview />
      <SponsorsPreview />
      <CoreTeamPreview />
      <FaqPreview />
      <ContactTeaser />
    </>
  );
}
