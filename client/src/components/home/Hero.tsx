import { motion } from 'framer-motion';
import { ArrowRight, Calendar, HelpCircle, Megaphone, User } from 'lucide-react';
import { Button } from '@/components/ui/Button';
import { TempleSilhouette } from '@/components/common/TempleSilhouette';
import { useParallax } from '@/hooks/useParallax';
import { Countdown } from '@/components/home/Countdown';
import { EventHighlights } from '@/components/home/EventHighlights';
import { SITE } from '@/constants/site';
import logoImage from '@/assets/porikkalam-logo.webp';
import homeBackground from '@/assets/hero/porikkalam-background-hd.webp';

const RAIL_ICONS = [User, Megaphone, Calendar, HelpCircle];

export function Hero() {
  const templeRef = useParallax<HTMLDivElement>(-50);
  const gridRef = useParallax<HTMLDivElement>(40);

  return (
    <section className="relative overflow-hidden bg-navy-deep text-cream">
      {/* Background */}
      <motion.img
        src={homeBackground}
        alt="Ancient temple construction transitioning into a futuristic city — Engineering Through The Ages"
        initial={{ opacity: 0, scale: 1.1 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 2.2, ease: 'easeOut' }}
        className="absolute inset-0 z-0 h-full w-full object-cover"
      />

      {/* Dark overlay */}
      <div className="absolute inset-0 z-0 bg-gradient-to-t from-navy-deep via-navy-deep/60 to-navy-deep/50" />

      {/* Blueprint grid */}
      <motion.div
        ref={gridRef}
        initial={{ opacity: 0 }}
        animate={{ opacity: 0.2 }}
        transition={{ duration: 1.5, delay: 0.6 }}
        className="absolute inset-0 z-0 bp-grid-bg"
      />

      {/* Main Hero */}
      <div className="relative z-0 grid min-h-[88vh] grid-cols-1 lg:grid-cols-[1fr_1.7fr_1fr]">
        {/* Left spacer */}
        <div className="relative hidden lg:block" />

        {/* Center content */}
        <div className="flex flex-col items-center justify-center px-4 py-20 text-center sm:px-6">

          {/* College + DCKAP + Presents */}
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="mx-auto flex w-full max-w-5xl flex-col items-center justify-center text-center"
          >
            <p className="font-body text-[9px] font-semibold uppercase tracking-[0.18em] text-beige/70 sm:text-sm sm:tracking-[0.25em] lg:text-base lg:tracking-[0.3em]">
              <span className="block whitespace-nowrap">
                {SITE.college}, Coimbatore
              </span>

              <span className="my-1.5 block text-[9px] text-gold sm:text-sm">
                AND
              </span>

              <span className="block whitespace-nowrap">
                DCKAP Incubation Center
              </span>

              <span className="mx-auto mt-3 flex items-center justify-center gap-3 text-xs font-bold uppercase tracking-[0.4em] text-gold sm:text-sm">
                <span className="h-px w-8 bg-gold/50 sm:w-12" />
                Presents
                <span className="h-px w-8 bg-gold/50 sm:w-12" />
              </span>
            </p>
          </motion.div>

          {/* Porikkalam Logo */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1, ease: 'easeOut' }}
            className="mt-6 flex w-full items-center justify-center"
          >
            <motion.img
              src={logoImage}
              alt="Porikkalam 2026"
              loading="lazy"
              animate={{ y: [0, -8, 0] }}
              transition={{
                duration: 5,
                repeat: Infinity,
                ease: 'easeInOut',
              }}
              whileHover={{
                scale: 1.02,
                filter: 'drop-shadow(0 0 28px rgba(212,175,55,0.55))',
              }}
              className="h-auto w-[250px] drop-shadow-[0_0_16px_rgba(212,175,55,0.25)] sm:w-[350px] lg:w-[420px]"
            />
          </motion.div>

          {/* English Tagline */}
          <motion.p
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="mx-auto mt-6 max-w-xl font-heading text-2xl font-semibold tracking-wide text-gold-gradient sm:text-3xl lg:text-4xl"
          >
            An Arena For Engineers
          </motion.p>

          {/* Tamil Tagline */}
          <motion.p
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="mx-auto mt-1 max-w-xl font-tamil text-xl font-medium text-gold-gradient sm:text-2xl lg:text-3xl"
          >
            திறன்களின் திடல்
          </motion.p>

          {/* Event Description */}
          <motion.p
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.5 }}
            className="mx-auto mt-4 max-w-md font-quote text-lg italic leading-relaxed text-beige/80"
          >
            A National Level Flagship Event

            {/* Engineering | Innovation | Entrepreneurship */}
            <span className="mt-3 flex items-center justify-center whitespace-nowrap font-body text-xs font-semibold uppercase tracking-[0.18em] text-gold sm:text-sm">
              <span className="mr-2 text-gold/50">✦</span>

              <span>Engineering</span>

              <span className="mx-2 text-beige/40">|</span>

              <span>Innovation</span>

              <span className="mx-2 text-beige/40">|</span>

              <span>Entrepreneurship</span>

              <span className="ml-2 text-gold/50">✦</span>
            </span>
          </motion.p>

          {/* Countdown */}
          <Countdown />

          {/* Buttons */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.65 }}
            className="mt-10 flex flex-wrap items-center justify-center gap-4"
          >
            <Button to="/register" variant="primary" size="lg">
              Register Now
            </Button>

            <Button
              to="/events"
              variant="secondary"
              size="lg"
              icon={<ArrowRight size={16} />}
            >
              Explore Events
            </Button>
          </motion.div>
        </div>

        {/* Right spacer */}
        <div className="relative hidden lg:block" />
      </div>

      {/* Event Highlights */}
      <EventHighlights />

      {/* Temple Silhouette */}
      <div
        ref={templeRef}
        className="pointer-events-none absolute inset-x-0 bottom-0 z-10 flex justify-center text-gold/10"
      >
        <TempleSilhouette
          className="h-[50vh] w-auto"
          strokeWidth={0.8}
        />
      </div>

      {/* Vertical Glass Icon Rail */}
      <motion.div
        initial={{ opacity: 0, x: 12 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.6, delay: 0.8 }}
        className="absolute right-3 top-1/2 z-20 hidden -translate-y-1/2 flex-col gap-3 sm:right-5 lg:flex"
      >
        {RAIL_ICONS.map((Icon, index) => (
          <div
            key={index}
            className="flex h-10 w-10 items-center justify-center border border-gold/40 bg-navy-deep/60 text-gold backdrop-blur-sm"
          >
            <Icon size={16} />
          </div>
        ))}
      </motion.div>
    </section>
  );
}