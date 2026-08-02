import { Link } from 'react-router-dom';
import logo from '@/assets/logo.png';

type LogoProps = {
  tone?: 'light' | 'dark';
  compact?: boolean;
};

export function Logo({ compact = false }: LogoProps) {
  return (
    <Link to="/" className="flex items-center shrink-0">
      <img
        src={logo}
        alt="Porikkalam"
        className={compact ? 'h-10 w-auto' : 'h-14 w-auto'}
      />
    </Link>
  );
}
