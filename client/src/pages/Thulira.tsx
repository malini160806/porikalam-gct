import { motion } from 'framer-motion';
import {
  ArrowRight,
  Award,
  BrainCircuit,
  CheckCircle2,
  ChevronRight,
  Factory,
  Flag,
  GraduationCap,
  Handshake,
  HeartHandshake,
  Leaf,
  Lightbulb,
  MonitorSmartphone,
  Presentation,
  Shapes,
  Sparkles,
  Sprout,
  Stethoscope,
  Target,
  TrendingUp,
  Truck,
  Wrench,
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
  thuliraApplicationReview,
  thuliraAwardsCriteria,
  thuliraDomains,
  thuliraEvaluationCriteria,
  thuliraExhibitionOpportunities,
  thuliraJourney,
  thuliraJourneyStrip,
  thuliraObjectives,
  type ThuliraDomain,
} from '@/data/thulira';
import ancientFuturisticPanorama from '@/assets/hero/ancient-futuristic-panorama.webp';
import ancientEngineering from '@/assets/hero/ancient-engineering.webp';

const DOMAIN_ICONS: Record<ThuliraDomain['icon'], typeof BrainCircuit> = {
  'brain-circuit': BrainCircuit,
  factory: Factory,
  stethoscope: Stethoscope,
  sprout: Sprout,
  'graduation-cap': GraduationCap,
  truck: Truck,
  leaf: Leaf,
  'monitor-smartphone': MonitorSmartphone,
  'heart-handshake': HeartHandshake,
  shapes: Shapes,
};

const OBJECTIVE_ICONS: Record<string, typeof Presentation> = {
  platform: Presentation,
  thinking: Lightbulb,
  ecosystem: Handshake,
};

const EVALUATION_ICONS: Record<string, typeof Lightbulb> = {
  innovation: Lightbulb,
  relevance: Target,
  feasibility: Wrench,
  business: TrendingUp,
  presentation: Presentation,
};

const OVERVIEW_STATS = [
  { id: 'days', label: 'Event Days', value: 2 },
  { id: 'stages', label: 'Journey Stages', value: thuliraJourney.length },
  { id: 'domains', label: 'Innovation Domains', value: thuliraDomains.length },
  { id: 'criteria', label: 'Evaluation Criteria', value: thuliraEvaluationCriteria.length },
];

function OverviewStat({ label, value }: { label: string; value: number }) {
  const { ref, value: animated } = useCountUp(value);
  return (
    <div ref={ref} className="flex flex-col items-center gap-1 border border-gold/20 bg-navy-deep/60 px-6 py-5 text-center">
      <span className="font-heading text-3xl font-bold text-gold sm:text-4xl">{animated}</span>
      <span className="font-body text-[11px] font-semibold uppercase tracking-widest text-beige/70">{label}</span>
    </div>
  );
}

