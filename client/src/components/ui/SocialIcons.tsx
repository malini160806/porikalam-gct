import { Mail } from 'lucide-react';
import { FaInstagram, FaLinkedinIn, FaYoutube, FaDiscord } from 'react-icons/fa';
import type { ComponentType } from 'react';
import { SOCIAL_LINKS } from '@/constants/site';

const ICONS: Record<string, ComponentType<{ size?: number }>> = {
  instagram: FaInstagram,
  linkedin: FaLinkedinIn,
  youtube: FaYoutube,
  discord: FaDiscord,
  mail: Mail,
};

type SocialIconsProps = {
  className?: string;
  tone?: 'light' | 'dark';
};

export function SocialIcons({ className = '', tone = 'dark' }: SocialIconsProps) {
  const ring = tone === 'dark' ? 'border-gold/40 text-gold hover:bg-gold hover:text-navy' : 'border-navy/30 text-navy hover:bg-navy hover:text-cream';

  return (
    <div className={`flex items-center gap-3 ${className}`}>
      {SOCIAL_LINKS.map((social) => {
        const Icon = ICONS[social.icon];
        return (
          <a
            key={social.label}
            href={social.href}
            target="_blank"
            rel="noreferrer"
            aria-label={social.label}
            className={`flex h-9 w-9 items-center justify-center rounded-full border transition-colors duration-150 ${ring}`}
          >
            <Icon size={15} />
          </a>
        );
      })}
    </div>
  );
}
