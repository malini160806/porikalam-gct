import { SectionHeading } from '@/components/ui/SectionHeading';
import { GalleryCard } from '@/components/cards/GalleryCard';
import { Button } from '@/components/ui/Button';
import { galleryImages } from '@/data/gallery';

export function GalleryPreview() {
  const featured = galleryImages.slice(0, 6);

  return (
    <section className="bg-navy py-24">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <SectionHeading eyebrow="Moments Captured" title="Gallery" tone="dark" />

        <div className="mt-14 grid auto-rows-[160px] grid-cols-1 gap-4 sm:grid-cols-3">
          {featured.map((image, index) => (
            <GalleryCard key={image.id} image={image} index={index} />
          ))}
        </div>

        <div className="mt-12 flex justify-center">
          <Button to="/gallery" variant="secondary">
            View Full Gallery
          </Button>
        </div>
      </div>
    </section>
  );
}
