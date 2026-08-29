import { motion } from 'framer-motion';
import {
  Landmark,
  Sparkles,
  Users,
  Target,
  Compass,
  Rocket,
  GraduationCap,
  Building2,
  Factory,
  Globe2,
} from 'lucide-react';

import { PageHero } from '@/components/common/PageHero';
import { SectionHeading } from '@/components/ui/SectionHeading';
import { CoreTeamMemberCard } from '@/components/cards/CoreTeamMemberCard';

import {
  coreTeamDomains,
  getMembersForDomain,
} from '@/data/coreTeam';

import { getIcon } from '@/routes/utils/icons';

import templeGopuram from '@/assets/heritage/temple-gopuram-detailed.webp';
import heroPanorama from '@/assets/hero/ancient-futuristic-panorama.webp';

import { EraJourney } from '@/components/home/EraJourney';

const whyPorikkalam = [
  {
    icon: GraduationCap,
    title: 'For Students',
    tagline: 'Learn. Compete. Build. Connect.',
    description:
      'Students step beyond the classroom, put their engineering skills to the test, build and showcase ideas, meet industry and startup leaders, and discover new possibilities for their careers and entrepreneurial journeys.',
  },
  {
    icon: Building2,
    title: 'For The College',
    tagline: 'Showcase. Connect. Grow.',
    description:
      'Porikkalam gives the college a platform to showcase its students and their capabilities, foster a culture of innovation and entrepreneurship, and build meaningful connections with industry, startups, alumni and the wider engineering ecosystem.',
  },
  {
    icon: Factory,
    title: 'For Industry & Startups',
    tagline: 'Discover. Engage. Collaborate.',
    description:
      'Porikkalam brings industry and startups onto a platform to showcase their work, technologies and innovations to students, faculty and the GCT alumni community — building visibility and connecting with a wider network of professionals and innovators.',
  },
  {
    icon: Globe2,
    title: 'For The Ecosystem',
    tagline: 'Connect. Inspire. Create Impact.',
    description:
      'Porikkalam brings together students, academia, industry, startups and innovators to exchange ideas, create opportunities and turn engineering potential into real-world impact.',
  },
];

const atAGlance = [
  {
    label: 'Hosted By',
    value: 'Government College of Technology, Coimbatore',
  },
  {
    label: 'Presented By',
    value: 'DCKAP Incubation Centre',
  },
  {
    label: 'Date & Time',
    value: 'September 25–26, 2026 | 9 AM – 6 PM',
  },
  {
    label: 'Theme',
    value: 'Engineering through the ages',
  },
  {
    label: 'Participants',
    value:
      'Engineering students, startups, industry, academia, and innovators',
  },
  {
    label: 'Format',
    value:
      'Startup challenges, industry and startup summits, showcases, and technical and non-technical events',
  },
  {
    label: 'Focus',
    value:
      'Competition | Innovation | Entrepreneurship | Industry Connect',
  },
];

const values = [
  {
    icon: Landmark,
    title: 'Heritage Inspired',
    description:
      'Every touchpoint draws from classical architecture and craftsmanship.',
  },
  {
    icon: Sparkles,
    title: 'Innovation Focused',
    description:
      'A platform where bold engineering ideas are built and tested.',
  },
  {
    icon: Users,
    title: 'Student Driven',
    description:
      'Organized entirely by students, for students across the region.',
  },
  {
    icon: Target,
    title: 'Future Ready',
    description:
      'Preparing engineers to solve tomorrow’s challenges, today.',
  },
];

const missionValues = [
  {
    icon: Compass,
    title: 'Our Vision',
    description:
      'To be the definitive platform where engineering students across the region test ideas, build skill, and find community.',
  },
  {
    icon: Rocket,
    title: 'Our Mission',
    description:
      'To create a rigorous, well-run symposium that rewards genuine craftsmanship — technical and creative — over spectacle.',
  },
];

