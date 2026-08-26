import { useState, type FormEvent } from 'react';
import { motion } from 'framer-motion';
import {
  CheckCircle2,
  Mail,
  MapPin,
  Phone,
  Send,
} from 'lucide-react';

import { PageHero } from '@/components/common/PageHero';
import { SectionHeading } from '@/components/ui/SectionHeading';
import { Input, Textarea } from '@/components/ui/Input';
import { Button } from '@/components/ui/Button';
import { TeamCard } from '@/components/cards/TeamCard';
import { SITE } from '@/constants/site';
import { team } from '@/data/team';

import gctBuilding from '@/assets/heritage/gct-building.webp.png';
import contactPanorama from '@/assets/hero/contact-panorama.webp';

const coordinators = team.filter(
  (member) => member.team === 'faculty' || member.team === 'core',
);

function ContactInfo({
  icon,
  title,
  children,
}: {
  icon: React.ReactNode;
  title: string;
  children: React.ReactNode;
}) {
  return (
    <div className="flex items-start gap-4">
      <div className="flex h-10 w-10 shrink-0 items-center justify-center border border-gold/30 bg-navy text-gold">
        {icon}
      </div>

      <div>
        <p className="font-body text-[10px] font-bold uppercase tracking-[0.18em] text-gold">
          {title}
        </p>

        <p className="mt-1 font-body text-sm leading-relaxed text-beige/80">
          {children}
        </p>
      </div>
    </div>
  );
}

