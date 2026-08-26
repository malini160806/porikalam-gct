import { motion } from 'framer-motion';
import {
  ArrowRight,
  Award,
  Building2,
  Compass,
  Handshake,
  Lightbulb,
  Network,
  Presentation,
  Rocket,
  Sparkles,
  Users,
} from 'lucide-react';

import { Breadcrumb } from '@/components/ui/Breadcrumb';
import { TempleSilhouette } from '@/components/common/TempleSilhouette';
import { SectionHeading } from '@/components/ui/SectionHeading';
import { Button } from '@/components/ui/Button';
import { Badge } from '@/components/ui/Badge';
import { Divider } from '@/components/ui/Divider';
import { CornerOrnament } from '@/components/common/CornerOrnament';
import { ParticipantJourney } from '@/components/thulira/ParticipantJourney';

import { useParallax } from '@/hooks/useParallax';
import { useCountUp } from '@/hooks/useCountUp';
import { SITE } from '@/constants/site';

import {
  techThiralAudience,
  techThiralExhibitionOpportunities,
  techThiralHighlights,
  techThiralJourney,
  techThiralJourneyStrip,
} from '@/data/techThiral';

import expoPanorama from '@/assets/hero/expo-panorama.webp';
import ancientEngineering from '@/assets/hero/ancient-engineering.webp';

const HIGHLIGHT_ICONS: Record<string, typeof Compass> = {
  discover: Compass,
  engage: Handshake,
  explore: Lightbulb,
  connect: Network,
};

const OVERVIEW_STATS = [
  {
    id: 'days',
    label: 'Event Days',
    value: 2,
    icon: Building2,
  },
  {
    id: 'stages',
    label: 'Journey Stages',
    value: techThiralJourney.length,
    icon: Compass,
  },
  {
    id: 'highlights',
    label: 'Expo Highlights',
    value: techThiralHighlights.length,
    icon: Sparkles,
  },
  {
    id: 'audience',
    label: 'Exhibitor Categories',
    value: techThiralAudience.length,
    icon: Users,
  },
];

function OverviewStat({
  label,
  value,
  icon: Icon,
}: {
  label: string;
  value: number;
  icon: typeof Building2;
}) {
  const { ref, value: animated } = useCountUp(value);

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.4 }}
      whileHover={{ y: -5 }}
      className="flex flex-col items-center gap-2 border border-gold/20 bg-navy-deep/70 px-5 py-6 text-center shadow-card"
    >
      <Icon size={24} className="text-gold" strokeWidth={1.5} />

      <span className="font-heading text-3xl font-bold text-gold sm:text-4xl">
        {animated}
      </span>

      <span className="font-body text-[10px] font-semibold uppercase tracking-[0.18em] text-beige/70">
        {label}
      </span>
    </motion.div>
  );
}

