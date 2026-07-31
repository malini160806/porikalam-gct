import { motion } from 'framer-motion';
import { ArrowRight } from 'lucide-react';
import type { LucideIcon } from 'lucide-react';

type WorkshopCardProps = {
  icon: LucideIcon;
  title: string;
  description: string;
  href?: string;
  index?: number;
};

/** Compact category tile — mirrors the reference's Technical Events / Workshops / Exhibitions cards. */
export function WorkshopCard({ icon: Icon, title, description, href = '#', index = 0 }: WorkshopCardProps) {
  return (
    <motion.a
      href={href}
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.4 }}
      transition={{ duration: 0.45, delay: index * 0.08 }}
      whileHover={{ y: -5 }}
      className="group flex flex-col gap-4 border border-gold/25 bg-navy p-6 shadow-card"
    >
      <div className="flex h-12 w-12 items-center justify-center border border-gold/50 text-gold transition-colors duration-200 group-hover:bg-gold group-hover:text-navy">
        <Icon size={22} strokeWidth={1.5} />
      </div>
      <h3 className="font-heading text-base uppercase tracking-wide text-cream">{title}</h3>
      <p className="font-body text-sm text-beige/75 leading-relaxed">{description}</p>
      <span className="mt-auto inline-flex items-center gap-2 font-body text-xs font-semibold uppercase tracking-widest text-gold group-hover:text-gold-light">
        Explore <ArrowRight size={13} />
      </span>
    </motion.a>
  );
}
