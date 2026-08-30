import { useParams } from 'react-router-dom';
import { motion } from 'framer-motion';
import {
  Clock,
  ShieldCheck,
  Users,
  Wallet,
  Download,
  ArrowDown,
  ArrowRight,
  Sparkle,
  Hourglass,
} from 'lucide-react';

import { PageHero } from '@/components/common/PageHero';
import { PageLoader } from '@/components/common/PageLoader';
import { Button } from '@/components/ui/Button';
import { getEventIconComponent } from '@/components/icons/EventIcons';
import { EVENT_CATEGORY_LABELS } from '@/data/eventMeta';
import { getEventTheme } from '@/data/eventThemes';
import { EventThemeBackdrop, EventThemeIconFrame } from '@/components/events/EventThemeArt';
import { useEvent } from '@/hooks/useEvents';
import NotFound from './NotFound';

/* =========================================================
   WORD BY WORD ANIMATION
========================================================= */

function AnimatedText({
  text,
  className = '',
  delay = 0,
}: {
  text: string;
  className?: string;
  delay?: number;
}) {
  const words = text.split(' ');

  return (
    <motion.span
      initial="hidden"
      animate="visible"
      variants={{
        hidden: {},
        visible: {
          transition: {
            staggerChildren: 0.045,
            delayChildren: delay,
          },
        },
      }}
      className={className}
    >
      {words.map((word, index) => (
        <motion.span
          key={`${word}-${index}`}
          variants={{
            hidden: {
              opacity: 0,
              y: 8,
              filter: 'blur(4px)',
            },
            visible: {
              opacity: 1,
              y: 0,
              filter: 'blur(0px)',
              transition: {
                duration: 0.35,
                ease: 'easeOut',
              },
            },
          }}
          className="mr-[0.3em] inline-block"
        >
          {word}
        </motion.span>
      ))}
    </motion.span>
  );
}

/* =========================================================
   INFORMATION CARD
========================================================= */

function InfoCard({
  icon,
  label,
  value,
  delay,
}: {
  icon: React.ReactNode;
  label: string;
  value: string;
  delay: number;
}) {
  return (
    <motion.div
      initial={{
        opacity: 0,
        y: 20,
        scale: 0.97,
      }}
      animate={{
        opacity: 1,
        y: 0,
        scale: 1,
      }}
      transition={{
        duration: 0.5,
        delay,
        ease: [0.22, 1, 0.36, 1],
      }}
      whileHover={{
        y: -4,
        scale: 1.01,
      }}
      className="group relative overflow-hidden border border-[var(--accent)]/20 bg-cream/75 p-4 transition-all duration-300 hover:border-[var(--accent)]/60 hover:bg-white/80 hover:shadow-[0_12px_30px_-18px_rgba(15,35,50,0.45)] sm:p-5"
    >
      {/* Animated hover line */}
      <motion.div
        initial={{ scaleX: 0 }}
        whileHover={{ scaleX: 1 }}
        transition={{ duration: 0.3 }}
        className="absolute left-0 top-0 h-[2px] w-full origin-left bg-[var(--accent)]"
      />

      <div className="flex items-center gap-4">

        {/* ICON */}
        <motion.div
          whileHover={{
            rotate: -5,
            scale: 1.08,
          }}
          transition={{ duration: 0.25 }}
          className="flex h-11 w-11 shrink-0 items-center justify-center border border-[var(--accent)]/25 bg-white/70 text-[var(--accent)]"
        >
          {icon}
        </motion.div>

        {/* TEXT */}
        <div className="min-w-0 flex-1">

          <p className="font-body text-xs font-bold uppercase tracking-[0.15em] text-[var(--accent)]">
            {label}
          </p>

          <AnimatedText
            text={value}
            className="mt-1 block font-heading text-lg font-semibold leading-7 text-navy sm:text-xl"
            delay={delay + 0.15}
          />

        </div>

      </div>
    </motion.div>
  );
}

/* =========================================================
   RESOURCE BOX — Rule Book / Problem Statement download cards
========================================================= */

