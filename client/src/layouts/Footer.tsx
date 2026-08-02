import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Mail, MapPin, Phone, Send } from 'lucide-react';
import { Logo } from '@/components/common/Logo';
import { SocialIcons } from '@/components/ui/SocialIcons';
import { TempleSilhouette } from '@/components/common/TempleSilhouette';
import { SITE, FOOTER_LINKS } from '@/constants/site';
import rosetteSeal from '@/assets/heritage/rosette-seal.png';

export function Footer() {
  return (
    <footer className="relative overflow-hidden border-t border-gold/25 navy-paper text-cream">
      <div className="pointer-events-none absolute inset-x-0 bottom-0 flex justify-center opacity-[0.08]">
        <TempleSilhouette className="h-64 w-64 sm:h-80 sm:w-80" strokeWidth={1} />
      </div>

      <motion.div
        initial={{ opacity: 0, y: 24 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.2 }}
        transition={{ duration: 0.6, ease: 'easeOut' }}
        className="relative mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8"
      >
        <div className="grid grid-cols-1 gap-12 sm:grid-cols-2 lg:grid-cols-6">
          <div className="flex flex-col gap-4 lg:col-span-2">
            <Logo />
            <p className="font-quote max-w-xs text-base italic leading-relaxed text-beige/80">
              {SITE.description}
            </p>
            <SocialIcons />
          </div>

          <FooterColumn title="Quick Links" links={FOOTER_LINKS.quickLinks} />
          <FooterColumn title="Events" links={FOOTER_LINKS.events} />
          <FooterColumn title="Community" links={FOOTER_LINKS.community} />
          <FooterColumn title="Support" links={FOOTER_LINKS.support} />
        </div>

        <div className="mt-12 grid grid-cols-1 gap-8 border-t border-gold/20 pt-10 sm:grid-cols-2">
          <div className="flex flex-col gap-2 font-body text-sm text-beige/80">
            <span className="flex items-center gap-2">
              <MapPin size={14} className="text-gold shrink-0" /> {SITE.college}, {SITE.location}
            </span>
            <span className="flex items-center gap-2">
              <Mail size={14} className="text-gold shrink-0" /> {SITE.email}
            </span>
            <span className="flex items-center gap-2">
              <Phone size={14} className="text-gold shrink-0" /> {SITE.phone}
            </span>
          </div>

          <div className="flex flex-col gap-3">
            <span className="font-heading text-sm font-semibold uppercase tracking-wider text-gold">
              Newsletter
            </span>
            <p className="font-body text-xs text-beige/70">Stay updated with the latest announcements.</p>
            <form
              className="flex items-stretch border border-gold/40"
              onSubmit={(e) => e.preventDefault()}
            >
              <input
                type="email"
                required
                placeholder="Enter your email"
                className="w-full bg-transparent px-4 py-2.5 font-body text-sm text-cream placeholder:text-beige/50 outline-none"
              />
              <button
                type="submit"
                aria-label="Subscribe"
                className="flex items-center justify-center bg-gold px-4 text-navy hover:bg-gold-light transition-colors"
              >
                <Send size={16} />
              </button>
            </form>
          </div>
        </div>

        <div className="mt-10 flex flex-col items-center gap-3 border-t border-gold/15 pt-6 text-center font-body text-xs text-beige/60 sm:flex-row sm:justify-between">
          <span>&copy; {SITE.year} Porikkalam. All Rights Reserved.</span>
          <span className="flex items-center gap-2">
            <img src={rosetteSeal} alt="" aria-hidden="true" className="h-6 w-6 opacity-80" />
            Designed with heritage &amp; precision by Team Porikkalam
          </span>
        </div>
      </motion.div>
    </footer>
  );
}

function FooterColumn({
  title,
  links,
}: {
  title: string;
  links: { label: string; path: string }[];
}) {
  return (
    <div className="flex flex-col gap-3">
      <span className="font-heading text-sm font-semibold uppercase tracking-wider text-gold">{title}</span>
      <ul className="flex flex-col gap-2">
        {links.map((link) => (
          <li key={link.label}>
            <Link
              to={link.path}
              className="font-body text-sm text-beige/75 hover:text-gold transition-colors duration-150"
            >
              {link.label}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}
