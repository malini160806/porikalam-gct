import { motion } from 'framer-motion';
import { PageHero } from '@/components/common/PageHero';
import { SectionHeading } from '@/components/ui/SectionHeading';
import { partners, PARTNER_CATEGORY_LABELS } from '@/data/partners';
import type { PartnerOrg } from '@/data/types';

const categoryOrder: PartnerOrg['category'][] = ['industry', 'institutional', 'community'];

export default function Partners() {
  return (
    <>
      <PageHero title="Partners" subtitle="The organizations collaborating with us to make Porikkalam possible." />

      <section className="bg-cream py-24">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col gap-16">
            {categoryOrder.map((category) => {
              const group = partners.filter((p) => p.category === category);
              if (group.length === 0) return null;
              return (
                <div key={category}>
                  <SectionHeading eyebrow="Partnership" title={PARTNER_CATEGORY_LABELS[category]} />
                  <div className="mt-10 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
                    {group.map((partner, index) => (
                      <motion.div
                        key={partner.id}
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true, amount: 0.4 }}
                        transition={{ duration: 0.45, delay: index * 0.06 }}
                        whileHover={{ y: -4 }}
                        className="flex items-center gap-4 border border-navy/20 bg-white/40 p-5"
                      >
                        <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full border border-brown/50 font-heading text-lg text-brown">
                          {partner.initials}
                        </div>
                        <div>
                          <h4 className="font-heading text-base font-semibold tracking-wide text-navy">
                            {partner.name}
                          </h4>
                          <p className="font-body text-xs text-slate">{partner.description}</p>
                        </div>
                      </motion.div>
                    ))}
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>
    </>
  );
}