function ResourceBox({
  eyebrow,
  title,
  comingSoonTitle,
  comingSoonNote,
  downloadUrl,
  downloadLabel,
  delay,
}: {
  eyebrow: string;
  title: string;
  comingSoonTitle: string;
  comingSoonNote: string;
  downloadUrl?: string;
  downloadLabel: string;
  delay: number;
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 18 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.55, delay }}
      className="mt-4 overflow-hidden border border-brown/20 bg-navy"
    >
      <div className="flex flex-col gap-3 px-4 py-4 sm:flex-row sm:items-center sm:justify-between sm:px-5">

        <div className="flex items-center gap-3">
          <motion.div
            animate={downloadUrl ? { y: [0, -2, 0] } : { rotate: 360 }}
            transition={
              downloadUrl
                ? { duration: 2, repeat: Infinity, ease: 'easeInOut' }
                : { duration: 6, repeat: Infinity, ease: 'linear' }
            }
            className="flex h-9 w-9 shrink-0 items-center justify-center border border-[var(--accent)]/40 bg-[var(--accent)]/15 text-[var(--accent)]"
          >
            {downloadUrl ? <Download size={17} strokeWidth={1.6} /> : <Sparkle size={16} strokeWidth={1.6} />}
          </motion.div>

          <div>
            <p className="font-body text-[10px] font-bold uppercase tracking-[0.2em] text-[var(--accent)]">
              {eyebrow}
            </p>
            <p className="mt-0.5 font-heading text-base font-semibold text-cream sm:text-lg">
              {downloadUrl ? title : comingSoonTitle}
            </p>
            {!downloadUrl && <p className="mt-0.5 font-body text-sm text-cream/70">{comingSoonNote}</p>}
          </div>
        </div>

        {downloadUrl ? (
          <motion.a
            href={downloadUrl}
            target="_blank"
            rel="noopener noreferrer"
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            className="group inline-flex items-center justify-center gap-2 border border-[var(--accent)]/50 bg-[var(--accent)]/15 px-4 py-2.5 font-body text-sm font-bold uppercase tracking-wider text-cream transition-all duration-300 hover:border-[var(--accent)] hover:bg-[var(--accent)] hover:text-navy sm:text-base"
          >
            <Download size={16} strokeWidth={1.8} />
            <span>{downloadLabel}</span>
            <ArrowDown size={14} className="transition-transform duration-300 group-hover:translate-y-1" />
          </motion.a>
        ) : (
          <span
            aria-disabled="true"
            className="inline-flex cursor-not-allowed items-center justify-center gap-2 border border-cream/20 bg-white/5 px-4 py-2.5 font-body text-sm font-bold uppercase tracking-wider text-cream/60 sm:text-base"
          >
            <Download size={16} strokeWidth={1.8} />
            <span>Coming Soon</span>
          </span>
        )}

      </div>
    </motion.div>
  );
}

/* =========================================================
   EVENT DETAIL PAGE
========================================================= */

