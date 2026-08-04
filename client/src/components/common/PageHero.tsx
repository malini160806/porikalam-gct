import { motion } from 'framer-motion';
import { Breadcrumb } from '@/components/ui/Breadcrumb';
import { Divider } from '@/components/ui/Divider';
import { TempleSilhouette } from './TempleSilhouette';
import ancientImage from '@/assets/hero/ancient-engineering.webp';
import futuristicImage from '@/assets/hero/futuristic-engineering.webp';

type PageHeroProps = {
  title: string;
  subtitle?: string;
  /** Full-bleed panorama to use instead of the default ancient/futuristic split images. */
  backgroundImage?: string;
  /** How backgroundImage should fit its box. 'cover' (default) fills and crops; 'contain' shows the full image uncropped. */
  backgroundFit?: 'cover' | 'contain';
  /** Text/overlay theme to match the background. 'dark' (default) is gold-on-navy; 'light' is ink-on-parchment for warm, light reference images. */
  heroTone?: 'dark' | 'light';
};

export function PageHero({ title, subtitle, backgroundImage, backgroundFit = 'cover', heroTone = 'dark' }: PageHeroProps) {
  const isLight = heroTone === 'light';
  return (
    <section
      className={`relative overflow-hidden text-center ${isLight ? 'bg-cream text-navy' : 'bg-navy-deep text-cream'} ${backgroundImage ? 'py-32 sm:py-40' : 'py-20'}`}
    >
      {backgroundImage ? (
        <>
          <motion.img
            src={backgroundImage}
            alt=""
            aria-hidden="true"
            initial={{ opacity: 0, scale: 1.15 }}
            animate={{ opacity: 1, scale: [1.15, 1, 1.06, 1] }}
            transition={{
              opacity: { duration: 2, ease: 'easeOut' },
              scale: { duration: 26, times: [0, 0.08, 0.54, 1], repeat: Infinity, ease: 'easeInOut' },
            }}
            className={`pointer-events-none absolute inset-0 h-full w-full ${backgroundFit === 'contain' ? 'object-contain' : 'object-cover'}`}
          />
          <div
            className={`pointer-events-none absolute inset-0 ${
              isLight
                ? 'bg-gradient-to-t from-cream/70 via-cream/15 to-cream/25'
                : 'bg-gradient-to-t from-navy-deep via-navy-deep/40 to-navy-deep/70'
            }`}
          />
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
      <div className={`absolute inset-0 bp-grid-bg ${isLight ? 'opacity-10' : 'opacity-30'}`} />
      <div className={`pointer-events-none absolute inset-x-0 bottom-0 flex justify-center ${isLight ? 'text-brown/10' : 'text-gold/10'}`}>
        <TempleSilhouette className="h-40 w-40 sm:h-56 sm:w-56" strokeWidth={0.9} />
      </div>
      <div className="relative mx-auto flex max-w-3xl flex-col items-center gap-4 px-4 sm:px-6">
        <Breadcrumb items={[{ label: 'Home', path: '/' }, { label: title }]} tone={isLight ? 'light' : 'dark'} />
        <motion.h1
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className={`font-heading text-4xl font-extrabold uppercase tracking-wide sm:text-5xl lg:text-7xl ${
            isLight ? 'text-navy' : 'text-gold-gradient heritage-heading-shadow'
          }`}
        >
          {title}
        </motion.h1>
        <Divider tone={isLight ? 'navy' : 'gold'} />
        {subtitle && (
          <p className={`font-quote text-lg italic sm:text-xl ${isLight ? 'text-slate' : 'text-beige/90'}`}>{subtitle}</p>
        )}
      </div>
    </section>
  );
}
