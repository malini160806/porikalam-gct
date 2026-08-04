import { motion } from 'framer-motion';
import { CheckCircle2, Rocket } from 'lucide-react';
import { PageHero } from '@/components/common/PageHero';
import { SectionHeading } from '@/components/ui/SectionHeading';
import { Button } from '@/components/ui/Button';
import { Badge } from '@/components/ui/Badge';
import { SpecimenCard } from '@/components/common/SpecimenCard';
import { expoBenefits, expoShowcase } from '@/data/expo';
import aiBrain from '@/assets/elements/modern/ai-brain-engraved.png';
import roboticArm from '@/assets/elements/modern/robotic-arm-engraved.png';
import drone from '@/assets/elements/modern/drone-engraved.png';
import satellite from '@/assets/elements/modern/satellite-engraved.png';
import circuitTrace from '@/assets/elements/modern/circuit-trace-engraved.png';
import cloudComputing from '@/assets/elements/modern/cloud-computing-engraved.png';
import expoPanorama from '@/assets/hero/expo-panorama.jpg';

const frontiers = [
  { image: aiBrain, title: 'Artificial Intelligence', caption: 'Machine learning and neural systems.' },
  { image: roboticArm, title: 'Robotics', caption: 'Automation and precision engineering.' },
  { image: drone, title: 'Aerial Systems', caption: 'Drones and autonomous flight.' },
  { image: satellite, title: 'Space & Comms', caption: 'Satellite and communication tech.' },
  { image: circuitTrace, title: 'Embedded Systems', caption: 'Circuits that power modern devices.' },
  { image: cloudComputing, title: 'Cloud Computing', caption: 'Infrastructure behind every app.' },
];

export default function Expo() {
  return (
    <div className="relative">
      <div className="fixed inset-0 -z-10 overflow-hidden">
        <motion.img
          src={expoPanorama}
          alt=""
          aria-hidden="true"
          initial={{ opacity: 0, scale: 1.15 }}
          animate={{ opacity: 1, scale: [1.15, 1, 1.06, 1] }}
          transition={{
            opacity: { duration: 2, ease: 'easeOut' },
            scale: { duration: 26, times: [0, 0.08, 0.54, 1], repeat: Infinity, ease: 'easeInOut' },
          }}
          className="h-full w-full object-cover"
        />
        <div className="absolute inset-0 bg-navy-deep/85" />
      </div>

      <PageHero
        title="Project Expo"
        subtitle="Innovate. Showcase. Inspire. — a dedicated stage for student startups and prototypes."
        backgroundImage={expoPanorama}
      />

      <section className="relative overflow-hidden bg-charcoal/70 py-24">
        <div className="absolute inset-0 bp-grid-bg opacity-[0.15]" />
        <div className="relative mx-auto max-w-4xl px-4 text-center sm:px-6 lg:px-8">
          <Rocket size={32} className="mx-auto text-gold" strokeWidth={1.5} />
          <h2 className="mt-4 font-heading text-3xl font-bold tracking-wide text-cream sm:text-4xl">
            Why Showcase At The Expo
          </h2>
          <div className="mt-10 grid grid-cols-1 gap-5 sm:grid-cols-2">
            {expoBenefits.map((benefit, index) => (
              <motion.div
                key={benefit.id}
                initial={{ opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.4 }}
                transition={{ duration: 0.4, delay: index * 0.08 }}
                className="flex items-center gap-3 border border-gold/25 bg-navy-deep p-5 text-left"
              >
                <CheckCircle2 size={18} className="shrink-0 text-gold" />
                <span className="font-body text-sm text-beige/85">{benefit.label}</span>
              </motion.div>
            ))}
          </div>
          <Button to="/register" variant="primary" size="lg" className="mt-12">
            Register Your Project
          </Button>
        </div>
      </section>

      <section className="relative overflow-hidden bg-cream/90 py-24">
        <div className="absolute inset-0 bp-grid-bg opacity-30" />
        <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <SectionHeading
            eyebrow="Innovation Frontiers"
            title="Where The Future Is Built"
            subtitle="The technology domains shaping this year's showcase floor."
          />
          <div className="mt-14 grid grid-cols-2 gap-6 sm:grid-cols-3 lg:grid-cols-6">
            {frontiers.map((item, index) => (
              <SpecimenCard key={item.title} image={item.image} title={item.title} caption={item.caption} index={index} />
            ))}
          </div>
        </div>
      </section>

      <section className="relative bg-cream/90 py-24">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <SectionHeading
            eyebrow="On The Expo Floor"
            title="Showcase Categories"
            subtitle="Details for each category will be published as the expo floor plan is finalized."
          />

          <div className="mt-14 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {expoShowcase.map((item, index) => (
              <motion.div
                key={item.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.4 }}
                transition={{ duration: 0.45, delay: index * 0.08 }}
                className="flex flex-col gap-3 border border-navy/15 bg-white/40 p-6"
              >
                <Badge variant="gold" className="w-fit">
                  {item.category}
                </Badge>
                <h3 className="font-heading text-xl font-semibold tracking-wide text-navy">{item.title}</h3>
                <p className="font-body text-sm leading-relaxed text-slate">{item.description}</p>
                <span className="mt-auto font-body text-xs font-semibold uppercase tracking-wide text-slate/60">
                  Department: {item.department}
                </span>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
