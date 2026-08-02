import { useState, type ButtonHTMLAttributes, type AnchorHTMLAttributes, type ReactNode, type MouseEvent, type MouseEventHandler } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { Link } from 'react-router-dom';

type Variant = 'primary' | 'secondary' | 'outline' | 'ghost' | 'text';
type Size = 'sm' | 'md' | 'lg';

const variantClasses: Record<Variant, string> = {
  primary:
    'bg-gold text-navy border border-gold hover:bg-gold-light shadow-[0_2px_0_0_rgba(139,115,51,0.6)] hover:shadow-[0_2px_16px_0_rgba(212,175,55,0.55)]',
  secondary: 'bg-navy text-cream border border-gold/70 hover:bg-slate hover:shadow-[0_0_16px_0_rgba(212,175,55,0.35)]',
  outline: 'bg-transparent text-navy border border-navy/60 hover:border-gold hover:text-brown hover:shadow-[0_0_12px_0_rgba(212,175,55,0.3)]',
  ghost: 'bg-transparent text-navy border border-transparent hover:bg-navy/5',
  text: 'bg-transparent text-brown border-none underline-offset-4 hover:underline px-0',
};

const sizeClasses: Record<Size, string> = {
  sm: 'text-xs px-4 py-2 tracking-wide',
  md: 'text-sm px-6 py-3 tracking-wide',
  lg: 'text-base px-8 py-4 tracking-wider',
};

const base =
  'relative overflow-hidden inline-flex items-center justify-center gap-2 font-body font-semibold uppercase transition-shadow duration-200 disabled:opacity-40 disabled:pointer-events-none';

type Ripple = { id: number; x: number; y: number; size: number };

type ButtonProps = {
  variant?: Variant;
  size?: Size;
  children: ReactNode;
  className?: string;
  icon?: ReactNode;
  to?: string;
  href?: string;
  type?: ButtonHTMLAttributes<HTMLButtonElement>['type'];
  disabled?: boolean;
  onClick?: MouseEventHandler;
  target?: AnchorHTMLAttributes<HTMLAnchorElement>['target'];
  rel?: string;
  id?: string;
};

export function Button({
  variant = 'primary',
  size = 'md',
  children,
  className = '',
  icon,
  to,
  href,
  type,
  disabled,
  onClick,
  target,
  rel,
  id,
}: ButtonProps) {
  const [ripples, setRipples] = useState<Ripple[]>([]);
  const classes = `${base} ${variantClasses[variant]} ${variant !== 'text' ? sizeClasses[size] : ''} ${className}`;

  function handleClick(event: MouseEvent<HTMLElement>) {
    const rect = event.currentTarget.getBoundingClientRect();
    const size = Math.max(rect.width, rect.height) * 1.4;
    const ripple: Ripple = {
      id: Date.now(),
      x: event.clientX - rect.left - size / 2,
      y: event.clientY - rect.top - size / 2,
      size,
    };
    setRipples((prev) => [...prev, ripple]);
    setTimeout(() => setRipples((prev) => prev.filter((r) => r.id !== ripple.id)), 600);
    onClick?.(event as MouseEvent<HTMLButtonElement>);
  }

  const rippleLayer = (
    <AnimatePresence>
      {ripples.map((ripple) => (
        <motion.span
          key={ripple.id}
          initial={{ opacity: 0.35, scale: 0 }}
          animate={{ opacity: 0, scale: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.6, ease: 'easeOut' }}
          className="pointer-events-none absolute rounded-full bg-current"
          style={{ left: ripple.x, top: ripple.y, width: ripple.size, height: ripple.size }}
        />
      ))}
    </AnimatePresence>
  );

  const content = (
    <>
      {children}
      {icon}
      {rippleLayer}
    </>
  );

  return (
    <motion.div whileHover={{ y: -2, scale: 1.02 }} whileTap={{ y: 0, scale: 0.98 }} transition={{ duration: 0.15 }} className="inline-block">
      {to ? (
        <Link to={to} id={id} className={classes} onClick={handleClick}>
          {content}
        </Link>
      ) : href ? (
        <a href={href} id={id} target={target} rel={rel} className={classes} onClick={handleClick}>
          {content}
        </a>
      ) : (
        <button type={type ?? 'button'} id={id} disabled={disabled} className={classes} onClick={handleClick}>
          {content}
        </button>
      )}
    </motion.div>
  );
}
