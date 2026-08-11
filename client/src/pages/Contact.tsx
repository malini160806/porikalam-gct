import { useState, type FormEvent } from 'react';
import { motion } from 'framer-motion';
import { Mail, MapPin, Phone, Send, CheckCircle2 } from 'lucide-react';
import { PageHero } from '@/components/common/PageHero';
import { SectionHeading } from '@/components/ui/SectionHeading';
import { Input, Textarea } from '@/components/ui/Input';
import { Button } from '@/components/ui/Button';
import { TeamCard } from '@/components/cards/TeamCard';
import { SITE } from '@/constants/site';
import { team } from '@/data/team';
import templeInkwash from '@/assets/heritage/temple-inkwash.webp';
import contactPanorama from '@/assets/hero/contact-panorama.webp';

const coordinators = team.filter((m) => m.team === 'faculty' || m.team === 'core');

export default function Contact() {
  const [submitted, setSubmitted] = useState(false);

  function handleSubmit(e: FormEvent) {
    e.preventDefault();
    setSubmitted(true);
  }

  return (
    <div className="relative">
      <div className="fixed inset-0 -z-10 overflow-hidden bg-navy-deep">
        <motion.img
          src={contactPanorama}
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
        title="Contact Us"
        subtitle="We would love to hear from you."
        backgroundImage={contactPanorama}
      />

      <section className="relative overflow-hidden bg-cream/90 py-24">
        <div className="absolute inset-0 bp-grid-bg opacity-40" />

        <div className="relative mx-auto grid max-w-6xl grid-cols-1 gap-12 px-4 sm:px-6 lg:grid-cols-5 lg:px-8">
          <div className="flex flex-col gap-6 border border-navy/15 bg-navy p-8 text-cream lg:col-span-2">
            <img
              src={templeInkwash}
              alt="Ink-wash illustration of a temple gopuram"
              className="w-full border border-gold/20"
            />
            <h3 className="font-heading text-3xl font-semibold tracking-wide text-gold">Get In Touch</h3>
            <p className="font-body text-sm text-beige/80 leading-relaxed">
              Reach out for registrations, sponsorships, media queries, or anything else about
              Porikkalam 2026.
            </p>
            <div className="flex flex-col gap-4 font-body text-sm">
              <span className="flex items-start gap-3">
                <MapPin size={16} className="mt-0.5 text-gold shrink-0" />
                {SITE.college}, {SITE.location}
              </span>
              <span className="flex items-center gap-3">
                <Mail size={16} className="text-gold shrink-0" /> {SITE.email}
              </span>
              <span className="flex items-center gap-3">
                <Phone size={16} className="text-gold shrink-0" /> {SITE.phone}
              </span>
            </div>
          </div>

          <div className="lg:col-span-3">
            {submitted ? (
              <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                className="flex h-full flex-col items-center justify-center gap-4 border border-gold/30 bg-cream p-12 text-center"
              >
                <CheckCircle2 size={40} className="text-brown" />
                <h3 className="font-heading text-2xl font-semibold tracking-wide text-navy">Message Sent</h3>
                <p className="max-w-sm font-body text-sm text-slate">
                  Thank you for reaching out. This is a mock form — no data was actually sent. Our
                  team will be in touch soon once the backend is live.
                </p>
                <Button variant="outline" onClick={() => setSubmitted(false)}>
                  Send Another
                </Button>
              </motion.div>
            ) : (
              <form onSubmit={handleSubmit} className="flex flex-col gap-5 border border-navy/15 bg-white/40 p-8">
                <Input label="Your Name" id="name" name="name" required placeholder="Enter your name" />
                <Input
                  label="Your Email"
                  id="email"
                  name="email"
                  type="email"
                  required
                  placeholder="Enter your email"
                />
                <Input label="Subject" id="subject" name="subject" placeholder="What is this about?" />
                <Textarea
                  label="Message"
                  id="message"
                  name="message"
                  required
                  placeholder="Write your message here..."
                />
                <Button type="submit" variant="primary" size="lg" icon={<Send size={16} />}>
                  Send Message
                </Button>
              </form>
            )}
          </div>
        </div>
      </section>

      <section className="relative bg-cream/90 py-24">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <SectionHeading eyebrow="Reach Out Directly" title="Faculty & Student Coordinators" />
          <div className="mt-14 grid grid-cols-2 gap-6 sm:grid-cols-3 lg:grid-cols-6">
            {coordinators.map((member, index) => (
              <TeamCard key={member.id} member={member} index={index} />
            ))}
          </div>
        </div>
      </section>

      <section className="relative bg-navy/90 py-24">
        <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col items-center gap-3 text-center">
            <span className="font-body text-xs font-bold uppercase tracking-[0.3em] text-brown">
              Locate Us
            </span>
            <h3 className="font-heading text-3xl font-semibold tracking-wide text-cream">Find Us</h3>
          </div>
          <div className="mt-10 border border-gold/30 bg-navy p-2 shadow-card">
            <iframe
              title="Government College of Technology, Coimbatore — location map"
              src={`https://maps.google.com/maps?q=${encodeURIComponent(`${SITE.college}, ${SITE.location}`)}&z=15&output=embed`}
              className="h-80 w-full grayscale-[35%] sm:h-96"
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
            />
          </div>
        </div>
      </section>
    </div>
  );
}
