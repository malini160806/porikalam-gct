import { motion } from 'framer-motion';
import { Breadcrumb } from '@/components/ui/Breadcrumb';
import { Divider } from '@/components/ui/Divider';
import { TempleSilhouette } from './TempleSilhouette';

type PageHeroProps = {
  title: string;
  subtitle?: string;
};

export function PageHero({ title, subtitle }: PageHeroProps) {
  return (
    <section className="relative overflow-hidden navy-paper py-20 text-center text-cream">
      <div className="absolute inset-0 bp-grid-bg opacity-30" />
      <div className="pointer-events-none absolute inset-x-0 bottom-0 flex justify-center text-gold/10">
        <TempleSilhouette className="h-40 w-40 sm:h-56 sm:w-56" strokeWidth={0.9} />
      </div>
      <div className="relative mx-auto flex max-w-3xl flex-col items-center gap-4 px-4 sm:px-6">
        <Breadcrumb items={[{ label: 'Home', path: '/' }, { label: title }]} />
        <motion.h1
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="font-heading text-4xl font-semibold sm:text-5xl"
        >
          {title}
        </motion.h1>
        <Divider />
        {subtitle && <p className="font-body text-sm text-beige/85 sm:text-base">{subtitle}</p>}
      </div>
    </section>
  );
}
