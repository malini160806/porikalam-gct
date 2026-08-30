import { motion } from 'framer-motion';
import {
  CalendarClock,
  Clock,
  Download,
  MapPin,
  Megaphone,
  Sparkles,
} from 'lucide-react';
import { PageHero } from '@/components/common/PageHero';
import { Button } from '@/components/ui/Button';
import { SITE } from '@/constants/site';

const EXPECT_ITEMS = [
  {
    icon: Clock,
    title: 'Day-Wise Timeline',
    description: 'Every session, workshop and ceremony mapped hour by hour across both days.',
  },
  {
    icon: MapPin,
    title: 'Venue & Room Details',
    description: 'Exact locations for every event, so you always know where to be next.',
  },
  {
    icon: Download,
    title: 'Downloadable Schedule',
    description: 'A printable PDF agenda you can carry with you on campus.',
  },
  {
    icon: Megaphone,
    title: 'Live Updates',
    description: 'Any last-minute timing or venue changes will be reflected here first.',
  },
];

const DAY_TEASERS = [
  { label: 'Day 1', date: '25 September 2026' },
  { label: 'Day 2', date: '26 September 2026' },
];

export default function Schedule() {
  return (
    <div className="relative">
      <PageHero
        title="Schedule"
        subtitle="The full day-by-day agenda is being finalized — here's what's confirmed so far."
      />

      <section className="relative overflow-hidden bg-cream py-20 sm:py-24">

        {/* Background ambience */}
        <motion.div
          animate={{ scale: [1, 1.08, 1], opacity: [0.3, 0.5, 0.3] }}
          transition={{ duration: 8, repeat: Infinity, ease: 'easeInOut' }}
          className="pointer-events-none absolute -left-40 top-10 h-80 w-80 rounded-full bg-brown/5 blur-3xl"
        />
        <motion.div
          animate={{ scale: [1.08, 1, 1.08], opacity: [0.25, 0.45, 0.25] }}
          transition={{ duration: 9, repeat: Infinity, ease: 'easeInOut' }}
          className="pointer-events-none absolute -right-40 bottom-10 h-80 w-80 rounded-full bg-gold/5 blur-3xl"
        />

        <div className="relative mx-auto max-w-5xl px-4 sm:px-6 lg:px-8">

          {/* =================================================
              COMING SOON HERO
          ================================================== */}
          <motion.div
            initial={{ opacity: 0, y: 25 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.4 }}
            transition={{ duration: 0.6 }}
            className="mx-auto max-w-2xl text-center"
          >
            <motion.div
              animate={{ rotate: 360 }}
              transition={{ duration: 8, repeat: Infinity, ease: 'linear' }}
              className="mx-auto flex h-16 w-16 items-center justify-center rounded-full border border-gold/40 bg-white/75 p-4 text-brown shadow-[0_10px_30px_-15px_rgba(139,115,51,0.5)] backdrop-blur-sm"
            >
              <CalendarClock className="h-full w-full" strokeWidth={1.3} />
            </motion.div>

            <p className="mt-5 font-body text-[10px] font-bold uppercase tracking-[0.3em] text-brown">
              Porikkalam 2026
            </p>

            <h2 className="mt-2 font-heading text-3xl font-bold tracking-wide text-navy sm:text-4xl">
              Full Schedule Coming Soon
            </h2>

            <p className="mx-auto mt-4 max-w-lg font-body text-base leading-7 text-slate sm:text-lg">
              The organizing committee is finalizing exact timings, venues and session order for every
              event. The complete schedule will be published here well before the symposium begins.
            </p>

            <div className="mx-auto mt-6 flex items-center justify-center gap-3">
              <span className="h-px w-12 bg-gold/50" />
              <Sparkles size={16} className="text-gold" />
              <span className="h-px w-12 bg-gold/50" />
            </div>
          </motion.div>

          {/* =================================================
              CONFIRMED DATES
          ================================================== */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.4 }}
            transition={{ duration: 0.5, delay: 0.15 }}
            className="mx-auto mt-10 grid max-w-xl grid-cols-1 gap-4 sm:grid-cols-2"
          >
            {DAY_TEASERS.map((day, index) => (
              <motion.div
                key={day.label}
                initial={{ opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: 0.2 + index * 0.1 }}
                className="border border-gold/30 bg-white/70 p-5 text-center shadow-card"
              >
                <p className="font-body text-[10px] font-bold uppercase tracking-[0.25em] text-brown">
                  {day.label}
                </p>
                <p className="mt-1 font-heading text-xl font-semibold text-navy">{day.date}</p>
                <p className="mt-1 font-body text-xs text-slate/60">Timeline to be announced</p>
              </motion.div>
            ))}
          </motion.div>

          <p className="mx-auto mt-4 flex max-w-xl items-center justify-center gap-1.5 text-center font-body text-xs text-slate/60">
            <MapPin size={12} />
            {SITE.eventDateRange} · Government College of Technology, Coimbatore
          </p>

          {/* =================================================
              WHAT TO EXPECT
          ================================================== */}
          <div className="mx-auto mt-16 max-w-4xl">
            <p className="text-center font-body text-[10px] font-bold uppercase tracking-[0.3em] text-brown">
              What To Expect
            </p>

            <div className="mt-6 grid grid-cols-1 gap-4 sm:grid-cols-2">
              {EXPECT_ITEMS.map((item, index) => (
                <motion.div
                  key={item.title}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, amount: 0.3 }}
                  transition={{ duration: 0.4, delay: index * 0.08 }}
                  className="flex items-start gap-4 border border-navy/10 bg-white/60 p-5"
                >
                  <div className="flex h-11 w-11 shrink-0 items-center justify-center border border-brown/25 bg-white text-brown">
                    <item.icon size={20} strokeWidth={1.5} />
                  </div>
                  <div>
                    <h3 className="font-heading text-base font-semibold text-navy">{item.title}</h3>
                    <p className="mt-1 font-body text-sm leading-6 text-slate">{item.description}</p>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>

          {/* =================================================
              CTA
          ================================================== */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.4 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="mx-auto mt-16 flex max-w-xl flex-col items-center gap-4 border border-navy/10 bg-navy/[0.03] p-8 text-center"
          >
            <p className="font-heading text-lg font-semibold text-navy">
              While you wait, explore what's on offer
            </p>
            <p className="font-body text-sm text-slate">
              Browse every event and start planning which ones you'll compete in.
            </p>
            <div className="mt-2 flex flex-col gap-3 sm:flex-row">
              <Button to="/events" variant="primary" size="md">
                Explore Events
              </Button>
              <Button to="/announcements" variant="outline" size="md">
                Check Announcements
              </Button>
            </div>
          </motion.div>

        </div>
      </section>
    </div>
  );
}
