import { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { Factory, Landmark, MonitorSmartphone, Sparkles, Triangle } from 'lucide-react';
import { SectionHeading } from '@/components/ui/SectionHeading';
import { eras } from '@/data/eras';
import type { EraStep } from '@/data/eras';
import { useParallax } from '@/hooks/useParallax';
import gctBuildingBanner from '@/assets/heritage/gct-building-banner.png';

const ICONS: Record<EraStep['icon'], typeof Triangle> = {
  triangle: Triangle,
  landmark: Landmark,
  factory: Factory,
  'monitor-smartphone': MonitorSmartphone,
  sparkles: Sparkles,
};

export function EraJourney() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ['start end', 'end start'],
  });
  const lineScale = useTransform(scrollYProgress, [0.15, 0.85], [0, 1]);
  const buildingRef = useParallax<HTMLDivElement>(36);

  return (
    <section className="relative overflow-hidden bg-navy-deep py-24">
      {/* Soft gold bloom behind the building */}
      <div className="pointer-events-none absolute left-1/2 top-1/2 h-[60%] w-[70%] -translate-x-1/2 -translate-y-1/2 rounded-full bg-gold/20 blur-[100px] mix-blend-screen" />

      {/* Full GCT building illustration — object-contain guarantees the tower and wings are never cropped. */}
      <div ref={buildingRef} className="absolute inset-0">
        <motion.img
          src={gctBuildingBanner}
          alt="Illustrated blueprint of the Government College of Technology main building"
          initial={{ opacity: 0, scale: 1.4 }}
          whileInView={{ opacity: 0.3, scale: 1.25 }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{ duration: 1.3, ease: 'easeOut' }}
          className=" h-full w-full object-cover"/>
      </div>

      {/* Slow shimmer sweep across the gold linework */}
      <motion.div
        aria-hidden="true"
        className="pointer-events-none absolute inset-y-0 -left-1/3 w-1/3 bg-gradient-to-r from-transparent via-gold/15 to-transparent mix-blend-overlay"
        animate={{ x: ['0%', '400%'] }}
        transition={{ duration: 9, repeat: Infinity, ease: 'easeInOut', repeatDelay: 2 }}
      />

      {/* Edge blends — dark on both sides, no washed-out fade */}
      <div className="absolute inset-x-0 top-0 h-28 bg-gradient-to-b from-navy-deep to-transparent" />
      <div className="absolute inset-x-0 bottom-0 h-32 bg-gradient-to-t from-navy-deep to-transparent" />

      {/* Blueprint grid texture */}
      <div className="absolute inset-0 bp-grid-bg opacity-[0.15]" />

      <div className="relative mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
        <SectionHeading
          eyebrow="Event theme"
          title="Journey of Engineering through the ages"
          tone="dark"
        />

        <div ref={sectionRef} className="relative mt-16">
          <div className="absolute left-0 right-0 top-7 hidden h-px bg-gold/15 sm:block" />
          <motion.div
            style={{
              scaleX: lineScale,
              background:
                'linear-gradient(90deg, #a46621, #8b7333, #d4af37, #2a3a4d, #3d5a75, #3891ff, #1f6fd6, #6b4fc4)',
            }}
            className="absolute left-0 right-0 top-7 hidden h-px origin-left sm:block"
          />
          <div className="grid grid-cols-1 gap-10 sm:grid-cols-5 sm:gap-4">
            {eras.map((era, index) => {
              const Icon = ICONS[era.icon];
              return (
                <motion.div
                  key={era.id}
                  initial={{ opacity: 0, y: 24 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, amount: 0.5 }}
                  transition={{ duration: 0.5, delay: index * 0.12 }}
                  className="relative flex flex-col items-center gap-3 text-center"
                >
                  <motion.div
                    animate={
                      era.current
                        ? { boxShadow: ['0 0 0px rgba(212,175,55,0.4)', '0 0 22px rgba(212,175,55,0.8)', '0 0 0px rgba(212,175,55,0.4)'] }
                        : undefined
                    }
                    transition={era.current ? { duration: 2.4, repeat: Infinity, ease: 'easeInOut' } : undefined}
                    className={`relative z-10 flex h-14 w-14 items-center justify-center rounded-full border-2 bg-navy-deep ${
                      era.current ? 'border-gold text-gold' : 'border-gold/50 text-beige/80'
                    }`}
                  >
                    <Icon size={24} strokeWidth={1.5} />
                  </motion.div>
                  <h4
                    className={`font-heading text-base font-semibold uppercase tracking-wider sm:text-lg ${
                      era.current ? 'text-gold' : 'text-cream'
                    }`}
                  >
                    {era.label}
                  </h4>
                  <p className="font-body text-xs text-beige/70 sm:text-sm">{era.caption}</p>
                </motion.div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