export default function About() {
  return (
    <div className="relative overflow-hidden">

      {/* =========================================
          PAGE HERO
      ========================================= */}
      <PageHero
        title="About Porikkalam"
        subtitle="Where heritage meets impact, and engineering finds its story."
        backgroundImage={heroPanorama}
      />

      {/* =========================================
          ABOUT PORIKKALAM
      ========================================= */}
      <section className="relative overflow-hidden bg-cream py-24">

        <div className="absolute inset-0 bp-grid-bg opacity-40" />

        <div className="relative mx-auto grid max-w-7xl grid-cols-1 items-center gap-16 px-4 sm:px-6 lg:grid-cols-2 lg:px-8">

          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.7 }}
            className="order-2 flex flex-col gap-6 lg:order-1"
          >
            <SectionHeading
              eyebrow="About Porikkalam"
              title="Where Engineering Meets Impact"
              align="left"
            />

            <p className="font-quote text-xl italic leading-relaxed text-slate">
              PORIKKALAM 2026 is the inaugural flagship Engineering, Innovation,
              and Entrepreneurship event presented by Government College of
              Technology, Coimbatore, and organized by the DCKAP Incubation
              Centre. Named after the traditional threshing floor where grain
              was separated from chaff, Porikkalam represents the refining
              process innovation goes through before it becomes impact.
            </p>

            <p className="font-quote text-xl italic leading-relaxed text-slate">
              It brings together students, academia, industry, startups,
              researchers, and innovators on a common platform to compete,
              collaborate, innovate, and create through technical challenges,
              project showcases, startup activities, and expert interactions —
              over two days, 25–26 September 2026.
            </p>

            <p className="font-body text-sm font-semibold uppercase tracking-widest text-brown">
              Where Engineers Compete. Ideas Connect. Innovation Begins.
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.7 }}
            className="order-1 flex items-center justify-center lg:order-2"
          >
            <img
              src={templeGopuram}
              alt="Detailed sketch of a South Indian temple gopuram"
              className="w-full max-w-sm border border-gold/30 shadow-card sm:max-w-md"
            />
          </motion.div>

        </div>
      </section>

      {/* =========================================
          VISION & MISSION
      ========================================= */}
      <section className="bg-cream py-20">

        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">

          <SectionHeading
            eyebrow="Purpose"
            title="Vision & Mission"
          />

          <div className="mt-14 grid grid-cols-1 gap-6 sm:grid-cols-2">

            {missionValues.map((item, index) => (
              <motion.div
                key={item.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.4 }}
                transition={{
                  duration: 0.45,
                  delay: index * 0.1,
                }}
                whileHover={{
                  y: -5,
                  borderColor: 'rgba(212,175,55,0.5)',
                }}
                className="flex flex-col gap-3 border border-navy/15 bg-white/40 p-8 transition-all duration-300"
              >

                <item.icon
                  size={28}
                  className="text-gold"
                  strokeWidth={1.5}
                />

                <h3 className="font-heading text-xl font-semibold tracking-wide text-navy">
                  {item.title}
                </h3>

                <p className="font-body text-sm leading-relaxed text-slate">
                  {item.description}
                </p>

              </motion.div>
            ))}

          </div>
        </div>
      </section>

      {/* =========================================
          OUR VALUES
      ========================================= */}
      <section className="relative bg-navy py-24">

        <div className="absolute inset-0 bp-grid-bg opacity-25" />

        <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">

          <SectionHeading
            eyebrow="What We Stand For"
            title="Our Values"
            tone="dark"
          />

          <div className="mt-14 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">

            {values.map((value, index) => (
              <motion.div
                key={value.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.4 }}
                transition={{
                  duration: 0.45,
                  delay: index * 0.08,
                }}
                whileHover={{
                  y: -6,
                  borderColor: 'rgba(212,175,55,0.65)',
                }}
                className="group flex flex-col items-center gap-3 border border-gold/25 bg-navy/60 p-6 text-center transition-all duration-300"
              >

                <motion.div
                  whileHover={{
                    scale: 1.12,
                    rotate: 5,
                  }}
                  className="text-gold"
                >
                  <value.icon
                    size={26}
                    strokeWidth={1.5}
                  />
                </motion.div>

                <h3 className="font-heading text-lg font-semibold tracking-wide text-cream">
                  {value.title}
                </h3>

                <p className="font-body text-sm text-beige/75">
                  {value.description}
                </p>

              </motion.div>
            ))}

          </div>
        </div>
      </section>

      {/* =========================================
          OUR HOME
      ========================================= */}
      <section className="bg-cream py-24">

        <div className="mx-auto max-w-4xl px-4 text-center sm:px-6 lg:px-8">

          <SectionHeading
            eyebrow="Our Home"
            title="Government College of Technology"
            subtitle="A century-plus legacy of technical education in Coimbatore, and the host institution behind Porikkalam."
          />

          <p className="mt-8 font-body text-sm leading-relaxed text-slate">
            Government College of Technology, Coimbatore has trained
            generations of engineers across various disciplines. Porikkalam channels that
            same institutional depth into two days of student-run competition
            and craft — a symposium built by the college's own students, for
            students everywhere.
          </p>

        </div>
      </section>

      {/* =========================================
          WHY PORIKKALAM
      ========================================= */}
      <section className="relative bg-navy py-24">

        <div className="absolute inset-0 bp-grid-bg opacity-20" />

        <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">

          <SectionHeading
            eyebrow="Why Porikkalam"
            title="One Platform, Four Perspectives"
            tone="dark"
          />

          <div className="mt-14 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">

            {whyPorikkalam.map((item, index) => (
              <motion.div
                key={item.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.4 }}
                transition={{
                  duration: 0.45,
                  delay: index * 0.08,
                }}
                whileHover={{
                  y: -6,
                  borderColor: 'rgba(212,175,55,0.65)',
                }}
                className="flex flex-col gap-3 border border-gold/25 bg-navy/60 p-6 transition-all duration-300"
              >

                <item.icon
                  size={26}
                  className="text-gold"
                  strokeWidth={1.5}
                />

                <h3 className="font-heading text-lg font-semibold tracking-wide text-cream">
                  {item.title}
                </h3>

                <p className="font-body text-xs font-semibold uppercase tracking-wide text-gold/80">
                  {item.tagline}
                </p>

                <p className="font-body text-sm leading-relaxed text-beige/75">
                  {item.description}
                </p>

              </motion.div>
            ))}

          </div>
        </div>
      </section>

      {/* =========================================
          AT A GLANCE
      ========================================= */}
      <section className="bg-cream py-24">

        <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">

          <SectionHeading
            eyebrow="Porikkalam 2026"
            title="At A Glance"
          />

          <div className="mt-12 flex flex-col divide-y divide-navy/10 border border-navy/15 bg-white/40">

            {atAGlance.map((item, index) => (
              <motion.div
                key={item.label}
                initial={{ opacity: 0, x: -15 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{
                  duration: 0.4,
                  delay: index * 0.05,
                }}
                className="flex flex-col gap-1 px-6 py-4 sm:flex-row sm:items-baseline sm:gap-6"
              >

                <span className="w-40 shrink-0 font-heading text-sm font-semibold uppercase tracking-wide text-brown">
                  {item.label}
                </span>

                <span className="font-body text-sm leading-relaxed text-slate">
                  {item.value}
                </span>

              </motion.div>
            ))}

          </div>
        </div>
      </section>

      {/* =========================================
          FULL TEAM
      ========================================= */}
      <section id="team" className="relative overflow-hidden bg-cream py-28">

        <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">

          {/* Team heading */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.7 }}
            className="mb-20 text-center"
          >

            <p className="font-body text-xs font-bold uppercase tracking-[0.3em] text-brown">
              The People Behind The Vision
            </p>

            <h2 className="mt-3 font-heading text-4xl uppercase tracking-wide text-navy sm:text-5xl lg:text-6xl">
              Meet The Team
            </h2>

            {/* Divider */}
            <div className="mt-7 flex items-center justify-center gap-4">

              <motion.span
                initial={{ width: 0 }}
                whileInView={{ width: 80 }}
                viewport={{ once: true }}
                transition={{ duration: 0.7 }}
                className="h-px bg-gold/60"
              />

              <motion.span
                animate={{
                  rotate: [45, 135, 225, 315, 405],
                  scale: [1, 1.3, 1],
                  boxShadow: [
                    '0 0 0 rgba(212,175,55,0)',
                    '0 0 15px rgba(212,175,55,0.9)',
                    '0 0 0 rgba(212,175,55,0)',
                  ],
                }}
                transition={{
                  duration: 4,
                  repeat: Infinity,
                  ease: 'easeInOut',
                }}
                className="h-2.5 w-2.5 bg-gold"
              />

              <motion.span
                initial={{ width: 0 }}
                whileInView={{ width: 80 }}
                viewport={{ once: true }}
                transition={{ duration: 0.7 }}
                className="h-px bg-gold/60"
              />

            </div>

            <p className="mx-auto mt-7 max-w-3xl font-quote text-lg italic leading-relaxed text-slate">
              The passionate minds working together to bring Porikkalam 2026
              to life — driven by engineering, innovation, creativity and
              collaboration.
            </p>

          </motion.div>

          {/* Team Domains */}
          <div className="flex flex-col gap-14">

            {coreTeamDomains
              .slice()
              .sort((a, b) => a.order - b.order)
              .map((domain, domainIndex) => {

                const members = getMembersForDomain(domain.id);
                const Icon = getIcon(domain.icon);

                return (
                  <motion.div
                    key={domain.id}
                    initial={{ opacity: 0, y: 24 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, amount: 0.2 }}
                    transition={{
                      duration: 0.6,
                      ease: 'easeOut',
                      delay: domainIndex * 0.05,
                    }}
                    className="flex flex-col gap-6"
                  >

                    {/* Domain heading */}
                    <div className="flex flex-wrap items-center gap-4 border-b border-navy/15 pb-5">

                      <div className="flex h-12 w-12 shrink-0 items-center justify-center border border-gold/40 bg-white text-brown">
                        <Icon
                          size={22}
                          strokeWidth={1.5}
                        />
                      </div>

                      <div className="flex flex-1 flex-wrap items-baseline justify-between gap-x-4 gap-y-1">

                        <h3 className="font-heading text-xl uppercase tracking-wide text-navy sm:text-2xl">
                          {domain.name}
                        </h3>

                        <span className="font-body text-xs font-semibold uppercase tracking-[0.2em] text-brown/80">
                          {members.length} {members.length === 1 ? 'Member' : 'Members'}
                        </span>

                      </div>

                    </div>

                    {/* Members */}
                    <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">

                      {members.map((member, index) => (
                        <CoreTeamMemberCard
                          key={member.id}
                          member={member}
                          index={index}
                        />
                      ))}

                    </div>

                  </motion.div>
                );
              })}

          </div>

        </div>
      </section>

      {/* =========================================
          ENGINEERING JOURNEY
          MOVED FROM HOME → END OF ABOUT PAGE
      ========================================= */}
      <EraJourney />

    </div>
  );
}