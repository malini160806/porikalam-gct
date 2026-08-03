import { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { Factory, Landmark, MonitorSmartphone, Sparkles, Triangle } from 'lucide-react';
import { SectionHeading } from '@/components/ui/SectionHeading';
import { eras } from '@/data/eras';
import type { EraStep } from '@/data/eras';

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

  return (
    <section className="relative overflow-hidden bg-navy-deep py-24">
      <div className="absolute inset-0 bp-grid-bg opacity-[0.15]" />
      <div className="relative mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
        <SectionHeading
          eyebrow="The Journey"
          title="Journey Of Engineering Through The Ages"
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