export default function Thulira() {
  const aboutParallaxRef = useParallax<HTMLDivElement>(30);

  return (
    <div className="relative">
      {/* Hero */}
      <section className="relative overflow-hidden bg-navy-deep py-32 text-center sm:py-44">
        <motion.img
          src={ancientFuturisticPanorama}
          alt=""
          aria-hidden="true"
          initial={{ opacity: 0, scale: 1.15 }}
          animate={{ opacity: 1, scale: [1.15, 1, 1.06, 1] }}
          transition={{
            opacity: { duration: 2, ease: 'easeOut' },
            scale: { duration: 26, times: [0, 0.08, 0.54, 1], repeat: Infinity, ease: 'easeInOut' },
          }}
          className="pointer-events-none absolute inset-0 h-full w-full object-cover"
        />
        <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-navy-deep via-navy-deep/50 to-navy-deep/75" />
        <div className="absolute inset-0 bp-grid-bg opacity-30" />
        <div className="pointer-events-none absolute inset-x-0 bottom-0 flex justify-center text-gold/10">
          <TempleSilhouette className="h-40 w-40 sm:h-56 sm:w-56" strokeWidth={0.9} />
        </div>

        <div className="relative mx-auto flex max-w-4xl flex-col items-center gap-5 px-4 sm:px-6">
          <Breadcrumb items={[{ label: 'Home', path: '/' }, { label: 'Thulira' }]} tone="dark" />

          <div className="flex items-center justify-center gap-4 sm:gap-8">
            <motion.span
              initial={{ scaleX: 0, opacity: 0 }}
              animate={{ scaleX: 1, opacity: 1 }}
              transition={{ duration: 0.9, delay: 0.4, ease: 'easeOut' }}
              className="hidden h-px w-16 origin-right bg-gradient-to-l from-gold to-transparent sm:block sm:w-24 lg:w-32"
            />
            <motion.h1
              initial={{ opacity: 0, y: 24, scale: 0.92 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              transition={{ duration: 0.8, ease: 'easeOut' }}
              className="heading-glow-pulse text-shimmer-gold font-heading text-6xl font-extrabold uppercase tracking-wide sm:text-7xl lg:text-8xl"
            >
              Thulira
            </motion.h1>
            <motion.span
              initial={{ scaleX: 0, opacity: 0 }}
              animate={{ scaleX: 1, opacity: 1 }}
              transition={{ duration: 0.9, delay: 0.4, ease: 'easeOut' }}
              className="hidden h-px w-16 origin-left bg-gradient-to-r from-gold to-transparent sm:block sm:w-24 lg:w-32"
            />
          </div>

          <motion.p
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.5 }}
            className="font-body text-sm font-semibold uppercase tracking-[0.35em] text-beige/90 sm:text-base"
          >
            Student Startup Challenge
          </motion.p>

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.7 }}
          >
            <Divider />
          </motion.div>
        </div>
      </section>

      {/* Tagline strip */}
      <section className="relative overflow-hidden bg-navy-deep py-12">
        <div className="absolute inset-0 bp-grid-bg opacity-20" />
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.6 }}
          transition={{ duration: 0.6 }}
          className="relative mx-auto flex max-w-2xl flex-col items-center gap-4 px-4 text-center sm:px-6"
        >
          <p className="font-quote text-xl italic text-gold sm:text-2xl">
            &ldquo;Inspiring Ideas. Igniting Innovation.&rdquo;
          </p>
          <Divider />
          <p className="font-body text-xs font-semibold uppercase tracking-[0.3em] text-beige/70">
            Powered by Porikkalam · {SITE.college}, Coimbatore
          </p>
        </motion.div>

        {/* Heritage → Future narrative strip */}
        <div className="relative mx-auto mt-10 flex max-w-4xl flex-wrap items-center justify-center gap-x-2 gap-y-3 px-4 sm:px-6">
          {thuliraJourneyStrip.map((word, index) => (
            <span key={word} className="flex items-center gap-2">
              <motion.span
                initial={{ opacity: 0, y: 8 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.6 }}
                transition={{ duration: 0.4, delay: index * 0.1 }}
                className="font-body text-[11px] font-bold uppercase tracking-[0.2em] text-gold/90 sm:text-xs"
              >
                {word}
              </motion.span>
              {index < thuliraJourneyStrip.length - 1 && (
                <ChevronRight size={13} className="text-gold/35" />
              )}
            </span>
          ))}
        </div>
      </section>

      {/* About Thulira */}
      <section className="relative overflow-hidden bg-cream/95 py-24">
        <div className="absolute inset-0 bp-grid-bg opacity-30" />
        <div ref={aboutParallaxRef} className="pointer-events-none absolute inset-0 opacity-[0.06]">
          <img src={ancientEngineering} alt="" aria-hidden="true" className="h-full w-full object-cover" />
        </div>
        <div className="relative mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
          <SectionHeading eyebrow="About Thulira" title="Where Ideas Become Ventures" />
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.6 }}
            className="relative mt-12 flex flex-col gap-5 overflow-hidden border border-navy/10 bg-white/55 p-8 shadow-card sm:p-10"
          >
            <CornerOrnament corner="top-left" />
            <CornerOrnament corner="bottom-right" />
            <p className="font-body text-base leading-relaxed text-slate">
              THULIRA – Student Startup Challenge is a premier platform that brings together aspiring
              student entrepreneurs from diverse educational institutions to showcase innovative
              startup ideas, prototypes, and entrepreneurial solutions.
            </p>
            <p className="font-body text-base leading-relaxed text-slate">
              The event provides students with an opportunity to present their innovations before
              industry experts, academicians, and the startup ecosystem while receiving valuable
              insights and recognition.
            </p>
            <p className="font-body text-base leading-relaxed text-slate">
              THULIRA aims to cultivate creativity, problem-solving, and entrepreneurial thinking and
              inspire the next generation of student innovators.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Vision & Mission */}
      <section className="relative overflow-hidden bg-navy py-24">
        <div className="absolute inset-0 bp-grid-bg opacity-25" />
        <div className="relative mx-auto grid max-w-5xl grid-cols-1 gap-6 px-4 sm:grid-cols-2 sm:px-6 lg:px-8">
          {[
            { icon: Sparkles, title: 'Vision', text: 'To inspire students to innovate, embrace entrepreneurship, and transform ideas into impactful solutions.' },
            { icon: Flag, title: 'Mission', text: 'To provide a platform for students to showcase innovative startup ideas and foster entrepreneurial thinking.' },
          ].map((item, index) => (
            <motion.div
              key={item.title}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.4 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="flex flex-col gap-4 border border-gold/25 bg-navy-deep p-8 shadow-[inset_0_0_30px_-20px_rgba(212,175,55,0.5)]"
            >
              <item.icon className="text-gold" size={28} strokeWidth={1.5} />
              <h3 className="font-heading text-2xl font-semibold tracking-wide text-gold">{item.title}</h3>
              <p className="font-body text-sm leading-relaxed text-beige/80">{item.text}</p>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Objectives */}
      <section className="relative bg-cream/95 py-24">
        <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
          <SectionHeading eyebrow="Objectives" title="What Thulira Sets Out To Do" />
          <div className="mt-14 grid grid-cols-1 gap-6 sm:grid-cols-3">
            {thuliraObjectives.map((objective, index) => {
              const Icon = OBJECTIVE_ICONS[objective.id];
              return (
                <motion.div
                  key={objective.id}
                  initial={{ opacity: 0, y: 24 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, amount: 0.4 }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  whileHover={{ y: -6 }}
                  className="group relative flex flex-col items-center gap-4 overflow-hidden border border-brown/25 bg-white/60 p-8 text-center shadow-card transition-shadow duration-300 hover:shadow-[0_16px_36px_-14px_rgba(139,115,51,0.4)]"
                >
                  <CornerOrnament corner="top-left" variant="floral" size={36} opacity={0.3} />
                  <div className="flex h-16 w-16 items-center justify-center rounded-full border-2 border-brown/40 bg-cream text-brown transition-transform duration-300 group-hover:scale-110">
                    <Icon size={26} strokeWidth={1.5} />
                  </div>
                  <h3 className="font-heading text-lg font-semibold tracking-wide text-navy">{objective.title}</h3>
                  <p className="font-body text-sm leading-relaxed text-slate">{objective.description}</p>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Event Overview */}
      <section className="relative overflow-hidden bg-navy-deep py-24">
        <div className="absolute inset-0 bp-grid-bg opacity-20" />
        <div className="relative mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
          <SectionHeading eyebrow="Event Overview" title="Two Days. One Startup Ecosystem." tone="dark" />
          <div className="mx-auto mt-10 flex max-w-2xl flex-col gap-5">
            <p className="font-body text-base leading-relaxed text-beige/85">
              THULIRA is a two-day startup exhibition and competition that provides a platform for
              students to showcase innovative startup ideas. It is open to students from Government
              College of Technology (GCT) and other educational institutions.
            </p>
            <p className="font-body text-base leading-relaxed text-beige/85">
              The process begins with an open call for applications, followed by preliminary
              screening to shortlist promising startup ideas. Selected teams are invited to exhibit
              their ideas, present their innovations, interact with industry experts, entrepreneurs,
              academicians and visitors, and engage in meaningful discussions.
            </p>
            <p className="font-body text-base leading-relaxed text-beige/85">
              The exhibition promotes knowledge sharing, collaboration and entrepreneurial learning.
            </p>
          </div>

          <div className="mt-14 grid grid-cols-2 gap-4 sm:grid-cols-4">
            {OVERVIEW_STATS.map((stat) => (
              <OverviewStat key={stat.id} label={stat.label} value={stat.value} />
            ))}
          </div>
        </div>
      </section>

      {/* Participant Journey */}
      <section className="relative overflow-hidden bg-navy py-24">
        <div className="absolute inset-0 bp-grid-bg opacity-20" />
        <div className="relative mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
          <SectionHeading
            eyebrow="Participant Journey"
            title="Six Stages, One Path To The Stage"
            tone="dark"
          />
          <div className="mt-16">
            <ParticipantJourney />
          </div>
        </div>
      </section>

      {/* Application & Registration */}
      <section className="relative bg-cream/95 py-24">
        <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
          <SectionHeading eyebrow="Application & Registration" title="Submit Your Startup Idea" />
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.4 }}
            transition={{ duration: 0.5 }}
            className="relative mt-12 flex flex-col items-center gap-5 overflow-hidden border border-gold/30 bg-white/40 p-12 text-center"
          >
            <CornerOrnament corner="top-left" />
            <CornerOrnament corner="bottom-right" />
            <Lightbulb size={36} className="text-brown" />
            <h3 className="font-heading text-3xl font-semibold tracking-wide text-navy">
              Apply For Thulira
            </h3>
            <p className="max-w-md font-body text-sm text-slate">
              Participation begins with an online application. Submit your startup idea through the
              prescribed form within the specified timeline — all applications undergo preliminary
              screening before shortlisted teams are invited to the startup exhibition.
            </p>
            <div className="flex flex-wrap items-center justify-center gap-3">
              {thuliraApplicationReview.map((item) => (
                <Badge key={item} variant="outline">
                  {item}
                </Badge>
              ))}
            </div>
            <Button to="/register" variant="primary" size="lg" icon={<ArrowRight size={16} />}>
              Apply Now
            </Button>
          </motion.div>
        </div>
      </section>

      {/* Innovation Domains */}
      <section className="relative overflow-hidden bg-navy-deep py-24">
        <div className="absolute inset-0 bp-grid-bg opacity-20" />
        <div className="relative mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
          <SectionHeading
            eyebrow="Innovation Domains"
            title="Open To Every Discipline"
            subtitle="THULIRA welcomes startup ideas from all disciplines — innovation is never restricted to a single domain."
            tone="dark"
          />
          <div className="mt-14 grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-5">
            {thuliraDomains.map((domain, index) => {
              const Icon = DOMAIN_ICONS[domain.icon];
              return (
                <motion.div
                  key={domain.id}
                  initial={{ opacity: 0, y: 16 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, amount: 0.4 }}
                  transition={{ duration: 0.4, delay: index * 0.05 }}
                  whileHover={{ y: -4, borderColor: 'rgba(212,175,55,0.7)' }}
                  className="flex flex-col items-center gap-3 border border-gold/20 bg-navy p-5 text-center transition-colors duration-300"
                >
                  <div className="flex h-12 w-12 items-center justify-center rounded-full border border-gold/40 text-gold">
                    <Icon size={20} strokeWidth={1.5} />
                  </div>
                  <span className="font-body text-xs font-semibold uppercase tracking-wide text-beige/85">
                    {domain.label}
                  </span>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Startup Exhibition */}
      <section className="relative bg-cream/95 py-24">
        <div className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8">
          <SectionHeading eyebrow="Startup Exhibition" title="The Heart Of Thulira" />
          <p className="mx-auto mt-8 max-w-2xl text-center font-body text-base leading-relaxed text-slate">
            The Startup Exhibition is the highlight of THULIRA – Student Startup Challenge. Shortlisted
            participants showcase their startup ideas through dedicated exhibition stalls on both days
            of the event.
          </p>
          <div className="mt-12 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {thuliraExhibitionOpportunities.map((item, index) => (
              <motion.div
                key={item}
                initial={{ opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.4 }}
                transition={{ duration: 0.4, delay: index * 0.06 }}
                className="flex items-center gap-3 border border-navy/15 bg-white/50 p-5"
              >
                <CheckCircle2 size={18} className="shrink-0 text-brown" />
                <span className="font-body text-sm text-navy">{item}</span>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Evaluation Process */}
      <section className="relative overflow-hidden bg-navy py-24">
        <div className="absolute inset-0 bp-grid-bg opacity-20" />
        <div className="relative mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
          <SectionHeading eyebrow="Evaluation Process" title="How Ideas Are Judged" tone="dark" />
          <div className="mt-14 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-5">
            {thuliraEvaluationCriteria.map((criterion, index) => {
              const Icon = EVALUATION_ICONS[criterion.id];
              return (
                <motion.div
                  key={criterion.id}
                  initial={{ opacity: 0, y: 24 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, amount: 0.4 }}
                  transition={{ duration: 0.5, delay: index * 0.08 }}
                  whileHover={{
                    y: -6,
                    boxShadow: '0 12px 32px -10px rgba(212,175,55,0.4)',
                    borderColor: 'rgba(212,175,55,0.7)',
                  }}
                  className="relative flex flex-col gap-4 overflow-hidden border border-gold/25 bg-navy-deep p-6 shadow-card transition-colors duration-300"
                >
                  <CornerOrnament corner="top-left" size={28} opacity={0.3} />
                  <Icon size={26} className="text-gold" strokeWidth={1.5} />
                  <h4 className="font-heading text-base font-semibold uppercase tracking-wide text-cream">
                    {criterion.title}
                  </h4>
                  <p className="font-body text-xs leading-relaxed text-beige/75">{criterion.description}</p>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Awards & Recognition */}
      <section className="relative overflow-hidden bg-cream/95 py-24">
        <div className="absolute inset-0 bp-grid-bg opacity-25" />
        <div className="relative mx-auto max-w-4xl px-4 text-center sm:px-6 lg:px-8">
          <SectionHeading eyebrow="Awards & Recognition" title="Celebrating Bold Ideas" />
          <p className="mx-auto mt-8 max-w-2xl font-body text-base leading-relaxed text-slate">
            The most promising startup ideas will be recognized based on their overall performance in
            the evaluation process. Awards recognize outstanding startup ideas based on:
          </p>
          <div className="mt-6 flex flex-wrap items-center justify-center gap-3">
            {thuliraAwardsCriteria.map((item) => (
              <Badge key={item} variant="gold">
                {item}
              </Badge>
            ))}
          </div>

          <motion.div
            initial={{ opacity: 0, scale: 0.96 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true, amount: 0.5 }}
            transition={{ duration: 0.6 }}
            className="relative mx-auto mt-14 flex max-w-xl flex-col items-center gap-3 overflow-hidden border-2 border-gold bg-navy-deep px-8 py-10 text-cream shadow-[0_0_36px_-8px_rgba(212,175,55,0.5)]"
          >
            <CornerOrnament corner="top-left" />
            <CornerOrnament corner="bottom-right" />
            <Award size={32} className="text-gold" strokeWidth={1.5} />
            <p className="font-heading text-lg font-bold uppercase tracking-wide text-gold sm:text-xl">
              All Participants Will Receive A Certificate Of Participation
            </p>
          </motion.div>
        </div>
      </section>
    </div>
  );
}
