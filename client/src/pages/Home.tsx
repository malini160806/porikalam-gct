import { Hero } from '@/components/home/Hero';
import { AboutSection } from '@/components/home/AboutSection';
import { HeritageBanner } from '@/components/home/HeritageBanner';
import { EventCategories } from '@/components/home/EventCategories';
import { StatisticsSection } from '@/components/home/StatisticsSection';
import { TimelineSection } from '@/components/home/TimelineSection';
import { SponsorsPreview } from '@/components/home/SponsorsPreview';
import { GalleryPreview } from '@/components/home/GalleryPreview';
import { ContactTeaser } from '@/components/home/ContactTeaser';

export default function Home() {
  return (
    <>
      <Hero />
      <AboutSection />
      <HeritageBanner />
      <EventCategories />
      <StatisticsSection />
      <TimelineSection />
      <SponsorsPreview />
      <GalleryPreview />
      <ContactTeaser />
    </>
  );
}
