import { useState, type FormEvent } from 'react';
import { motion } from 'framer-motion';
import { CheckCircle2, Send } from 'lucide-react';
import { PageHero } from '@/components/common/PageHero';
import { SectionHeading } from '@/components/ui/SectionHeading';
import { Input, Select, Checkbox } from '@/components/ui/Input';
import { Button } from '@/components/ui/Button';
import { Accordion } from '@/components/ui/Accordion';
import { events } from '@/data/events';
import { faqs } from '@/data/faq';

export default function Participate() {
  const [submitted, setSubmitted] = useState(false);

  function handleSubmit(e: FormEvent) {
    e.preventDefault();
    setSubmitted(true);
  }

  return (
    <>
      <PageHero
        title="Participate"
        subtitle="Register your team and step into the arena of Porikkalam 2026."
      />

      <section className="bg-cream py-24">
        <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
          <SectionHeading eyebrow="Registration" title="Reserve Your Spot" />

          <div className="mt-12">
            {submitted ? (
              <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                className="flex flex-col items-center gap-4 border border-gold/30 bg-white/40 p-12 text-center"
              >
                <CheckCircle2 size={40} className="text-brown" />
                <h3 className="font-heading text-xl text-navy">Registration Received</h3>
                <p className="max-w-sm font-body text-sm text-slate">
                  This is a mock registration flow — no data was actually submitted. Full
                  registration will open once the backend goes live.
                </p>
                <Button variant="outline" onClick={() => setSubmitted(false)}>
                  Register Another
                </Button>
              </motion.div>
            ) : (
              <form onSubmit={handleSubmit} className="flex flex-col gap-5 border border-navy/15 bg-white/40 p-8">
                <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
                  <Input label="Full Name" id="p-name" required placeholder="Enter your full name" />
                  <Input label="College Name" id="p-college" required placeholder="Enter your college" />
                  <Input label="Email Address" id="p-email" type="email" required placeholder="you@college.edu" />
                  <Input label="Phone Number" id="p-phone" type="tel" required placeholder="+91 00000 00000" />
                </div>
                <Select label="Select Event" id="p-event" required defaultValue="">
                  <option value="" disabled>
                    Choose an event
                  </option>
                  {events.map((event) => (
                    <option key={event.id} value={event.id}>
                      {event.title}
                    </option>
                  ))}
                </Select>
                <Checkbox
                  id="p-terms"
                  required
                  label="I agree to the rules & guidelines of Porikkalam 2026."
                />
                <Button type="submit" variant="primary" size="lg" icon={<Send size={16} />}>
                  Submit Registration
                </Button>
              </form>
            )}
          </div>
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