export default function EventDetail() {
  const { eventId } = useParams<{ eventId: string }>();
  const { event, loading } = useEvent(eventId);

  if (loading) {
    return <PageLoader />;
  }

  if (!event) {
    return <NotFound />;
  }

  const Icon = getEventIconComponent(event.icon);

  const teamSize =
    event.format === 'team'
      ? `Team of ${event.teamSize}`
      : 'Individual';

  const registrationFee =
    event.registrationFee || 'Free';

  const registrationStatus = event.registrationStatus ?? 'open';
  const theme = getEventTheme(event);
  const accent = theme.accent;

  return (
    <>
      {/* =====================================================
          HERO
      ====================================================== */}

      <PageHero
        title={event.title}
        subtitle={EVENT_CATEGORY_LABELS[event.category]}
        backgroundImage={event.poster}
      />

      {/* =====================================================
          CONTENT
      ====================================================== */}

      <section
        className="relative overflow-hidden bg-cream py-10 sm:py-14 lg:py-16"
        style={{ '--accent': accent } as React.CSSProperties}
      >

        {/* EVENT-SPECIFIC BACKGROUND DECORATION */}

        <EventThemeBackdrop theme={theme} />

        <div className="relative mx-auto max-w-5xl px-4 sm:px-6 lg:px-8">

          {/* =================================================
              EVENT TITLE
          ================================================== */}

          <motion.div
            initial={{
              opacity: 0,
              y: 25,
            }}
            animate={{
              opacity: 1,
              y: 0,
            }}
            transition={{
              duration: 0.6,
            }}
            className="mb-6 text-center"
          >

            {/* ICON */}

            <motion.div
              initial={{
                opacity: 0,
                scale: 0.6,
                rotate: -15,
              }}
              animate={{
                opacity: 1,
                scale: 1,
                rotate: 0,
              }}
              transition={{
                duration: 0.7,
                delay: 0.15,
                type: 'spring',
                stiffness: 120,
              }}
            >
              <EventThemeIconFrame theme={theme}>
                <Icon
                  className="h-full w-full p-4"
                  strokeWidth={1.3}
                />
              </EventThemeIconFrame>
            </motion.div>

            {/* LABEL */}

            <motion.p
              initial={{
                opacity: 0,
                letterSpacing: '0.05em',
              }}
              animate={{
                opacity: 1,
                letterSpacing: '0.3em',
              }}
              transition={{
                duration: 0.7,
                delay: 0.3,
              }}
              className="mt-4 font-body text-[9px] font-bold uppercase text-[var(--accent)]"
            >
              Event Details
            </motion.p>

            {/* TITLE */}

            <motion.h2
              initial={{
                opacity: 0,
                y: 12,
              }}
              animate={{
                opacity: 1,
                y: 0,
              }}
              transition={{
                duration: 0.5,
                delay: 0.4,
              }}
              className="mt-1 font-heading text-3xl font-bold tracking-wide text-navy sm:text-4xl lg:text-5xl"
            >
              {event.title}
            </motion.h2>

            {/* DECORATIVE LINE */}

            <motion.div
              initial={{
                width: 0,
                opacity: 0,
              }}
              animate={{
                width: 'auto',
                opacity: 1,
              }}
              transition={{
                duration: 0.7,
                delay: 0.55,
              }}
              className="mx-auto mt-3 flex items-center justify-center gap-2"
            >
              <div className="h-px w-12 bg-[var(--accent)]/40" />

              <motion.div
                animate={{
                  rotate: [45, 135, 45],
                }}
                transition={{
                  duration: 4,
                  repeat: Infinity,
                  ease: 'easeInOut',
                }}
                className="h-1.5 w-1.5 bg-[var(--accent)]"
              />

              <div className="h-px w-12 bg-[var(--accent)]/40" />
            </motion.div>

            {/* STATUS BADGES */}

            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.65 }}
              className="mt-4 flex flex-wrap items-center justify-center gap-2"
            >
              {registrationStatus === 'open' && (
                <span className="inline-flex items-center gap-1.5 rounded-full border border-gold/50 bg-gold/10 px-3 py-1 font-body text-[9px] font-bold uppercase tracking-[0.15em] text-brown">
                  <motion.span
                    animate={{ opacity: [1, 0.3, 1] }}
                    transition={{ duration: 1.6, repeat: Infinity, ease: 'easeInOut' }}
                    className="h-1.5 w-1.5 rounded-full bg-gold"
                  />
                  Registrations Open
                </span>
              )}

              {registrationStatus === 'closed' && (
                <span className="inline-flex items-center gap-1.5 rounded-full border border-brown/25 bg-brown/10 px-3 py-1 font-body text-[9px] font-bold uppercase tracking-[0.15em] text-brown/70">
                  Registrations Closed
                </span>
              )}

              {registrationStatus === 'coming-soon' && (
                <span className="inline-flex items-center gap-1.5 rounded-full border border-brown/25 bg-brown/10 px-3 py-1 font-body text-[9px] font-bold uppercase tracking-[0.15em] text-brown/70">
                  <Hourglass size={10} /> Coming Soon
                </span>
              )}

              {event.prequalifierRequired && (
                <span className="inline-flex items-center gap-1.5 rounded-full border border-navy/20 bg-navy/5 px-3 py-1 font-body text-[9px] font-bold uppercase tracking-[0.15em] text-navy/70">
                  Prequalifier Required
                </span>
              )}
            </motion.div>

          </motion.div>

          {/* =================================================
              MAIN CARD
          ================================================== */}

          <motion.div
            initial={{
              opacity: 0,
              y: 25,
            }}
            animate={{
              opacity: 1,
              y: 0,
            }}
            transition={{
              duration: 0.6,
              delay: 0.2,
            }}
            className="relative overflow-hidden rounded-sm border border-[var(--accent)]/30 bg-white/70 shadow-[0_18px_55px_-28px_rgba(15,35,50,0.45)] backdrop-blur-sm"
          >

            {/* TOP LINE */}

            <motion.div
              initial={{
                scaleX: 0,
              }}
              animate={{
                scaleX: 1,
              }}
              transition={{
                duration: 0.8,
                delay: 0.35,
              }}
              className="h-1 origin-center bg-gradient-to-r from-transparent via-[var(--accent)] to-transparent"
            />

            <div className="p-5 sm:p-7 lg:p-8">

              {/* =================================================
                  ABOUT EVENT
              ================================================== */}

              <div className="text-center">

                <motion.p
                  initial={{
                    opacity: 0,
                    y: 8,
                  }}
                  animate={{
                    opacity: 1,
                    y: 0,
                  }}
                  transition={{
                    duration: 0.4,
                    delay: 0.45,
                  }}
                  className="font-body text-[10px] font-bold uppercase tracking-[0.3em] text-[var(--accent)]"
                >
                  About The Event
                </motion.p>

                <motion.h3
                  initial={{
                    opacity: 0,
                    y: 8,
                  }}
                  animate={{
                    opacity: 1,
                    y: 0,
                  }}
                  transition={{
                    duration: 0.45,
                    delay: 0.5,
                  }}
                  className="mt-1 font-heading text-2xl font-semibold text-navy sm:text-3xl"
                >
                  {event.title}
                </motion.h3>

                {/* WORD BY WORD DESCRIPTION */}

                <div className="mx-auto mt-3 max-w-3xl font-body text-lg leading-8 text-slate sm:text-xl">
                  <AnimatedText
                    text={event.description}
                    delay={0.65}
                  />
                </div>

              </div>

              {/* =================================================
                  DIVIDER
              ================================================== */}

              <div className="my-5 flex items-center gap-3">

                <motion.div
                  initial={{ scaleX: 0 }}
                  animate={{ scaleX: 1 }}
                  transition={{
                    duration: 0.6,
                    delay: 0.7,
                  }}
                  className="h-px flex-1 origin-left bg-[var(--accent)]/20"
                />

                <motion.span
                  initial={{
                    opacity: 0,
                    scale: 0.8,
                  }}
                  animate={{
                    opacity: 1,
                    scale: 1,
                  }}
                  transition={{
                    duration: 0.4,
                    delay: 0.75,
                  }}
                  className="font-body text-[8px] font-bold uppercase tracking-[0.25em] text-[var(--accent)]/90"
                >
                  Event Information
                </motion.span>

                <motion.div
                  initial={{ scaleX: 0 }}
                  animate={{ scaleX: 1 }}
                  transition={{
                    duration: 0.6,
                    delay: 0.7,
                  }}
                  className="h-px flex-1 origin-right bg-[var(--accent)]/20"
                />

              </div>

              {/* =================================================
                  INFORMATION BOXES
              ================================================== */}

              <div className="grid gap-2 sm:grid-cols-2">

                <InfoCard
                  icon={
                    <ShieldCheck
                      size={20}
                      strokeWidth={1.5}
                    />
                  }
                  label="Eligibility"
                  value={event.eligibility}
                  delay={0.8}
                />

                <InfoCard
                  icon={
                    <Users
                      size={20}
                      strokeWidth={1.5}
                    />
                  }
                  label="Team Size"
                  value={teamSize}
                  delay={0.85}
                />

                <InfoCard
                  icon={
                    <Wallet
                      size={20}
                      strokeWidth={1.5}
                    />
                  }
                  label="Registration Fee"
                  value={registrationFee}
                  delay={0.9}
                />

                <InfoCard
                  icon={
                    <Clock
                      size={20}
                      strokeWidth={1.5}
                    />
                  }
                  label="Duration"
                  value={event.duration}
                  delay={0.95}
                />

              </div>

              {/* =================================================
                  RULE BOOK
              ================================================== */}

              <ResourceBox
                eyebrow="Event Rules"
                title="Official Rule Book"
                comingSoonTitle="Rule Book Coming Soon"
                comingSoonNote="Detailed rules for this event will be published here shortly."
                downloadUrl={event.ruleBook}
                downloadLabel="Click Here to Download Rule Book"
                delay={1.2}
              />

              {/* =================================================
                  PREQUALIFIER ROUND (Problem Statement + Register)
              ================================================== */}

              {event.prequalifierRequired && (
                <>
                  <ResourceBox
                    eyebrow="Prequalifier Round"
                    title="Problem Statement"
                    comingSoonTitle="Problem Statement Coming Soon"
                    comingSoonNote="Problem statements for the prequalifier round will be published here shortly."
                    downloadUrl={event.problemStatementUrl}
                    downloadLabel="Click Here to Download Problem Statement"
                    delay={1.25}
                  />

                  <motion.div
                    initial={{ opacity: 0, y: 18 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.55, delay: 1.3 }}
                    className="mt-4 overflow-hidden border border-[var(--accent)]/50 bg-navy"
                  >
                    <div className="flex flex-col gap-3 px-4 py-4 sm:flex-row sm:items-center sm:justify-between sm:px-5">
                      <div className="flex items-center gap-3">
                        <motion.div
                          animate={{ scale: [1, 1.1, 1] }}
                          transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}
                          className="flex h-9 w-9 shrink-0 items-center justify-center border border-[var(--accent)]/50 bg-[var(--accent)]/20 text-[var(--accent)]"
                        >
                          <ArrowRight size={17} strokeWidth={1.8} />
                        </motion.div>
                        <div>
                          <p className="font-body text-[10px] font-bold uppercase tracking-[0.2em] text-[var(--accent)]">
                            Prequalifier Round
                          </p>
                          <p className="mt-0.5 font-heading text-base font-semibold text-cream sm:text-lg">
                            Register for Prequalifier Round
                          </p>
                        </div>
                      </div>

                      <Button
                        to={`/events/${event.id}/prequalifier`}
                        variant="primary"
                        size="md"
                        icon={<ArrowRight size={14} />}
                      >
                        Register Now
                      </Button>
                    </div>
                  </motion.div>
                </>
              )}

            </div>

            {/* BOTTOM LINE */}

            <motion.div
              initial={{
                scaleX: 0,
              }}
              animate={{
                scaleX: 1,
              }}
              transition={{
                duration: 0.8,
                delay: 1.3,
              }}
              className="h-px origin-center bg-gradient-to-r from-transparent via-[var(--accent)]/40 to-transparent"
            />

          </motion.div>

          {/* =================================================
              FOOTER
          ================================================== */}

          <motion.div
            initial={{
              opacity: 0,
            }}
            animate={{
              opacity: 1,
            }}
            transition={{
              duration: 0.6,
              delay: 1.4,
            }}
            className="mt-4 text-center"
          >
            <span className="font-body text-[8px] font-bold uppercase tracking-[0.3em] text-brown/35">
              Discover · Compete · Conquer
            </span>
          </motion.div>

        </div>
      </section>
    </>
  );
}