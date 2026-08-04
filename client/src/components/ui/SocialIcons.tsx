import { Mail } from 'lucide-react';
import { FaInstagram, FaLinkedinIn, FaWhatsapp, FaFacebookF } from 'react-icons/fa';
import { FaXTwitter } from 'react-icons/fa6';
import type { ComponentType } from 'react';
import { motion } from 'framer-motion';
import { SOCIAL_LINKS } from '@/constants/site';

const ICONS: Record<string, ComponentType<{ size?: number }>> = {
  instagram: FaInstagram,
  linkedin: FaLinkedinIn,
  x: FaXTwitter,
  whatsapp: FaWhatsapp,
  facebook: FaFacebookF,
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
          <motion.a
            key={social.label}
            href={social.href}
            target="_blank"
            rel="noreferrer"
            aria-label={social.label}
            whileHover={{ scale: 1.15, y: -2 }}
            whileTap={{ scale: 0.95 }}
            className={`flex h-10 w-10 items-center justify-center rounded-full border transition-colors duration-150 ${ring}`}
          >
            <Icon size={15} />
          </motion.a>
        );
      })}
    </div>
  );
}
