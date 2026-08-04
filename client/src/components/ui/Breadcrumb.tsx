import { Link } from 'react-router-dom';
import { ChevronRight } from 'lucide-react';

type Crumb = {
  label: string;
  path?: string;
};

type BreadcrumbProps = {
  items: Crumb[];
  className?: string;
  tone?: 'dark' | 'light';
};

export function Breadcrumb({ items, className = '', tone = 'dark' }: BreadcrumbProps) {
  const inactive = tone === 'light' ? 'text-slate hover:text-brown' : 'text-beige/80 hover:text-gold';
  const active = tone === 'light' ? 'text-brown' : 'text-gold';
  const chevron = tone === 'light' ? 'text-slate/50' : 'text-beige/50';

  return (
    <nav aria-label="Breadcrumb" className={`flex items-center gap-2 font-body text-xs uppercase tracking-wider ${className}`}>
      {items.map((item, index) => {
        const isLast = index === items.length - 1;
        return (
          <span key={`${item.label}-${index}`} className="flex items-center gap-2">
            {item.path && !isLast ? (
              <Link to={item.path} className={`transition-colors ${inactive}`}>
                {item.label}
              </Link>
            ) : (
              <span className={isLast ? active : inactive}>{item.label}</span>
            )}
            {!isLast && <ChevronRight size={12} className={chevron} />}
          </span>
        );
      })}
    </nav>
  );
}
