import { motion } from 'framer-motion';
import { ArrowRight, Compass } from 'lucide-react';
import { Button } from '@/components/ui/Button';
import { TempleSilhouette } from '@/components/common/TempleSilhouette';
import { GearMotif } from '@/components/common/GearMotif';
import { CompassMotif } from '@/components/common/CompassMotif';
import { useParallax } from '@/hooks/useParallax';
import logoImage from '@/assets/porikkalam-logo.png';

export function Hero() {
  const templeRef = useParallax<HTMLDivElement>(-50);
  const gridRef = useParallax<HTMLDivElement>(40);

  return (
    <section className="relative flex min-h-[92vh] items-center overflow-hidden navy-paper text-cream">
      <div ref={gridRef} className="absolute inset-0 bp-grid-bg opacity-[0.35]" />

      <motion.div
        className="absolute -left-10 top-24 h-40 w-40 text-gold/25 sm:h-56 sm:w-56"
        animate={{ rotate: 360 }}
        transition={{ duration: 40, repeat: Infinity, ease: 'linear' }}
      >
        <GearMotif className="h-full w-full" />
      </motion.div>
      <motion.div
        className="absolute right-6 top-10 h-24 w-24 text-gold/20 sm:h-36 sm:w-36"
        animate={{ rotate: -360 }}
        transition={{ duration: 32, repeat: Infinity, ease: 'linear' }}
      >
        <GearMotif className="h-full w-full" teeth={10} />
      </motion.div>
      <motion.div
        className="absolute bottom-16 right-10 h-20 w-20 text-gold/20 sm:h-28 sm:w-28"
        animate={{ y: [0, -14, 0] }}
        transition={{ duration: 6, repeat: Infinity, ease: 'easeInOut' }}
      >
        <CompassMotif className="h-full w-full" />
      </motion.div>

      <div
        ref={templeRef}
        className="pointer-events-none absolute inset-x-0 bottom-0 flex justify-center text-gold/10"
      >
        <TempleSilhouette className="h-[60vh] w-auto" strokeWidth={0.8} />
      </div>

      <div className="relative z-10 mx-auto max-w-5xl px-4 py-24 text-center sm:px-6">
        <motion.span
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="inline-flex items-center gap-2 border border-gold/40 px-4 py-1.5 font-body text-xs font-semibold uppercase tracking-[0.25em] text-gold"
        >
          <Compass size={14} /> A Mega Inter-Collegiate Engineering Fest
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
            className="h-auto w-[250px] drop-shadow-[0_0_16px_rgba(212,175,55,0.25)] sm:w-[350px] lg:w-[460px]"
          />
        </motion.div>

        <motion.p
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="mx-auto mt-8 max-w-xl font-body text-base uppercase tracking-[0.3em] text-beige sm:text-lg"
        >
          Engineering Through The Ages
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.55 }}
          className="mt-10 flex flex-wrap items-center justify-center gap-4"
        >
          <Button to="/events" variant="primary" size="lg" icon={<ArrowRight size={16} />}>
            Explore Events
          </Button>
          <Button to="/register" variant="secondary" size="lg">
            Register Now
          </Button>
        </motion.div>
      </div>
    </section>
  );
}
