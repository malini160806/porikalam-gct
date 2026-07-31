import { motion } from 'framer-motion';
import { ArrowRight } from 'lucide-react';
import { Button } from '@/components/ui/Button';
import { Divider } from '@/components/ui/Divider';
import { CompassMotif } from '@/components/common/CompassMotif';

export function ContactTeaser() {
  return (
    <section className="relative overflow-hidden bg-cream py-24">
      <div className="absolute inset-0 bp-grid-bg opacity-40" />
      <motion.div
        className="absolute -right-10 top-1/2 h-56 w-56 -translate-y-1/2 text-brown/10"
        animate={{ rotate: 360 }}
        transition={{ duration: 50, repeat: Infinity, ease: 'linear' }}
      >
        <CompassMotif className="h-full w-full" />
      </motion.div>

      <div className="relative mx-auto flex max-w-3xl flex-col items-center gap-6 px-4 text-center sm:px-6">
        <span className="font-body text-xs font-bold uppercase tracking-[0.3em] text-brown">
          Get In Touch
        </span>
        <h2 className="font-heading text-3xl font-semibold text-navy sm:text-4xl">
          Have Questions About Porikkalam 2026?
        </h2>
        <Divider />
        <p className="font-body text-base text-slate">
          Our team is ready to help with registrations, sponsorships, and everything in between.
        </p>
        <Button to="/contact" variant="primary" size="lg" icon={<ArrowRight size={16} />}>
          Contact Us
        </Button>
      </div>
    </section>
  );
}
