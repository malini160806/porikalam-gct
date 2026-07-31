import { motion } from 'framer-motion';
import type { TeamMember } from '@/data/types';

type TeamCardProps = {
  member: TeamMember;
  index?: number;
};

export function TeamCard({ member, index = 0 }: TeamCardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.4 }}
      transition={{ duration: 0.45, delay: index * 0.05 }}
      whileHover={{ y: -5 }}
      className="flex flex-col items-center gap-3 border border-navy/15 bg-cream/70 p-6 text-center"
    >
      <div className="flex h-20 w-20 items-center justify-center rounded-full border-2 border-gold bg-navy font-heading text-xl text-gold">
        {member.initials}
      </div>
      <h4 className="font-heading text-base text-navy">{member.name}</h4>
      <p className="font-body text-xs font-semibold uppercase tracking-wider text-brown">{member.role}</p>
    </motion.div>
  );
}
