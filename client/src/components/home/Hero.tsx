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
import dckapLogo from '@/assets/partners/DIC.png';
import gctLogo from '@/assets/partners/gct-logo.png';

const RAIL_ICONS = [User, Megaphone, Calendar, HelpCircle];

export function Hero() {
  const templeRef = useParallax<HTMLDivElement>(-50);
  const gridRef = useParallax<HTMLDivElement>(40);

  return (
    <section className="relative overflow-hidden bg-navy-deep text-cream">
      <motion.img
        src={homeBackground}
        alt="Ancient temple construction transitioning into a futuristic city — Engineering Through The Ages"
        initial={{ opacity: 0, scale: 1.1 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 2.2, ease: 'easeOut' }}
        className="absolute inset-0 z-0 h-full w-full object-cover"
      />
      <div className="absolute inset-0 z-0 bg-gradient-to-t from-navy-deep via-navy-deep/60 to-navy-deep/50" />
      <motion.div
        ref={gridRef}
        initial={{ opacity: 0 }}
        animate={{ opacity: 0.2 }}
        transition={{ duration: 1.5, delay: 0.6 }}
        className="absolute inset-0 z-0 bp-grid-bg"
      />

      <div className="relative z-0 grid min-h-[88vh] grid-cols-1 lg:grid-cols-[1fr_1.7fr_1fr]">
        <div className="relative hidden lg:block" />

        <div className="flex flex-col items-center justify-center px-4 py-20 text-center sm:px-6">
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="mx-auto grid w-fit max-w-[92vw] grid-cols-[4.5rem_auto_4.5rem] items-center gap-1.5 sm:grid-cols-[7.5rem_auto_7.5rem] sm:gap-3 lg:grid-cols-[8.5rem_auto_8.5rem]"
          >
            <motion.img
              src={gctLogo}
              alt="Government College of Technology, Coimbatore"
              loading="lazy"
              animate={{ y: [0, -4, 0] }}
              transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut' }}
              whileHover={{
                scale: 1.05,
                filter: 'drop-shadow(0 0 14px rgba(103, 89, 9, 0.93))',
              }}
              className="h-auto w-16 justify-self-end opacity-90 sm:w-28 lg:w-32"
            />
            <p className="font-body text-[8px] font-semibold uppercase tracking-tight text-beige/60 sm:text-sm sm:tracking-[0.2em] lg:tracking-[0.3em]">
              <span className="whitespace-nowrap">
                {SITE.college}, Coimbatore
              </span>
              <br />
                            <span className="whitespace-nowrap">AND</span>
                            <br/>
              <span className="whitespace-nowrap">DCKAP Incubation Center</span>
              <span className="mt-1 block text-[6px] sm:text-xs  text-gold-gradient">Presents</span>
            </p>
            <motion.img
              src={dckapLogo}
              alt="DCKAP Incubation Centre"
              loading="lazy"
              animate={{ y: [0, -4, 0] }}
              transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut' }}
              whileHover={{
                scale: 1.05,
                filter: 'drop-shadow(0 0 14px rgba(103, 89, 9, 0.93))',
              }}
              className="h-auto w-16 justify-self-start opacity-90 sm:w-28 lg:w-32"
            />
          </motion.div>

          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1, ease: 'easeOut' }}
            className="mt-4 flex justify-center"
          >
            <motion.img
              src={logoImage}
              alt="Porikkalam 2026"
              loading="lazy"
              animate={{ y: [0, -8, 0] }}
              transition={{ duration: 5, repeat: Infinity, ease: 'easeInOut' }}
              whileHover={{
                scale: 1.02,
                filter: 'drop-shadow(0 0 28px rgba(212,175,55,0.55))',
              }}
              className="h-auto w-[250px] drop-shadow-[0_0_16px_rgba(212,175,55,0.25)] sm:w-[350px] lg:w-[420px]"
            />
          </motion.div>

          <motion.p
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="text-gold-gradient mx-auto mt-6 max-w-xl font-heading text-2xl font-semibold tracking-wide sm:text-3xl lg:text-4xl"
          >
            An Arena For Engineers
          </motion.p>

          <motion.p
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="text-gold-gradient mx-auto mt-1 max-w-xl font-tamil text-xl font-medium sm:text-2xl lg:text-3xl"
          >
திறன்களின் திடல்
          </motion.p>

          <motion.p
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.5 }}
            className="mx-auto mt-4 max-w-md font-quote text-lg italic leading-relaxed text-beige/80"
          >
A National Level Flagship 
            <br />
Engineering,Innovation and Entrepreneurship event            
          </motion.p>

          <Countdown />

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.65 }}
            className="mt-10 flex flex-wrap items-center justify-center gap-4"
          >
            <Button to="/register" variant="primary" size="lg">
              Register Now
            </Button>
            <Button to="/events" variant="secondary" size="lg" icon={<ArrowRight size={16} />}>
              Explore Events
            </Button>
          </motion.div>
        </div>

        <div className="relative hidden lg:block" />
      </div>

      <EventHighlights />

      <div
        ref={templeRef}
        className="pointer-events-none absolute inset-x-0 bottom-0 z-10 flex justify-center text-gold/10"
      >
        <TempleSilhouette className="h-[50vh] w-auto" strokeWidth={0.8} />
      </div>

      {/* Vertical glass icon rail */}
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
