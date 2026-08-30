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
      initial={{ opacity: 0, y: 16 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.4 }}
      transition={{ duration: 0.4, delay: index * 0.05 }}
      whileHover={{
        y: -4,
        boxShadow: '0 10px 26px -10px rgba(212,175,55,0.4), 0 6px 16px -10px rgba(61,90,117,0.3)',
      }}
      className="group flex items-center gap-4 border border-gold/30 bg-white p-4 shadow-card transition-colors duration-300 hover:border-gold"
    >
      <motion.div
        className="flex h-14 w-14 shrink-0 items-center justify-center overflow-hidden rounded-full border-2 border-gold bg-navy font-heading text-base text-gold"
        whileHover={{ scale: 1.08 }}
        transition={{ duration: 0.3 }}
      >
        {member.photo ? (
          <img src={member.photo} alt={member.name} className="h-full w-full object-cover" />
        ) : (
          getInitials(member.name)
        )}
      </motion.div>

      <div className="min-w-0 flex-1">
        <h4 className="truncate font-heading text-base font-semibold tracking-wide text-navy">
          {member.name}
        </h4>
        {member.role && (
          <p className="truncate font-body text-xs font-medium uppercase tracking-wide text-brown/80">
            {member.role}
          </p>
        )}
      </div>

      {member.linkedin && (
        <a
          href={member.linkedin}
          target="_blank"
          rel="noreferrer"
          aria-label={`${member.name} on LinkedIn`}
          className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full border border-navy/20 text-navy/60 transition-colors hover:border-gold hover:text-brown"
        >
          <FaLinkedinIn size={13} />
        </a>
      )}
    </motion.div>
  );
}
