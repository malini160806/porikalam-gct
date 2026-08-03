import { motion } from 'framer-motion';
import { PageHero } from '@/components/common/PageHero';
import { SectionHeading } from '@/components/ui/SectionHeading';
import { VerticalTimeline } from '@/components/ui/VerticalTimeline';
import { Button } from '@/components/ui/Button';
import { legacyMilestones } from '@/data/legacy';
import { galleryImages } from '@/data/gallery';
import { GalleryCard } from '@/components/cards/GalleryCard';
import stoneBridge from '@/assets/elements/ancient/stone-bridge-hero.png';

const archiveImages = galleryImages.filter((img) => img.edition === 'Archive').slice(0, 3);

export default function Legacy() {
  return (
    <>
      <PageHero title="Legacy" subtitle="The story of Porikkalam, one edition at a time." />

      <section className="bg-navy-deep py-16">
        <div className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8">
          <motion.img
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.6 }}
            src={stoneBridge}
            alt="An ancient stone bridge, rendered alongside its line-sketch counterpart — engineering built to last"
            className="w-full border border-gold/30 shadow-card"
          />
        </div>
      </section>

      <section className="bg-cream py-24">
        <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
          <SectionHeading eyebrow="Edition Archive" title="Our Journey So Far" align="left" />
          <div className="mt-14">
            <VerticalTimeline
              items={legacyMilestones.map((step) => ({
                id: step.id,
                title: step.label,
                meta: step.date,
                description: step.description,
              }))}
            />
          </div>
        </div>
      </section>

      {archiveImages.length > 0 && (
        <section className="bg-navy py-24">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <SectionHeading eyebrow="From The Archives" title="Previous Editions" tone="dark" />
            <div className="mt-14 grid grid-cols-1 gap-6 sm:grid-cols-3">
              {archiveImages.map((image, index) => (
                <GalleryCard key={image.id} image={image} index={index} />
              ))}
            </div>
            <div className="mt-10 flex justify-center">
              <Button to="/gallery" variant="outline">
                View Full Gallery
              </Button>
            </div>
          </div>
        </section>
      )}
    </>
  );
}
