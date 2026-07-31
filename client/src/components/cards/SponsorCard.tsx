import { motion } from 'framer-motion';
import type { Sponsor } from '@/data/types';

type SponsorCardProps = {
  sponsor: Sponsor;
  index?: number;
};

export function SponsorCard({ sponsor, index = 0 }: SponsorCardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.94 }}
      whileInView={{ opacity: 1, scale: 1 }}
      viewport={{ once: true, amount: 0.4 }}
      transition={{ duration: 0.4, delay: index * 0.05 }}
      whileHover={{ y: -4, borderColor: '#d4af37' }}
      className="flex aspect-[3/2] flex-col items-center justify-center gap-2 border border-navy/20 bg-cream/70 px-4 text-center transition-colors"
    >
      <div className="flex h-12 w-12 items-center justify-center rounded-full border border-brown/50 font-heading text-lg text-brown">
        {sponsor.initials}
      </div>
      <span className="font-body text-xs font-semibold uppercase tracking-wide text-navy">
        {sponsor.name}
      </span>
    </motion.div>
  );
}
