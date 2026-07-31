import type { ReactNode } from 'react';

type BadgeVariant = 'gold' | 'navy' | 'outline';

type BadgeProps = {
  children: ReactNode;
  variant?: BadgeVariant;
  className?: string;
};

const variantClasses: Record<BadgeVariant, string> = {
  gold: 'bg-beige text-brown border border-brown/40',
  navy: 'bg-navy text-gold border border-gold/50',
  outline: 'bg-transparent text-navy border border-navy/40',
};

export function Badge({ children, variant = 'gold', className = '' }: BadgeProps) {
  return (
    <span
      className={`inline-flex items-center rounded-full px-3 py-1 text-[11px] font-body font-semibold uppercase tracking-wider ${variantClasses[variant]} ${className}`}
    >
      {children}
    </span>
  );
}