export default function Contact() {
  const [submitted, setSubmitted] = useState(false);

  function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setSubmitted(true);
  }

  return (
    <div className="relative overflow-hidden bg-cream">

      {/* =========================================================
          BACKGROUND
      ========================================================= */}
      <div className="pointer-events-none fixed inset-0 -z-10 overflow-hidden">
        <div className="absolute inset-0 bg-cream" />

        <div className="absolute inset-0 bp-grid-bg opacity-30" />

        <motion.img
          src={contactPanorama}
          alt=""
          aria-hidden="true"
          initial={{ opacity: 0, scale: 1.08 }}
          animate={{
            opacity: 0.08,
            scale: [1.08, 1, 1.04, 1],
          }}
          transition={{
            opacity: {
              duration: 2,
              ease: 'easeOut',
            },
            scale: {
              duration: 26,
              times: [0, 0.08, 0.54, 1],
              repeat: Infinity,
              ease: 'easeInOut',
            },
          }}
          className="h-full w-full object-cover"
        />
      </div>

      {/* =========================================================
          HERO
      ========================================================= */}
      <PageHero
        title="Contact Us"
        subtitle="We would love to hear from you."
        backgroundImage={contactPanorama}
      />

      {/* =========================================================
          CONTACT SECTION
      ========================================================= */}
      <section className="relative overflow-hidden bg-cream/95 py-20 sm:py-24">

        <div className="absolute inset-0 bp-grid-bg opacity-30" />

        <div className="relative mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">

          {/* Section heading */}
          <div className="mb-12 text-center">

            <span className="font-body text-[11px] font-bold uppercase tracking-[0.3em] text-brown">
              Get In Touch
            </span>

            <h2 className="mt-3 font-heading text-3xl font-semibold tracking-wide text-navy sm:text-4xl">
              Let&apos;s Start A Conversation
            </h2>

            <p className="mx-auto mt-4 max-w-2xl font-body text-sm leading-relaxed text-slate">
              Have a question about registrations, events, sponsorships, or
              Porikkalam 2026? Reach out to our team.
            </p>

          </div>

          {/* Main contact card */}
          <div className="grid overflow-hidden border border-navy/15 bg-white/50 shadow-card lg:grid-cols-2">

            {/* =====================================================
                LEFT — ILLUSTRATION + CONTACT DETAILS
            ===================================================== */}
            <motion.div
              initial={{ opacity: 0, x: -25 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, amount: 0.3 }}
              transition={{ duration: 0.6 }}
              className="relative flex flex-col overflow-hidden bg-navy-deep"
            >

              {/* Illustration */}
              <div className="relative flex min-h-[420px] items-center justify-center overflow-hidden p-8 sm:min-h-[500px]">

                <div className="absolute inset-0 bg-gradient-to-b from-navy-deep via-navy-deep/80 to-navy" />

                <div className="absolute inset-0 bp-grid-bg opacity-20" />

                <div className="relative z-10 flex w-full max-w-sm items-center justify-center border border-gold/20 bg-cream p-5 shadow-[0_20px_50px_-20px_rgba(0,0,0,0.6)]">

                  <img
                    src={gctBuilding}
                    alt="GCT building illustration"
                    className="h-full max-h-[430px] w-full object-contain"
                  />

                </div>

              </div>

              {/* Contact information */}
              <div className="relative z-10 border-t border-gold/20 bg-navy p-7 sm:p-9">

                <h3 className="font-heading text-2xl font-semibold tracking-wide text-gold">
                  Porikkalam 2026
                </h3>

                <p className="mt-2 max-w-md font-body text-sm leading-relaxed text-beige/70">
                  Reach out for registrations, sponsorships, media queries,
                  collaborations, or any other information about the event.
                </p>

                <div className="mt-7 flex flex-col gap-5">

                  <ContactInfo
                    title="Location"
                    icon={<MapPin size={17} strokeWidth={1.5} />}
                  >
                    {SITE.college}, {SITE.location}
                  </ContactInfo>

                  <ContactInfo
                    title="Email"
                    icon={<Mail size={17} strokeWidth={1.5} />}
                  >
                    {SITE.email}
                  </ContactInfo>

                  <ContactInfo
                    title="Phone"
                    icon={<Phone size={17} strokeWidth={1.5} />}
                  >
                    {SITE.phone}
                  </ContactInfo>

                </div>

              </div>

            </motion.div>


            {/* =====================================================
                RIGHT — FORM
            ===================================================== */}
            <motion.div
              initial={{ opacity: 0, x: 25 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, amount: 0.3 }}
              transition={{
                duration: 0.6,
                delay: 0.1,
              }}
              className="flex flex-col justify-center bg-white/55 p-7 sm:p-10 lg:p-12"
            >

              {submitted ? (
                <motion.div
                  initial={{
                    opacity: 0,
                    scale: 0.95,
                  }}
                  animate={{
                    opacity: 1,
                    scale: 1,
                  }}
                  className="flex min-h-[520px] flex-col items-center justify-center text-center"
                >

                  <div className="flex h-20 w-20 items-center justify-center border border-gold/30 bg-navy text-gold">
                    <CheckCircle2
                      size={38}
                      strokeWidth={1.5}
                    />
                  </div>

                  <h3 className="mt-6 font-heading text-3xl font-semibold tracking-wide text-navy">
                    Message Sent
                  </h3>

                  <p className="mt-3 max-w-md font-body text-sm leading-relaxed text-slate">
                    Thank you for reaching out to the Porikkalam team.
                    We&apos;ll get back to you soon.
                  </p>

                  <Button
                    variant="outline"
                    className="mt-7"
                    onClick={() => setSubmitted(false)}
                  >
                    Send Another Message
                  </Button>

                </motion.div>
              ) : (
                <form
                  onSubmit={handleSubmit}
                  className="flex flex-col gap-6"
                >

                  <div className="mb-2">

                    <span className="font-body text-[10px] font-bold uppercase tracking-[0.25em] text-brown">
                      Send A Message
                    </span>

                    <h3 className="mt-2 font-heading text-3xl font-semibold tracking-wide text-navy">
                      How Can We Help?
                    </h3>

                    <p className="mt-2 font-body text-sm leading-relaxed text-slate">
                      Fill in the form below and our team will get back to you.
                    </p>

                  </div>

                  <Input
                    label="Your Name"
                    id="name"
                    name="name"
                    required
                    placeholder="Enter your name"
                  />

                  <Input
                    label="Your Email"
                    id="email"
                    name="email"
                    type="email"
                    required
                    placeholder="Enter your email"
                  />

                  <Input
                    label="Subject"
                    id="subject"
                    name="subject"
                    placeholder="What is this about?"
                  />

                  <Textarea
                    label="Message"
                    id="message"
                    name="message"
                    required
                    placeholder="Write your message here..."
                  />

                  <Button
                    type="submit"
                    variant="primary"
                    size="lg"
                    icon={<Send size={16} />}
                    className="mt-1 w-fit"
                  >
                    Send Message
                  </Button>

                </form>
              )}

            </motion.div>

          </div>
        </div>
      </section>


      {/* =========================================================
          COORDINATORS
      ========================================================= */}
      <section className="relative overflow-hidden bg-cream/95 py-24">

        <div className="absolute inset-0 bp-grid-bg opacity-20" />

        <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">

          <SectionHeading
            eyebrow="Reach Out Directly"
            title="Faculty & Student Coordinators"
          />

          <div className="mt-14 grid grid-cols-2 gap-6 sm:grid-cols-3 lg:grid-cols-6">

            {coordinators.map((member, index) => (
              <TeamCard
                key={member.id}
                member={member}
                index={index}
              />
            ))}

          </div>

        </div>
      </section>


      {/* =========================================================
          LOCATION
      ========================================================= */}
      <section className="relative overflow-hidden bg-navy-deep py-24">

        <div className="absolute inset-0 bp-grid-bg opacity-20" />

        <div className="relative mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">

          <div className="text-center">

            <span className="font-body text-[10px] font-bold uppercase tracking-[0.3em] text-gold">
              Locate Us
            </span>

            <h3 className="mt-3 font-heading text-3xl font-semibold tracking-wide text-cream">
              Find Us
            </h3>

            <p className="mx-auto mt-3 max-w-xl font-body text-sm text-beige/70">
              Visit us at Government College of Technology, Coimbatore.
            </p>

          </div>

          <div className="mt-10 overflow-hidden border border-gold/25 bg-navy p-2 shadow-card">

            <iframe
              title="Government College of Technology, Coimbatore — location map"
              src={`https://maps.google.com/maps?q=${encodeURIComponent(
                `${SITE.college}, ${SITE.location}`,
              )}&z=15&output=embed`}
              className="h-80 w-full grayscale-[30%] sm:h-[420px]"
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
            />

          </div>

        </div>
      </section>

    </div>
  );
}