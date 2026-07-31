import { useMemo, useState } from 'react';
import { PageHero } from '@/components/common/PageHero';
import { Tabs } from '@/components/ui/Tabs';
import { GalleryCard } from '@/components/cards/GalleryCard';
import { Modal } from '@/components/ui/Modal';
import { galleryImages } from '@/data/gallery';
import type { GalleryImage } from '@/data/types';

const categories = ['all', ...Array.from(new Set(galleryImages.map((g) => g.category)))];

export default function Gallery() {
  const [filter, setFilter] = useState('all');
  const [active, setActive] = useState<GalleryImage | null>(null);

  const filtered = useMemo(
    () => galleryImages.filter((img) => filter === 'all' || img.category === filter),
    [filter],
  );

  return (
    <>
      <PageHero title="Gallery" subtitle="Moments of craftsmanship, competition, and celebration." />

      <section className="bg-navy py-20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <Tabs
            options={categories.map((c) => ({ label: c === 'all' ? 'All' : c, value: c }))}
            value={filter}
            onChange={setFilter}
            tone="dark"
          />

          <div className="mt-14 grid auto-rows-[180px] grid-cols-1 gap-4 sm:grid-cols-3">
            {filtered.map((image, index) => (
              <GalleryCard
                key={image.id}
                image={image}
                index={index}
                onClick={() => setActive(image)}
              />
            ))}
          </div>
        </div>
      </section>

      <Modal open={!!active} onClose={() => setActive(null)} title={active?.title}>
        {active && (
          <div className="flex flex-col gap-3">
            <div
              className="flex h-56 items-center justify-center border border-gold/20 bp-grid-bg"
              style={{ backgroundColor: active.color }}
            >
              <span className="font-heading text-cream/70">{active.title}</span>
            </div>
            <p className="font-body text-sm text-slate">Category: {active.category}</p>
          </div>
        )}
      </Modal>
    </>
  );
}
