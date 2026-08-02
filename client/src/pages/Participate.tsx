import { motion } from 'framer-motion';
import { ArrowRight, UserPlus } from 'lucide-react';
import { PageHero } from '@/components/common/PageHero';
import { SectionHeading } from '@/components/ui/SectionHeading';
import { Button } from '@/components/ui/Button';
import { Accordion } from '@/components/ui/Accordion';
import { CornerOrnament } from '@/components/common/CornerOrnament';
import { faqs } from '@/data/faq';

export default function Participate() {
  return (
    <>
      <PageHero
        title="Participate"
        subtitle="Register your team and step into the arena of Porikkalam 2026."
      />

      <section className="bg-cream py-24">
        <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
          <SectionHeading eyebrow="Registration" title="Reserve Your Spot" />

          <motion.div
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.4 }}
            transition={{ duration: 0.5 }}
            className="relative mt-12 flex flex-col items-center gap-5 overflow-hidden border border-gold/30 bg-white/40 p-12 text-center"
          >
            <CornerOrnament corner="top-left" />
            <CornerOrnament corner="bottom-right" />
            <UserPlus size={36} className="text-brown" />
            <h3 className="font-heading text-3xl font-semibold tracking-wide text-navy">
              Create Your Participant Profile
            </h3>
            <p className="max-w-md font-body text-sm text-slate">
              Register once to get your participant username, then sign in anytime to register for
              events, make payments, and download your QR pass and certificates — no re-entering
              your details.
            </p>
            <Button to="/register" variant="primary" size="lg" icon={<ArrowRight size={16} />}>
              Create Your Profile
            </Button>
          </motion.div>
        </div>
      </section>

      <section id="faq" className="bg-navy py-24">
        <div className="mx-auto max-w-3xl px-4 sm:px-6 lg:px-8">
          <SectionHeading eyebrow="Need Help?" title="Frequently Asked Questions" tone="dark" />
          <div className="mt-12">
            <Accordion
              items={faqs.map((f) => ({ id: f.id, question: f.question, answer: f.answer }))}
              tone="dark"
            />
          </div>
        </div>
      </section>
    </>
  );
}
