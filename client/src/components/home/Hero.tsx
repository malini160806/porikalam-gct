import { motion } from 'framer-motion';
import { ArrowRight, Calendar, Compass, HelpCircle, Megaphone, User } from 'lucide-react';
import { Button } from '@/components/ui/Button';
import { TempleSilhouette } from '@/components/common/TempleSilhouette';
import { GearMotif } from '@/components/common/GearMotif';
import { CompassMotif } from '@/components/common/CompassMotif';
import { useParallax } from '@/hooks/useParallax';
import { Countdown } from '@/components/home/Countdown';
import { EventHighlights } from '@/components/home/EventHighlights';
import { SITE } from '@/constants/site';
import logoImage from '@/assets/porikkalam-logo.webp';
import homeBackground from '@/assets/hero/ancient-futuristic-home.webp';

const RAIL_ICONS = [User, Megaphone, Calendar, HelpCircle];

export function Hero() {
  const templeRef = useParallax<HTMLDivElement>(-50);
  const gridRef = useParallax<HTMLDivElement>(40);

  return (
    <section className="relative overflow-hidden bg-navy-deep text-cream">
      <motion.img
        src={homeBackground}
        alt="Ancient temple construction transitioning into a futuristic city — Engineering Through The Ages"
        initial={{ opacity: 0, scale: 1.1 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 2.2, ease: 'easeOut' }}
        className="absolute inset-0 z-0 h-full w-full object-cover"
      />
      <div className="absolute inset-0 z-0 bg-gradient-to-t from-navy-deep via-navy-deep/60 to-navy-deep/50" />
      <motion.div
        ref={gridRef}
        initial={{ opacity: 0 }}
        animate={{ opacity: 0.2 }}
        transition={{ duration: 1.5, delay: 0.6 }}
        className="absolute inset-0 z-0 bp-grid-bg"
      />

      <div className="relative z-0 grid min-h-[88vh] grid-cols-1 lg:grid-cols-[1fr_1.7fr_1fr]">
        <div className="relative hidden lg:block" />

        <div className="flex flex-col items-center justify-center px-4 py-20 text-center sm:px-6">
          <motion.span
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="inline-flex items-center gap-2 border border-gold/40 px-4 py-1.5 font-body text-xs font-semibold uppercase tracking-[0.2em] text-gold sm:tracking-[0.25em]"
          >
            <Compass size={14} /> From Ancient Ingenuity To Futuristic Innovation
          </motion.span>

          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1, ease: 'easeOut' }}
            className="mt-6 flex justify-center"
          >
            <motion.img
              src={logoImage}
              alt="Porikkalam 2026"
              loading="lazy"
              animate={{ y: [0, -8, 0] }}
              transition={{ duration: 5, repeat: Infinity, ease: 'easeInOut' }}
              whileHover={{
                scale: 1.02,
                filter: 'drop-shadow(0 0 28px rgba(212,175,55,0.55))',
              }}
              className="h-auto w-[250px] drop-shadow-[0_0_16px_rgba(212,175,55,0.25)] sm:w-[350px] lg:w-[420px]"
            />
          </motion.div>

          <motion.p
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.35 }}
            className="mx-auto mt-6 max-w-xl font-body text-base uppercase tracking-[0.3em] text-beige sm:text-lg"
          >
            Engineering Through The Ages
          </motion.p>

          <motion.p
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.45 }}
            className="mx-auto mt-4 max-w-md font-quote text-lg italic leading-relaxed text-beige/80"
          >
            A National-Level Techno-Cultural Fest
            <br />
            {SITE.college}, Coimbatore
          </motion.p>

          <Countdown />

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.65 }}
            className="mt-10 flex flex-wrap items-center justify-center gap-4"
          >
            <Button to="/register" variant="primary" size="lg">
              Register Now
            </Button>
            <Button to="/events" variant="secondary" size="lg" icon={<ArrowRight size={16} />}>
              Explore Events
            </Button>
          </motion.div>
        </div>

        <div className="relative hidden lg:block" />
      </div>

      <EventHighlights />

      {/* Decorative motifs, layered above the background panorama */}
      <motion.div
        className="pointer-events-none absolute -left-10 top-24 z-10 h-40 w-40 text-gold/25 sm:h-56 sm:w-56"
        animate={{ rotate: 360 }}
        transition={{ duration: 40, repeat: Infinity, ease: 'linear' }}
      >
        <GearMotif className="h-full w-full" />
      </motion.div>
      <motion.div
        className="pointer-events-none absolute right-6 top-10 z-10 h-24 w-24 text-gold/20 sm:h-36 sm:w-36"
        animate={{ rotate: -360 }}
        transition={{ duration: 32, repeat: Infinity, ease: 'linear' }}
      >
        <GearMotif className="h-full w-full" teeth={10} />
      </motion.div>
      <motion.div
        className="pointer-events-none absolute bottom-16 right-10 z-10 h-20 w-20 text-gold/20 sm:h-28 sm:w-28"
        animate={{ y: [0, -14, 0] }}
        transition={{ duration: 6, repeat: Infinity, ease: 'easeInOut' }}
      >
        <CompassMotif className="h-full w-full" />
      </motion.div>

      <div
        ref={templeRef}
        className="pointer-events-none absolute inset-x-0 bottom-0 z-10 flex justify-center text-gold/10"
      >
        <TempleSilhouette className="h-[50vh] w-auto" strokeWidth={0.8} />
      </div>

      {/* Vertical glass icon rail */}
      <motion.div
        initial={{ opacity: 0, x: 12 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.6, delay: 0.8 }}
        className="absolute right-3 top-1/2 z-20 hidden -translate-y-1/2 flex-col gap-3 sm:right-5 lg:flex"
      >
        {RAIL_ICONS.map((Icon, index) => (
          <div
            key={index}
            className="flex h-10 w-10 items-center justify-center border border-gold/40 bg-navy-deep/60 text-gold backdrop-blur-sm"
          >
            <Icon size={16} />
          </div>
        ))}
      </motion.div>
    </section>
  );
}
