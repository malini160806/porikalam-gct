import { Link } from 'react-router-dom';
import logoImage from '@/assets/porikkalam-logo.png';

type LogoProps = {
  compact?: boolean;
};

export function Logo({ compact = false }: LogoProps) {
  return (
    <Link to="/" className="flex shrink-0 items-center">
      <img
        src={logoImage}
        alt="Porikkalam 2026"
        className={compact ? 'h-10 w-auto' : 'h-11 w-auto sm:h-12 md:h-14 lg:h-16'}
      />
    </Link>
  );
}
