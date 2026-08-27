import { Hero } from '@/components/home/Hero';
import { FlagshipExperiences } from '@/components/home/FlagshipExperiences';
import { EventCategories } from '@/components/home/EventCategories';
import { TimelineSection } from '@/components/home/TimelineSection';
import { SponsorsPreview } from '@/components/home/SponsorsPreview';
import { RegisterCta } from '@/components/home/RegisterCta';

export default function Home() {
  return (
    <>
      <Hero />
      <FlagshipExperiences />
      <EventCategories />
      <TimelineSection />
      <SponsorsPreview />
      <RegisterCta />
    </>
  );
}
