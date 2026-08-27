import { ArrowRight } from 'lucide-react';
import { Button } from '@/components/ui/Button';
import { Divider } from '@/components/ui/Divider';

export function RegisterCta() {
  return (
    <section className="relative overflow-hidden bg-cream py-24">
      <div className="absolute inset-0 bp-grid-bg opacity-40" />

      <div className="relative mx-auto flex max-w-3xl flex-col items-center gap-6 px-4 text-center sm:px-6">
        <span className="font-body text-xs font-bold uppercase tracking-[0.3em] text-brown">
          Join Us
        </span>
        <h2 className="font-heading text-4xl font-bold tracking-wide text-navy sm:text-5xl">
          Ready to Be Part of Porikkalam 2026?
        </h2>
        <Divider />
        <p className="font-quote text-lg italic text-slate sm:text-xl">
          Secure your spot at the symposium and discover the events waiting for you.
        </p>
        <div className="flex flex-wrap items-center justify-center gap-4">
          <Button to="/register" variant="primary" size="lg">
            Register Now
          </Button>
          <Button to="/events" variant="secondary" size="lg" icon={<ArrowRight size={16} />}>
            Explore Events
          </Button>
        </div>
      </div>
    </section>
  );
}
