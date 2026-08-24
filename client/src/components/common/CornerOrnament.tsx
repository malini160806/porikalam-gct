import scrollOrnament from '@/assets/heritage/corner-ornament-scroll.webp';
import floralOrnament from '@/assets/heritage/corner-ornament-floral.webp';

type CornerOrnamentProps = {
  corner?: 'top-left' | 'top-right' | 'bottom-left' | 'bottom-right';
  variant?: 'scroll' | 'floral';
  className?: string;
  /** Pixel size override. Uses inline style so it reliably wins over the default size classes. */
  size?: number;
  opacity?: number;
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

/**
 * Gold scrollwork flourish for framing premium moments (certificates, success states, feature CTAs).
 *
 * The default size is deliberately modest: the source art fills almost its entire square canvas
 * (near-zero built-in margin), so at a large render size it reaches well past a card's own padding
 * and into the content. Sizing it to roughly match the padding used on a typical `p-8 sm:p-10` card
 * keeps it inside the corner instead of bleeding onto the text. Callers with tighter or looser
 * padding should pass an explicit `size` scaled the same way, rather than nudging position with
 * margins/transforms.
 *
 * Consumers must also wrap their actual content in its own `relative z-10` (or higher) wrapper —
 * this component intentionally does not set a z-index itself, since a plain `position: absolute`
 * image already paints above static in-flow text by default. Every usage in this codebase follows
 * that pattern; see Team.tsx or CertificateTemplate.tsx for the reference shape.
 */
export function CornerOrnament({ corner = 'top-left', variant = 'scroll', className = '', size, opacity }: CornerOrnamentProps) {
  return (
    <img
      src={variantSrc[variant]}
      alt=""
      aria-hidden="true"
      className={`pointer-events-none absolute z-0 ${size ? '' : 'h-8 w-8 sm:h-10 sm:w-10'} ${opacity ? '' : 'opacity-70'} ${positionClasses[corner]} ${className}`}
      style={size ? { width: size, height: size, opacity } : undefined}
    />
  );
}
