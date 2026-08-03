import { motion } from 'framer-motion';
import { Breadcrumb } from '@/components/ui/Breadcrumb';
import { Divider } from '@/components/ui/Divider';
import { TempleSilhouette } from './TempleSilhouette';
import ancientImage from '@/assets/hero/ancient-engineering.jpg';
import futuristicImage from '@/assets/hero/futuristic-engineering.jpg';

type PageHeroProps = {
  title: string;
  subtitle?: string;
  /** Full-bleed panorama to use instead of the default ancient/futuristic split images. */
  backgroundImage?: string;
};

export function PageHero({ title, subtitle, backgroundImage }: PageHeroProps) {
  return (
    <section className={`relative overflow-hidden bg-navy-deep text-center text-cream ${backgroundImage ? 'py-32 sm:py-40' : 'py-20'}`}>
      {backgroundImage ? (
        <>
          <img
            src={backgroundImage}
            alt=""
            aria-hidden="true"
            className="pointer-events-none absolute inset-0 h-full w-full object-cover"
          />
          <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-navy-deep via-navy-deep/40 to-navy-deep/70" />
        </>
      ) : (
        <>
          <img
            src={ancientImage}
            alt=""
            aria-hidden="true"
            className="pointer-events-none absolute left-0 top-0 hidden h-full w-1/3 object-cover opacity-[0.08] sm:block"
          />
          <img
            src={futuristicImage}
            alt=""
            aria-hidden="true"
            className="pointer-events-none absolute right-0 top-0 hidden h-full w-1/3 object-cover opacity-[0.08] sm:block"
          />
        </>
      )}
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
          className="text-gold-gradient heritage-heading-shadow font-heading text-4xl font-extrabold uppercase tracking-wide sm:text-5xl lg:text-7xl"
        >
          {title}
        </motion.h1>
        <Divider />
        {subtitle && (
          <p className="font-quote text-lg italic text-beige/90 sm:text-xl">{subtitle}</p>
        )}
      </div>
    </section>
  );
}
