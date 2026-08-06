import { Hero } from '@/components/home/Hero';
import { EraJourney } from '@/components/home/EraJourney';
import { DepartmentsPreview } from '@/components/home/DepartmentsPreview';
import { EventCategories } from '@/components/home/EventCategories';
import { TimelineSection } from '@/components/home/TimelineSection';
import { SectionDivider } from '@/components/common/SectionDivider';
import { ExpoPreview } from '@/components/home/ExpoPreview';
import { SponsorsPreview } from '@/components/home/SponsorsPreview';
import { CoreTeamPreview } from '@/components/home/CoreTeamPreview';
import { FaqPreview } from '@/components/home/FaqPreview';
import { ContactTeaser } from '@/components/home/ContactTeaser';

export default function Home() {
  return (
    <>
      <Hero />
      <EraJourney />
      <DepartmentsPreview />
      <EventCategories />
      <TimelineSection />
      <SectionDivider />
      <ExpoPreview />
      <SponsorsPreview />
      <CoreTeamPreview />
      <FaqPreview />
      <ContactTeaser />
    </>
  );
}
