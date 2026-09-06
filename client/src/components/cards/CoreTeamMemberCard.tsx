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
      whileHover={{ y: -6 }}
      className="group relative overflow-hidden border border-gold/30 shadow-card transition-colors duration-300 hover:border-gold"
    >
      <div className="relative aspect-[3/4] w-full overflow-hidden bg-navy">
        {member.photo ? (
          <img
            src={member.photo}
            alt={member.name}
            className="h-full w-full object-cover object-center transition-transform duration-500 group-hover:scale-105"
          />
        ) : (
          <div className="flex h-full w-full items-center justify-center font-heading text-5xl text-gold/70">
            {getInitials(member.name)}
          </div>
        )}

        {/* Gradient scrim so the name/role stay legible over any photo */}
        <div className="pointer-events-none absolute inset-x-0 bottom-0 h-2/3 bg-gradient-to-t from-navy-deep via-navy-deep/60 to-transparent" />

        {member.linkedin && (
          <a
            href={member.linkedin}
            target="_blank"
            rel="noreferrer"
            aria-label={`${member.name} on LinkedIn`}
            className="absolute right-3 top-3 flex h-8 w-8 items-center justify-center rounded-full border border-gold/50 bg-navy-deep/70 text-cream backdrop-blur-sm transition-colors hover:border-gold hover:bg-gold hover:text-navy"
          >
            <FaLinkedinIn size={13} />
          </a>
        )}

        <div className="absolute inset-x-0 bottom-0 p-4">
          <h4 className="truncate font-heading text-lg font-bold tracking-wide text-cream">
            {member.name}
          </h4>
          {member.role && (
            <p className="mt-1 font-body text-[11px] font-bold uppercase leading-snug tracking-wide text-gold">
              {member.role}
            </p>
          )}
        </div>
      </div>
    </motion.div>
  );
}
