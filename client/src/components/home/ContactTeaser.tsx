import { ArrowRight } from 'lucide-react';
import { Button } from '@/components/ui/Button';
import { Divider } from '@/components/ui/Divider';

export function ContactTeaser() {
  return (
    <section className="relative overflow-hidden bg-cream py-24">
      <div className="absolute inset-0 bp-grid-bg opacity-40" />

      <div className="relative mx-auto flex max-w-3xl flex-col items-center gap-6 px-4 text-center sm:px-6">
        <span className="font-body text-xs font-bold uppercase tracking-[0.3em] text-brown">
          Get In Touch
        </span>
        <h2 className="font-heading text-4xl font-bold tracking-wide text-navy sm:text-5xl">
          Have Questions About Porikkalam 2026?
        </h2>
        <Divider />
        <p className="font-quote text-lg italic text-slate sm:text-xl">
          Our team is ready to help with registrations, sponsorships, and everything in between.
        </p>
        <Button to="/contact" variant="primary" size="lg" icon={<ArrowRight size={16} />}>
          Contact Us
        </Button>
      </div>
    </section>
  );
}
