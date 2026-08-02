import { motion } from 'framer-motion';
import { Newspaper } from 'lucide-react';
import { PageHero } from '@/components/common/PageHero';
import { SectionHeading } from '@/components/ui/SectionHeading';
import { Badge } from '@/components/ui/Badge';
import { SocialIcons } from '@/components/ui/SocialIcons';
import { mediaItems } from '@/data/media';

export default function Media() {
  return (
    <>
      <PageHero title="Media" subtitle="Press releases, news, and coverage of Porikkalam 2026." />

      <section className="bg-cream py-24">
        <div className="mx-auto max-w-3xl px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col gap-6">
            {mediaItems.map((item, index) => (
              <motion.article
                key={item.id}
                initial={{ opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.4 }}
                transition={{ duration: 0.4, delay: index * 0.08 }}
                className="flex flex-col gap-2 border border-navy/15 bg-white/40 p-6"
              >
                <div className="flex items-center gap-3">
                  <Newspaper size={16} className="text-gold" />
                  <Badge variant="outline">{item.type === 'press' ? 'Press Release' : 'News'}</Badge>
                  <span className="font-body text-xs text-slate/70">
                    {new Date(item.date).toLocaleDateString(undefined, {
                      day: 'numeric',
                      month: 'short',
                      year: 'numeric',
                    })}
                  </span>
                </div>
                <h3 className="font-heading text-xl font-semibold tracking-wide text-navy">{item.title}</h3>
                <p className="font-body text-sm text-slate leading-relaxed">{item.summary}</p>
              </motion.article>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-navy py-24">
        <div className="mx-auto flex max-w-3xl flex-col items-center gap-6 px-4 text-center sm:px-6 lg:px-8">
          <SectionHeading eyebrow="Media Kit" title="Follow & Download" tone="dark" />
          <p className="max-w-md font-body text-sm text-beige/80">
            A downloadable media kit with logos, brand assets, and press photography will be available
            here closer to the event.
          </p>
          <Badge variant="outline">Coming Soon</Badge>
          <SocialIcons tone="dark" />
        </div>
      </section>
    </>
  );
}
