import { useEffect, useMemo, useState } from 'react';
import { PageHero } from '@/components/common/PageHero';
import { Tabs } from '@/components/ui/Tabs';
import { GalleryCard } from '@/components/cards/GalleryCard';
import { Modal } from '@/components/ui/Modal';
import { galleryImages } from '@/data/gallery';
import type { GalleryImage } from '@/data/types';

const VIEW_OPTIONS = [
  { label: 'All', value: 'all' },
  { label: 'Photos', value: 'photo' },
  { label: 'Videos', value: 'video' },
  { label: 'Previous Editions', value: 'previous' },
] as const;

type View = (typeof VIEW_OPTIONS)[number]['value'];

export default function Gallery() {
  const [view, setView] = useState<View>('all');
  const [filter, setFilter] = useState('all');
  const [active, setActive] = useState<GalleryImage | null>(null);

  const baseItems = useMemo(() => {
    if (view === 'previous') return galleryImages.filter((img) => img.edition === 'Archive');
    return galleryImages.filter(
      (img) => img.edition !== 'Archive' && (view === 'all' || img.type === view),
    );
  }, [view]);

  const categories = useMemo(
    () => ['all', ...Array.from(new Set(baseItems.map((g) => g.category)))],
    [baseItems],
  );

  useEffect(() => {
    setFilter('all');
  }, [view]);

  const filtered = useMemo(
    () => baseItems.filter((img) => filter === 'all' || img.category === filter),
    [baseItems, filter],
  );

  return (
    <>
      <PageHero title="Gallery" subtitle="Moments of craftsmanship, competition, and celebration." />

      <section className="bg-navy py-20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <p className="mb-8 text-center font-body text-xs font-semibold uppercase tracking-[0.3em] text-gold/80">
            The Story So Far — Past &amp; Present
          </p>
          <div className="flex flex-col items-center gap-6">
            <Tabs options={[...VIEW_OPTIONS]} value={view} onChange={setView} tone="dark" />
            {categories.length > 1 && (
              <Tabs
                options={categories.map((c) => ({ label: c === 'all' ? 'All Categories' : c, value: c }))}
                value={filter}
                onChange={setFilter}
                tone="dark"
              />
            )}
          </div>

          {filtered.length > 0 ? (
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
          ) : (
            <p className="mt-16 text-center font-body text-sm text-beige/70">
              Nothing here yet — check back soon.
            </p>
          )}
        </div>
      </section>

      <Modal open={!!active} onClose={() => setActive(null)} title={active?.title}>
        {active && (
          <div className="flex flex-col gap-3">
            <div
              className="flex h-56 items-center justify-center border border-gold/20 bp-grid-bg"
              style={{ backgroundColor: active.color }}
            >
              <span className="font-heading text-xl font-semibold tracking-wide text-cream/70">
                {active.title}
              </span>
            </div>
            <p className="font-body text-sm text-slate">Category: {active.category}</p>
          </div>
        )}
      </Modal>
    </>
  );
}
