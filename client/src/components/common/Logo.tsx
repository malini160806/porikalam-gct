import { Link } from 'react-router-dom';
import gctLogo from '@/assets/partners/gct-logo.png';
import dicLogo from '@/assets/partners/DIC.png';

type LogoProps = {
  compact?: boolean;
  /** Shows only the DCKAP Incubation Center logo, without the GCT logo or divider — used in the admin panel. */
  dckapOnly?: boolean;
};

export function Logo({ compact = false, dckapOnly = false }: LogoProps) {
  if (dckapOnly) {
    return (
      <Link to="/" className="flex shrink-0 items-center">
        <img src={dicLogo} alt="DCKAP Incubation Center" className="h-14 w-auto object-contain" />
      </Link>
    );
  }

  return (
    <Link
      to="/"
      className="flex shrink-0 items-center gap-4"
    >
      {/* GCT Logo */}
      <img
        src={gctLogo}
        alt="Government College of Technology"
        className={
          compact
            ? 'h-18 w-auto object-contain'
            : 'h-1 w-auto object-contain sm:h-18 md:h-20 lg:h-20'
        }
      />
         {/* Divider */}
      <span
        aria-hidden="true"
        className="h-12 w-px bg-gold/60 sm:h-14 md:h-16"
      />

      {/* DIC Logo */}
      <img
        src={dicLogo}
        alt="DIC Logo"
        className={
          compact
            ? 'h-14 w-auto object-contain'
            : 'h-16 w-auto object-contain sm:h-18 md:h-20 lg:h-20'
        }
      />
    </Link>
  );
}