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
      whileHover={{
        y: -4,
        borderColor: '#d4af37',
        boxShadow: '0 10px 22px -10px rgba(212,175,55,0.35), 0 6px 16px -10px rgba(61,90,117,0.3)',
      }}
      title={sponsor.description}
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
