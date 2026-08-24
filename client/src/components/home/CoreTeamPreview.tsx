import { motion } from 'framer-motion';
import { SectionHeading } from '@/components/ui/SectionHeading';
import { Button } from '@/components/ui/Button';
import { coreTeamDomains, getMembersForDomain } from '@/data/coreTeam';
import { getIcon } from '@/routes/utils/icons';

export function CoreTeamPreview() {
  const domains = [...coreTeamDomains].sort((a, b) => a.order - b.order);

  return (
    <section className="relative overflow-hidden bg-navy py-24">
      <div className="absolute inset-0 bp-grid-bg opacity-25" />
      <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <SectionHeading
          eyebrow="The People Behind It"
          title="Meet Our Core Team"
          subtitle="Five domains, one mission — bringing Porikkalam 2026 to life."
          tone="dark"
        />

        <div className="mt-14 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {domains.map((domain, index) => {
            const members = getMembersForDomain(domain.id);
            const Icon = getIcon(domain.icon);

            return (
              <motion.div
                key={domain.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.4 }}
                transition={{ duration: 0.45, delay: index * 0.08 }}
                whileHover={{ y: -6, boxShadow: '0 12px 32px -8px rgba(212,175,55,0.4)' }}
                className="flex flex-col gap-4 border border-gold/30 bg-navy/60 p-6 shadow-card"
              >
                <div className="flex h-12 w-12 items-center justify-center border border-gold/50 text-gold">
                  <Icon size={22} strokeWidth={1.5} />
                </div>
                <h3 className="font-heading text-xl font-semibold tracking-wide text-cream">{domain.name}</h3>
                <p className="font-body text-sm leading-relaxed text-beige/75">
                  {members.map((m) => m.name).join(', ')}
                </p>
                <Button to="/team" variant="primary" size="sm" className="mt-auto w-fit">
                  View Team
                </Button>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
