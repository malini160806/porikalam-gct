import { motion } from 'framer-motion';
import { Compass } from 'lucide-react';
import { PageHero } from '@/components/common/PageHero';
import { SectionHeading } from '@/components/ui/SectionHeading';
import { CornerOrnament } from '@/components/common/CornerOrnament';
import { CoreTeamMemberCard } from '@/components/cards/CoreTeamMemberCard';
import { TeamCard } from '@/components/cards/TeamCard';
import { coreTeamDomains, getMembersForDomain } from '@/data/coreTeam';
import { team } from '@/data/team';
import { getIcon } from '@/utils/icons';

const faculty = team.filter((m) => m.team === 'faculty');

export default function Team() {
  return (
    <>
      <PageHero
        title="Meet the Team Behind Porikkalam 2026"
        subtitle="The passionate team working together to organize one of GCT's flagship engineering symposiums."
      />

      <section className="relative overflow-hidden bg-cream py-24">
        <div className="absolute inset-0 bp-grid-bg opacity-30" />
        <div className="relative mx-auto flex max-w-6xl flex-col gap-20 px-4 sm:px-6 lg:px-8">
          {faculty.length > 0 && (
            <motion.div
              initial={{ opacity: 0, y: 32 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.2 }}
              transition={{ duration: 0.6, ease: 'easeOut' }}
              className="relative overflow-hidden border border-gold/30 bg-navy p-6 shadow-card sm:p-10"
            >
              <div className="absolute inset-0 bp-grid-bg opacity-[0.12]" />
              <CornerOrnament corner="top-left" className="opacity-60" />
              <CornerOrnament corner="bottom-right" className="opacity-60" />

              <div className="relative z-10 flex flex-col items-center gap-3 text-center">
                <div className="flex h-14 w-14 items-center justify-center rounded-full border border-gold/60 text-gold">
                  <Compass size={26} strokeWidth={1.5} />
                </div>
                <SectionHeading eyebrow="Guidance" title="Faculty In-Charge" tone="dark" />
              </div>

              <div className="relative z-10 mt-12 flex flex-wrap justify-center gap-6">
                {faculty.map((member, index) => (
                  <div key={member.id} className="w-full max-w-[15rem] sm:w-56">
                    <TeamCard member={member} index={index} />
                  </div>
                ))}
              </div>
            </motion.div>
          )}

          {coreTeamDomains
            .slice()
            .sort((a, b) => a.order - b.order)
            .map((domain, domainIndex) => {
              const members = getMembersForDomain(domain.id);
              const Icon = getIcon(domain.icon);
              const tone: 'light' | 'dark' = domainIndex % 2 === 0 ? 'light' : 'dark';

              return (
                <motion.div
                  key={domain.id}
                  initial={{ opacity: 0, y: 32 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, amount: 0.2 }}
                  transition={{ duration: 0.6, ease: 'easeOut' }}
                  className={`relative overflow-hidden border border-gold/30 p-6 shadow-card sm:p-10 ${
                    tone === 'dark' ? 'bg-navy' : 'bg-white/40'
                  }`}
                >
                  <div className="absolute inset-0 bp-grid-bg opacity-[0.12]" />
                  <CornerOrnament corner="top-left" className="opacity-60" />
                  <CornerOrnament corner="bottom-right" className="opacity-60" />

                  <div className="relative z-10 flex flex-col items-center gap-3 text-center">
                    <div
                      className={`flex h-14 w-14 items-center justify-center rounded-full border ${
                        tone === 'dark' ? 'border-gold/60 text-gold' : 'border-gold/50 text-brown'
                      }`}
                    >
                      <Icon size={26} strokeWidth={1.5} />
                    </div>
                    <SectionHeading
                      eyebrow={`Domain 0${domain.order}`}
                      title={domain.name}
                      tone={tone}
                    />
                  </div>

                  <div className="relative z-10 mt-12 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
                    {members.map((member, index) => (
                      <CoreTeamMemberCard key={member.id} member={member} index={index} />
                    ))}
                  </div>
                </motion.div>
              );
            })}
        </div>
      </section>
    </>
  );
}
