import { motion } from 'framer-motion';
import { Landmark, Sparkles, Users, Target, Compass, Rocket } from 'lucide-react';
import { PageHero } from '@/components/common/PageHero';
import { SectionHeading } from '@/components/ui/SectionHeading';
import { TeamCard } from '@/components/cards/TeamCard';
import { Timeline } from '@/components/ui/Timeline';
import { Button } from '@/components/ui/Button';
import { team } from '@/data/team';
import type { TimelineStep } from '@/data/types';
import templeGopuram from '@/assets/heritage/temple-gopuram-detailed.png';
import mandalaBrown1 from '@/assets/heritage/mandala-brown-1.jpg';
import mandalaBrown2 from '@/assets/heritage/mandala-brown-2.jpg';

const porikkalamTimeline: TimelineStep[] = [
  { id: 'pt1', label: 'The Idea', date: 'Origins', description: 'A small gathering of engineering enthusiasts at GCT Coimbatore.' },
  { id: 'pt2', label: 'Growing Together', date: 'Early Editions', description: 'Departments across campus joined in, expanding the event scope.' },
  { id: 'pt3', label: 'Regional Recognition', date: 'Recent Editions', description: 'Participation grew to colleges across the region.' },
  { id: 'pt4', label: 'Porikkalam 2026', date: '25–26 Sept 2026', description: '18 events across technical, non-technical, and workshop tracks.' },
];

const values = [
  {
    icon: Landmark,
    title: 'Heritage Inspired',
    description: 'Every touchpoint draws from classical architecture and craftsmanship.',
  },
  {
    icon: Sparkles,
    title: 'Innovation Focused',
    description: 'A platform where bold engineering ideas are built and tested.',
  },
  {
    icon: Users,
    title: 'Student Driven',
    description: 'Organized entirely by students, for students across the region.',
  },
  {
    icon: Target,
    title: 'Future Ready',
    description: 'Preparing engineers to solve tomorrow’s challenges, today.',
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
  const highlightTeam = team.filter((m) => m.team === 'faculty' || m.team === 'core').slice(0, 6);

  return (
    <>
      <PageHero
        title="About Porikkalam"
        subtitle="Where heritage meets impact, and engineering finds its story."
      />

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
            <SectionHeading eyebrow="Our Story" title="Engineering Through The Ages" align="left" />
            <p className="font-quote text-xl italic leading-relaxed text-slate">
              Porikkalam began as a small gathering of engineering enthusiasts determined to
              celebrate craftsmanship — both ancient and modern. Named after the traditional
              threshing floor where grain was separated from chaff, Porikkalam represents the
              refining process innovation goes through before it becomes impact.
            </p>
            <p className="font-quote text-xl italic leading-relaxed text-slate">
              Today, it stands as a mega inter-collegiate symposium hosted by the Government
              College of Technology, Coimbatore — bringing together thousands of students for
              three days of competition, learning, and celebration.
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

      <section className="bg-cream py-20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <SectionHeading eyebrow="Purpose" title="Vision & Mission" />
          <div className="mt-14 grid grid-cols-1 gap-6 sm:grid-cols-2">
            {missionValues.map((item, index) => (
              <motion.div
                key={item.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.4 }}
                transition={{ duration: 0.45, delay: index * 0.1 }}
                className="flex flex-col gap-3 border border-navy/15 bg-white/40 p-8"
              >
                <item.icon size={28} className="text-gold" strokeWidth={1.5} />
                <h3 className="font-heading text-xl font-semibold tracking-wide text-navy">{item.title}</h3>
                <p className="font-body text-sm text-slate leading-relaxed">{item.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      <section className="relative bg-navy py-24">
        <div className="absolute inset-0 bp-grid-bg opacity-25" />
        <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <SectionHeading eyebrow="What We Stand For" title="Our Values" tone="dark" />
          <div className="mt-14 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {values.map((value, index) => (
              <motion.div
                key={value.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.4 }}
                transition={{ duration: 0.45, delay: index * 0.08 }}
                className="flex flex-col items-center gap-3 border border-gold/25 bg-navy/60 p-6 text-center"
              >
                <value.icon size={26} className="text-gold" strokeWidth={1.5} />
                <h3 className="font-heading text-lg font-semibold tracking-wide text-cream">{value.title}</h3>
                <p className="font-body text-sm text-beige/75">{value.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-cream py-24">
        <div className="mx-auto max-w-4xl px-4 text-center sm:px-6 lg:px-8">
          <SectionHeading
            eyebrow="Our Home"
            title="Government College of Technology"
            subtitle="A century-plus legacy of technical education in Coimbatore, and the host institution behind Porikkalam."
          />
          <p className="mt-8 font-body text-sm leading-relaxed text-slate">
            Government College of Technology, Coimbatore has trained generations of engineers across
            Civil, Mechanical, Electrical, Electronics, and Computer disciplines. Porikkalam channels
            that same institutional depth into three days of student-run competition and craft — a
            symposium built by the college's own students, for students everywhere.
          </p>
        </div>
      </section>

      <section className="bg-navy py-24">
        <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
          <SectionHeading eyebrow="Milestones" title="Timeline of Porikkalam" tone="dark" />
          <div className="mt-16">
            <Timeline steps={porikkalamTimeline} tone="dark" />
          </div>
          <div className="mt-14 flex justify-center">
            <Button to="/legacy" variant="outline">
              Explore Previous Editions
            </Button>
          </div>
        </div>
      </section>

      <section className="relative overflow-hidden bg-cream py-24">
        <img
          src={mandalaBrown1}
          alt=""
          aria-hidden="true"
          className="pointer-events-none absolute -left-12 top-8 hidden h-40 w-40 rounded-full opacity-40 lg:block"
        />
        <img
          src={mandalaBrown2}
          alt=""
          aria-hidden="true"
          className="pointer-events-none absolute -right-12 top-8 hidden h-40 w-40 rounded-full opacity-40 lg:block"
        />
        <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <SectionHeading eyebrow="Meet The Team" title="Faculty & Organizers" />

          <div className="mt-14 grid grid-cols-2 gap-6 sm:grid-cols-3 lg:grid-cols-6">
            {highlightTeam.map((member, index) => (
              <TeamCard key={member.id} member={member} index={index} />
            ))}
          </div>

          <div className="mt-12 flex justify-center">
            <Button to="/team" variant="outline">
              Meet The Full Team
            </Button>
          </div>
        </div>
      </section>
    </>
  );
}
