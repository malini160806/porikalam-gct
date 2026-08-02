import { motion } from 'framer-motion';
import { Landmark, Sparkles, Users, Target } from 'lucide-react';
import { PageHero } from '@/components/common/PageHero';
import { SectionHeading } from '@/components/ui/SectionHeading';
import { TeamCard } from '@/components/cards/TeamCard';
import { team } from '@/data/team';
import templeGopuram from '@/assets/heritage/temple-gopuram-detailed.png';
import mandalaBrown1 from '@/assets/heritage/mandala-brown-1.jpg';
import mandalaBrown2 from '@/assets/heritage/mandala-brown-2.jpg';

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

export default function About() {
  const faculty = team.filter((m) => m.team === 'faculty');
  const core = team.filter((m) => m.team === 'core');
  const organizing = team.filter((m) => m.team === 'organizing');

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

          <div className="mt-14 flex flex-col gap-14">
            <div>
              <h3 className="mb-6 text-center font-heading text-sm font-semibold uppercase tracking-widest text-brown">
                Faculty Advisors
              </h3>
              <div className="grid grid-cols-2 gap-6 sm:grid-cols-2 lg:grid-cols-2 mx-auto max-w-xl">
                {faculty.map((member, index) => (
                  <TeamCard key={member.id} member={member} index={index} />
                ))}
              </div>
            </div>

            <div>
              <h3 className="mb-6 text-center font-heading text-sm font-semibold uppercase tracking-widest text-brown">
                Core Team
              </h3>
              <div className="grid grid-cols-2 gap-6 sm:grid-cols-3 lg:grid-cols-6">
                {core.map((member, index) => (
                  <TeamCard key={member.id} member={member} index={index} />
                ))}
              </div>
            </div>

            <div>
              <h3 className="mb-6 text-center font-heading text-sm font-semibold uppercase tracking-widest text-brown">
                Organizing Committee
              </h3>
              <div className="grid grid-cols-2 gap-6 sm:grid-cols-4">
                {organizing.map((member, index) => (
                  <TeamCard key={member.id} member={member} index={index} />
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
