import { Link } from 'react-router-dom';
import { TempleSilhouette } from './TempleSilhouette';

type LogoProps = {
  tone?: 'light' | 'dark';
  compact?: boolean;
};

export function Logo({ tone = 'dark', compact = false }: LogoProps) {
  const textColor = tone === 'dark' ? 'text-cream' : 'text-navy';

  return (
    <Link to="/" className="flex items-center gap-3 shrink-0">
      <span className="relative flex h-11 w-11 items-center justify-center rounded-full border-2 border-gold text-gold">
        <TempleSilhouette className="h-6 w-6" strokeWidth={2.2} />
      </span>
      {!compact && (
        <span className="flex flex-col leading-none">
          <span className={`font-heading text-lg font-bold tracking-wide ${textColor}`}>
            PORIKKALAM
          </span>
          <span className="font-body text-[10px] font-semibold uppercase tracking-[0.25em] text-gold">
            2026
          </span>
        </span>
      )}
    </Link>
  );
}