export default function TechThiral() {
  const aboutParallaxRef = useParallax<HTMLDivElement>(30);

  return (
    <div className="relative overflow-hidden">

      {/* =========================================================
          HERO
      ========================================================= */}
      <section className="relative overflow-hidden bg-navy-deep py-32 text-center sm:py-44">

        <motion.img
          src={expoPanorama}
          alt=""
          aria-hidden="true"
          initial={{ opacity: 0, scale: 1.15 }}
          animate={{
            opacity: 1,
            scale: [1.15, 1, 1.06, 1],
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
          className="pointer-events-none absolute inset-0 h-full w-full object-cover"
        />

        <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-navy-deep via-navy-deep/55 to-navy-deep/75" />

        <div className="absolute inset-0 bp-grid-bg opacity-30" />

        <div className="pointer-events-none absolute inset-x-0 bottom-0 flex justify-center text-gold/10">
          <TempleSilhouette
            className="h-40 w-40 sm:h-56 sm:w-56"
            strokeWidth={0.9}
          />
        </div>

        <div className="relative mx-auto flex max-w-5xl flex-col items-center gap-6 px-4 sm:px-6">

          <Breadcrumb
            items={[
              { label: 'Home', path: '/' },
              { label: 'Tech Thiral' },
            ]}
            tone="dark"
          />

          <div className="flex w-full items-center justify-center gap-4 sm:gap-8">

            <motion.span
              initial={{ scaleX: 0, opacity: 0 }}
              animate={{ scaleX: 1, opacity: 1 }}
              transition={{
                duration: 0.9,
                delay: 0.4,
                ease: 'easeOut',
              }}
              className="hidden h-px w-16 origin-right bg-gradient-to-l from-gold to-transparent sm:block sm:w-24 lg:w-32"
            />

            <motion.h1
              initial={{
                opacity: 0,
                y: 24,
                scale: 0.92,
              }}
              animate={{
                opacity: 1,
                y: 0,
                scale: 1,
              }}
              transition={{
                duration: 0.8,
                ease: 'easeOut',
              }}
              className="heading-glow-pulse text-shimmer-gold font-heading text-5xl font-extrabold uppercase tracking-wide sm:text-7xl lg:text-8xl"
            >
              Tech Thiral
            </motion.h1>

            <motion.span
              initial={{ scaleX: 0, opacity: 0 }}
              animate={{ scaleX: 1, opacity: 1 }}
              transition={{
                duration: 0.9,
                delay: 0.4,
                ease: 'easeOut',
              }}
              className="hidden h-px w-16 origin-left bg-gradient-to-r from-gold to-transparent sm:block sm:w-24 lg:w-32"
            />

          </div>

          <motion.p
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{
              duration: 0.6,
              delay: 0.5,
            }}
            className="font-body text-sm font-semibold uppercase tracking-[0.35em] text-beige/90 sm:text-base"
          >
            Industry & Startup Summit
          </motion.p>

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{
              duration: 0.6,
              delay: 0.7,
            }}
          >
            <Divider />
          </motion.div>

        </div>
      </section>


      {/* =========================================================
          TAGLINE
      ========================================================= */}
      <section className="relative overflow-hidden bg-navy-deep py-12">

        <div className="absolute inset-0 bp-grid-bg opacity-20" />

        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.6 }}
          transition={{ duration: 0.6 }}
          className="relative mx-auto flex max-w-3xl flex-col items-center gap-4 px-4 text-center sm:px-6"
        >

          <p className="font-quote text-xl italic text-gold sm:text-2xl">
            &ldquo;A Showcase of Technology, Innovation &amp; Enterprise.&rdquo;
          </p>

          <Divider />

          <p className="font-body text-xs font-semibold uppercase tracking-[0.3em] text-beige/70">
            Powered by Porikkalam · {SITE.college}, Coimbatore
          </p>

        </motion.div>

        <div className="relative mx-auto mt-10 flex max-w-4xl flex-wrap items-center justify-center gap-x-3 gap-y-3 px-4 sm:px-6">

          {techThiralJourneyStrip.map((word, index) => (
            <span
              key={`${word}-${index}`}
              className="flex items-center gap-3"
            >

              <motion.span
                initial={{
                  opacity: 0,
                  y: 8,
                }}
                whileInView={{
                  opacity: 1,
                  y: 0,
                }}
                viewport={{
                  once: true,
                  amount: 0.6,
                }}
                transition={{
                  duration: 0.4,
                  delay: index * 0.1,
                }}
                className="font-body text-[11px] font-bold uppercase tracking-[0.2em] text-gold/90 sm:text-xs"
              >
                {word}
              </motion.span>

              {index < techThiralJourneyStrip.length - 1 && (
                <span className="text-gold/35">·</span>
              )}

            </span>
          ))}

        </div>
      </section>


      {/* =========================================================
          ABOUT TECH THIRAL
      ========================================================= */}
      <section className="relative overflow-hidden bg-cream/95 py-24">

        <div className="absolute inset-0 bp-grid-bg opacity-30" />

        <div
          ref={aboutParallaxRef}
          className="pointer-events-none absolute inset-0 opacity-[0.06]"
        >
          <img
            src={ancientEngineering}
            alt=""
            aria-hidden="true"
            className="h-full w-full object-cover"
          />
        </div>

        <div className="relative mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">

          <SectionHeading
            eyebrow="About Tech Thiral"
            title="Where Industry Meets Innovation"
          />

          <motion.div
            initial={{
              opacity: 0,
              y: 24,
            }}
            whileInView={{
              opacity: 1,
              y: 0,
            }}
            viewport={{
              once: true,
              amount: 0.3,
            }}
            transition={{
              duration: 0.6,
            }}
            className="relative mt-12 overflow-hidden border border-navy/10 bg-white/55 p-8 shadow-card sm:p-10"
          >

            <CornerOrnament corner="top-left" />
            <CornerOrnament corner="bottom-right" />

            <div className="relative z-10 flex flex-col gap-5">

              <p className="font-body text-base leading-relaxed text-slate">
                TECH THIRAL — Industry &amp; Startup Summit brings together
                startups, innovators, industry professionals, and researchers
                on a common platform to showcase emerging technologies,
                products, ideas, and entrepreneurial ventures.
              </p>

              <p className="font-body text-base leading-relaxed text-slate">
                It creates opportunities for students to discover innovations,
                interact with founders and industry experts, explore emerging
                technologies, and build meaningful connections with the startup
                and industrial ecosystem.
              </p>

              <p className="font-body text-base leading-relaxed text-slate">
                Tech Thiral runs as a continuous two-day flagship track
                alongside Thulira, with every other Porikkalam programme
                scheduled around them.
              </p>

            </div>
          </motion.div>

        </div>
      </section>


      {/* =========================================================
          VISION & MISSION
      ========================================================= */}
      <section className="relative overflow-hidden bg-navy py-24">

        <div className="absolute inset-0 bp-grid-bg opacity-25" />

        <div className="relative mx-auto grid max-w-5xl grid-cols-1 gap-6 px-4 sm:grid-cols-2 sm:px-6 lg:px-8">

          {[
            {
              icon: Sparkles,
              title: 'Vision',
              text: 'To be the meeting point where students, industry, and startups discover each other and build what comes next.',
            },
            {
              icon: Rocket,
              title: 'Mission',
              text: 'To give startups and industry a platform to showcase innovation, and give students direct access to the ecosystem building it.',
            },
          ].map((item, index) => {

            const Icon = item.icon;

            return (
              <motion.div
                key={item.title}
                initial={{
                  opacity: 0,
                  y: 24,
                }}
                whileInView={{
                  opacity: 1,
                  y: 0,
                }}
                viewport={{
                  once: true,
                  amount: 0.4,
                }}
                transition={{
                  duration: 0.5,
                  delay: index * 0.1,
                }}
                whileHover={{
                  y: -5,
                }}
                className="flex flex-col gap-4 border border-gold/25 bg-navy-deep p-8 shadow-[inset_0_0_30px_-20px_rgba(212,175,55,0.5)]"
              >

                <Icon
                  className="text-gold"
                  size={28}
                  strokeWidth={1.5}
                />

                <h3 className="font-heading text-2xl font-semibold tracking-wide text-gold">
                  {item.title}
                </h3>

                <p className="font-body text-sm leading-relaxed text-beige/80">
                  {item.text}
                </p>

              </motion.div>
            );
          })}

        </div>
      </section>


      {/* =========================================================
          WHAT YOU'LL EXPERIENCE
      ========================================================= */}
      <section className="relative bg-cream/95 py-24">

        <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">

          <SectionHeading
            eyebrow="What You'll Experience"
            title="Discover. Connect. Explore."
          />

          <div className="mt-14 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">

            {techThiralHighlights.map((item, index) => {

              const Icon = HIGHLIGHT_ICONS[item.id] ?? Sparkles;

              return (
                <motion.div
                  key={item.id}
                  initial={{
                    opacity: 0,
                    y: 24,
                  }}
                  whileInView={{
                    opacity: 1,
                    y: 0,
                  }}
                  viewport={{
                    once: true,
                    amount: 0.4,
                  }}
                  transition={{
                    duration: 0.5,
                    delay: index * 0.1,
                  }}
                  whileHover={{
                    y: -6,
                  }}
                  className="group relative overflow-hidden border border-brown/25 bg-white/60 p-8 text-center shadow-card transition-shadow duration-300 hover:shadow-[0_16px_36px_-14px_rgba(139,115,51,0.4)]"
                >

                  <CornerOrnament
                    corner="top-left"
                    variant="floral"
                    size={36}
                    opacity={0.3}
                  />

                  <div className="relative z-10 flex flex-col items-center gap-4">

                    <div className="flex h-16 w-16 items-center justify-center rounded-full border-2 border-brown/40 bg-cream text-brown transition-transform duration-300 group-hover:scale-110">
                      <Icon
                        size={26}
                        strokeWidth={1.5}
                      />
                    </div>

                    <h3 className="font-heading text-lg font-semibold tracking-wide text-navy">
                      {item.title}
                    </h3>

                    <p className="font-body text-sm leading-relaxed text-slate">
                      {item.description}
                    </p>

                  </div>
                </motion.div>
              );
            })}

          </div>
        </div>
      </section>


      {/* =========================================================
          EVENT OVERVIEW
      ========================================================= */}
      <section className="relative overflow-hidden bg-navy-deep py-24">

        <div className="absolute inset-0 bp-grid-bg opacity-20" />

        <div className="relative mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">

          <SectionHeading
            eyebrow="Event Overview"
            title="Two Days. One Industry Floor."
            tone="dark"
          />

          <div className="mx-auto mt-10 flex max-w-2xl flex-col gap-5">

            <p className="font-body text-base leading-relaxed text-beige/85">
              Tech Thiral is a two-day industry expo held in the Parking
              Space venue, running continuously across both days of
              Porikkalam alongside Thulira.
            </p>

            <p className="font-body text-base leading-relaxed text-beige/85">
              Startups, industry professionals, entrepreneurs, researchers,
              and innovators exhibit their technologies and ventures to a
              live audience of engineering students, faculty, and the GCT
              alumni community.
            </p>

            <p className="font-body text-base leading-relaxed text-beige/85">
              The expo promotes discovery, direct engagement with founders
              and experts, and long-term connections across the startup and
              industrial ecosystem.
            </p>

          </div>

          <div className="mt-14 grid grid-cols-2 gap-4 sm:grid-cols-4">

            {OVERVIEW_STATS.map((stat) => (
              <OverviewStat
                key={stat.id}
                label={stat.label}
                value={stat.value}
                icon={stat.icon}
              />
            ))}

          </div>
        </div>
      </section>


      {/* =========================================================
          EXHIBITOR JOURNEY
      ========================================================= */}
      <section className="relative overflow-hidden bg-navy py-24">

        <div className="absolute inset-0 bp-grid-bg opacity-20" />

        <div className="relative mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">

          <SectionHeading
            eyebrow="Exhibitor Journey"
            title="Six Stages, One Expo Floor"
            tone="dark"
          />

          <div className="mt-16">
            <ParticipantJourney steps={techThiralJourney} />
          </div>

        </div>
      </section>


      {/* =========================================================
          WHO CAN SHOWCASE
      ========================================================= */}
      <section className="relative bg-cream/95 py-24">

        <div className="mx-auto max-w-4xl px-4 text-center sm:px-6 lg:px-8">

          <SectionHeading
            eyebrow="Who Can Showcase"
            title="Built For The Ecosystem"
          />

          <p className="mx-auto mt-8 max-w-2xl font-body text-base leading-relaxed text-slate">
            Tech Thiral is open to organizations and individuals building
            at the edge of technology and enterprise.
          </p>

          <div className="mt-8 flex flex-wrap items-center justify-center gap-3">

            {techThiralAudience.map((item) => (
              <Badge
                key={item}
                variant="outline"
              >
                {item}
              </Badge>
            ))}

          </div>

        </div>
      </section>


      {/* =========================================================
          EXPO FLOOR
      ========================================================= */}
      <section className="relative overflow-hidden bg-navy-deep py-24">

        <div className="absolute inset-0 bp-grid-bg opacity-25" />

        <div className="relative mx-auto max-w-5xl px-4 sm:px-6 lg:px-8">

          <SectionHeading
            eyebrow="Expo Floor"
            title="What Exhibitors Get"
            tone="dark"
          />

          <div className="mt-12 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">

            {techThiralExhibitionOpportunities.map((item, index) => (
              <motion.div
                key={item}
                initial={{
                  opacity: 0,
                  y: 16,
                }}
                whileInView={{
                  opacity: 1,
                  y: 0,
                }}
                viewport={{
                  once: true,
                  amount: 0.4,
                }}
                transition={{
                  duration: 0.4,
                  delay: index * 0.06,
                }}
                whileHover={{
                  y: -4,
                  borderColor: 'rgba(212,175,55,0.7)',
                }}
                className="flex items-center gap-3 border border-gold/20 bg-navy/70 p-5 transition-colors"
              >

                <Award
                  size={18}
                  className="shrink-0 text-gold"
                />

                <span className="font-body text-sm text-beige/85">
                  {item}
                </span>

              </motion.div>
            ))}

          </div>
        </div>
      </section>


      {/* =========================================================
          PARTICIPATION / GET INVOLVED
      ========================================================= */}
      <section className="relative bg-cream/95 py-24">

        <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">

          <SectionHeading
            eyebrow="Get Involved"
            title="Showcase At Tech Thiral"
          />

          <motion.div
            initial={{
              opacity: 0,
              y: 16,
            }}
            whileInView={{
              opacity: 1,
              y: 0,
            }}
            viewport={{
              once: true,
              amount: 0.4,
            }}
            transition={{
              duration: 0.5,
            }}
            className="relative mt-12 overflow-hidden border border-gold/30 bg-white/40 p-10 text-center sm:p-12"
          >

            <CornerOrnament corner="top-left" />
            <CornerOrnament corner="bottom-right" />

            <div className="relative z-10 flex flex-col items-center gap-5">

              <Presentation
                size={36}
                className="text-brown"
                strokeWidth={1.5}
              />

              <h3 className="font-heading text-3xl font-semibold tracking-wide text-navy">
                Bring Your Booth To Tech Thiral
              </h3>

              <p className="max-w-lg font-body text-sm leading-relaxed text-slate">
                Startups and industry teams interested in exhibiting can
                reach out to the Porikkalam team to apply for booth space
                at the Industry Expo.
              </p>

              <div className="mt-2 flex flex-wrap items-center justify-center gap-4">

                <Button
                  to="/contact"
                  variant="primary"
                  size="lg"
                  icon={<ArrowRight size={16} />}
                >
                  Apply To Exhibit
                </Button>

                <Button
                  to="/schedule"
                  variant="secondary"
                  size="lg"
                >
                  View Schedule
                </Button>

              </div>

            </div>
          </motion.div>

        </div>
      </section>


      {/* =========================================================
          FINAL CTA
      ========================================================= */}
      <section className="relative overflow-hidden bg-navy-deep py-20">

        <div className="absolute inset-0 bp-grid-bg opacity-20" />

        <div className="relative mx-auto max-w-4xl px-4 text-center sm:px-6">

          <motion.div
            initial={{
              opacity: 0,
              y: 20,
            }}
            whileInView={{
              opacity: 1,
              y: 0,
            }}
            viewport={{
              once: true,
              amount: 0.5,
            }}
            transition={{
              duration: 0.6,
            }}
            className="flex flex-col items-center gap-5"
          >

            <div className="flex h-16 w-16 items-center justify-center rounded-full border border-gold/40 bg-navy text-gold">
              <Rocket
                size={28}
                strokeWidth={1.5}
              />
            </div>

            <h2 className="font-heading text-3xl font-semibold tracking-wide text-gold sm:text-4xl">
              Discover The Future At Tech Thiral
            </h2>

            <p className="max-w-2xl font-body text-sm leading-relaxed text-beige/75">
              Explore emerging technologies, connect with innovators,
              meet industry professionals, and discover the ideas shaping
              tomorrow.
            </p>

            <Button
              to="/contact"
              variant="primary"
              size="lg"
              icon={<ArrowRight size={16} />}
            >
              Get Involved
            </Button>

          </motion.div>

        </div>
      </section>

    </div>
  );
}