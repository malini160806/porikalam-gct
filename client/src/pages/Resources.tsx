import { motion } from 'framer-motion';
import { Download } from 'lucide-react';
import { PageHero } from '@/components/common/PageHero';
import { Badge } from '@/components/ui/Badge';
import { Button } from '@/components/ui/Button';
import { getIcon } from '@/utils/icons';
import { resources } from '@/data/resources';

export default function Resources() {
  return (
    <>
      <PageHero title="Resources" subtitle="Rulebooks, brochures, and downloads for participants." />

      <section className="bg-cream py-24">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {resources.map((resource, index) => {
              const Icon = getIcon(resource.icon);
              return (
                <motion.div
                  key={resource.id}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, amount: 0.4 }}
                  transition={{ duration: 0.45, delay: index * 0.08 }}
                  className="flex flex-col gap-4 border border-navy/15 bg-white/40 p-6"
                >
                  <div className="flex items-start justify-between gap-3">
                    <div className="flex h-12 w-12 items-center justify-center border border-gold/50 text-brown">
                      <Icon size={22} strokeWidth={1.5} />
                    </div>
                    {!resource.fileUrl && <Badge variant="outline">Coming Soon</Badge>}
                  </div>
                  <div>
                    <h3 className="font-heading text-lg font-semibold tracking-wide text-navy">{resource.title}</h3>
                    <p className="mt-1 font-body text-sm text-slate leading-relaxed">{resource.description}</p>
                  </div>
                  <Button
                    variant="outline"
                    size="sm"
                    icon={<Download size={14} />}
                    disabled={!resource.fileUrl}
                    href={resource.fileUrl ?? undefined}
                    className="mt-auto"
                  >
                    Download
                  </Button>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>
    </>
  );
}
