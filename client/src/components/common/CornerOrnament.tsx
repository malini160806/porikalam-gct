import scrollOrnament from '@/assets/heritage/corner-ornament-scroll.png';
import floralOrnament from '@/assets/heritage/corner-ornament-floral.png';

type CornerOrnamentProps = {
  corner?: 'top-left' | 'top-right' | 'bottom-left' | 'bottom-right';
  variant?: 'scroll' | 'floral';
  className?: string;
};

const positionClasses: Record<NonNullable<CornerOrnamentProps['corner']>, string> = {
  'top-left': 'left-0 top-0',
  'top-right': 'right-0 top-0 -scale-x-100',
  'bottom-left': 'left-0 bottom-0 -scale-y-100',
  'bottom-right': 'right-0 bottom-0 -scale-x-100 -scale-y-100',
};

const variantSrc: Record<NonNullable<CornerOrnamentProps['variant']>, string> = {
  scroll: scrollOrnament,
  floral: floralOrnament,
};

/** Gold scrollwork flourish for framing premium moments (certificates, success states, feature CTAs). */
export function CornerOrnament({ corner = 'top-left', variant = 'scroll', className = '' }: CornerOrnamentProps) {
  return (
    <img
      src={variantSrc[variant]}
      alt=""
      aria-hidden="true"
      className={`pointer-events-none absolute h-20 w-20 opacity-80 sm:h-28 sm:w-28 ${positionClasses[corner]} ${className}`}
    />
  );
}
