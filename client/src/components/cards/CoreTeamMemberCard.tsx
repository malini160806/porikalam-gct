import { motion } from 'framer-motion';
import { FaLinkedinIn } from 'react-icons/fa';
import type { CoreTeamMember } from '@/data/types';

type CoreTeamMemberCardProps = {
  member: CoreTeamMember;
  index?: number;
};

function getInitials(name: string): string {
  return name
    .split(' ')
    .filter(Boolean)
    .slice(0, 2)
    .map((part) => part[0])
    .join('')
    .toUpperCase();
}

export function CoreTeamMemberCard({ member, index = 0 }: CoreTeamMemberCardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.4 }}
      transition={{ duration: 0.45, delay: index * 0.07 }}
      whileHover={{
        y: -6,
        scale: 1.02,
        boxShadow: '0 14px 32px -10px rgba(212,175,55,0.45), 0 8px 22px -10px rgba(61,90,117,0.3)',
      }}
      className="group relative flex flex-col items-center gap-3 overflow-hidden border border-gold/30 bg-cream p-6 text-center shadow-card backdrop-blur-sm transition-colors duration-300 hover:border-gold"
    >
      <div className="absolute inset-0 bp-grid-bg opacity-[0.08]" />

      <motion.div
        className="relative flex h-20 w-20 items-center justify-center overflow-hidden rounded-full border-2 border-gold bg-navy font-heading text-xl text-gold"
        whileHover={{ scale: 1.08 }}
        transition={{ duration: 0.3 }}
      >
        {member.photo ? (
          <img src={member.photo} alt={member.name} className="h-full w-full object-cover" />
        ) : (
          getInitials(member.name)
        )}
      </motion.div>

      <div className="relative">
        <h4 className="font-heading text-lg font-semibold tracking-wide text-navy">{member.name}</h4>
        <p className="mt-1 font-body text-xs font-semibold uppercase tracking-wider text-brown">
          {member.role}
        </p>
        <p className="mt-0.5 font-body text-xs text-slate">{member.department}</p>
      </div>

      {member.linkedin && (
        <a
          href={member.linkedin}
          target="_blank"
          rel="noreferrer"
          aria-label={`${member.name} on LinkedIn`}
          className="relative flex h-8 w-8 items-center justify-center rounded-full border border-navy/20 text-navy/60 transition-colors hover:border-gold hover:text-brown"
        >
          <FaLinkedinIn size={14} />
        </a>
      )}
    </motion.div>
  );
}
