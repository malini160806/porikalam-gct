import { motion } from 'framer-motion';
import { Expand } from 'lucide-react';
import type { GalleryImage } from '@/data/types';

type GalleryCardProps = {
  image: GalleryImage;
  index?: number;
  onClick?: () => void;
};

const spanClasses: Record<GalleryImage['span'], string> = {
  tall: 'row-span-2',
  wide: 'sm:col-span-2',
  normal: '',
};

export function GalleryCard({ image, index = 0, onClick }: GalleryCardProps) {
  return (
    <motion.button
      type="button"
      onClick={onClick}
      initial={{ opacity: 0, y: 16 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.3 }}
      transition={{ duration: 0.4, delay: (index % 6) * 0.05 }}
      className={`group relative flex min-h-[160px] items-end overflow-hidden border border-gold/25 text-left ${spanClasses[image.span]}`}
      style={{ backgroundColor: image.color }}
    >
      <div className="absolute inset-0 bp-grid-bg opacity-30" />
      <div className="absolute inset-0 bg-gradient-to-t from-navy-deep/90 via-navy-deep/10 to-transparent opacity-70 transition-opacity duration-300 group-hover:opacity-90" />
      <div className="relative z-10 flex w-full items-end justify-between p-4">
        <div>
          <p className="font-body text-[10px] font-semibold uppercase tracking-widest text-gold">
            {image.category}
          </p>
          <h4 className="font-heading text-base font-semibold tracking-wide text-cream">{image.title}</h4>
        </div>
        <Expand
          size={16}
          className="text-cream opacity-0 transition-opacity duration-200 group-hover:opacity-100"
        />
      </div>
    </motion.button>
  );
}
