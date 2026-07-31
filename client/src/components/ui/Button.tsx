import type { ButtonHTMLAttributes, AnchorHTMLAttributes, ReactNode, MouseEventHandler } from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';

type Variant = 'primary' | 'secondary' | 'outline' | 'ghost' | 'text';
type Size = 'sm' | 'md' | 'lg';

const variantClasses: Record<Variant, string> = {
  primary:
    'bg-gold text-navy border border-gold hover:bg-gold-light shadow-[0_2px_0_0_rgba(139,115,51,0.6)]',
  secondary: 'bg-navy text-cream border border-gold/70 hover:bg-slate',
  outline: 'bg-transparent text-navy border border-navy/60 hover:border-gold hover:text-brown',
  ghost: 'bg-transparent text-navy border border-transparent hover:bg-navy/5',
  text: 'bg-transparent text-brown border-none underline-offset-4 hover:underline px-0',
};

const sizeClasses: Record<Size, string> = {
  sm: 'text-xs px-4 py-2 tracking-wide',
  md: 'text-sm px-6 py-3 tracking-wide',
  lg: 'text-base px-8 py-4 tracking-wider',
};

const base =
  'inline-flex items-center justify-center gap-2 font-body font-semibold uppercase transition-colors duration-200 disabled:opacity-40 disabled:pointer-events-none';

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
  const classes = `${base} ${variantClasses[variant]} ${variant !== 'text' ? sizeClasses[size] : ''} ${className}`;

  const content = (
    <>
      {children}
      {icon}
    </>
  );

  return (
    <motion.div whileHover={{ y: -2 }} whileTap={{ y: 0 }} transition={{ duration: 0.15 }} className="inline-block">
      {to ? (
        <Link to={to} id={id} className={classes} onClick={onClick}>
          {content}
        </Link>
      ) : href ? (
        <a href={href} id={id} target={target} rel={rel} className={classes} onClick={onClick}>
          {content}
        </a>
      ) : (
        <button type={type ?? 'button'} id={id} disabled={disabled} className={classes} onClick={onClick}>
          {content}
        </button>
      )}
    </motion.div>
  );
}
