import { motion } from 'framer-motion';
import { ArrowRight, Landmark, Sparkles, Users, Target } from 'lucide-react';
import { Button } from '@/components/ui/Button';
import { SectionHeading } from '@/components/ui/SectionHeading';
import { TempleSilhouette } from '@/components/common/TempleSilhouette';

const highlights = [
  { icon: Landmark, label: 'Heritage Inspired' },
  { icon: Users, label: 'Student Driven' },
  { icon: Sparkles, label: 'Innovation Focused' },
  { icon: Target, label: 'Future Ready' },
];

export function AboutSection() {
  return (
    <section className="relative overflow-hidden bg-cream py-24">
      <div className="absolute inset-0 bp-grid-bg opacity-[0.4]" />
      <div className="relative mx-auto grid max-w-7xl grid-cols-1 items-center gap-16 px-4 sm:px-6 lg:grid-cols-2 lg:px-8">
        <motion.div
          initial={{ opacity: 0, x: -30 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.7 }}
          className="relative flex items-center justify-center"
        >
          <div className="absolute h-72 w-72 rounded-full border border-gold/30 sm:h-96 sm:w-96" />
          <div className="absolute h-56 w-56 rounded-full border border-dashed border-brown/30 sm:h-72 sm:w-72" />
          <TempleSilhouette className="relative h-64 w-64 text-navy sm:h-80 sm:w-80" strokeWidth={1.1} />
        </motion.div>

        <div className="flex flex-col items-start gap-6">
          <SectionHeading
            eyebrow="About Porikkalam"
            title="Rooted In Heritage, Driven By Innovation"
            align="left"
          />
          <p className="font-body text-base leading-relaxed text-slate">
            Porikkalam celebrates where tradition meets impact — blending the discipline of
            classical craftsmanship with the precision of modern engineering. Across three days,
            students converge to compete, create, and collaborate through creativity, technology,
            and culture.
          </p>

          <div className="grid grid-cols-2 gap-4 sm:grid-cols-4">
            {highlights.map((item) => (
              <div key={item.label} className="flex flex-col items-center gap-2 text-center">
                <item.icon size={22} className="text-gold" strokeWidth={1.5} />
                <span className="font-body text-xs font-semibold uppercase tracking-wide text-navy">
                  {item.label}
                </span>
              </div>
            ))}
          </div>

          <Button to="/about" variant="outline" icon={<ArrowRight size={16} />}>
            Know More
          </Button>
        </div>
      </div>
    </section>
  );
}
