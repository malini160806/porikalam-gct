import { Link } from 'react-router-dom';
import { ChevronRight } from 'lucide-react';

type Crumb = {
  label: string;
  path?: string;
};

type BreadcrumbProps = {
  items: Crumb[];
  className?: string;
};

export function Breadcrumb({ items, className = '' }: BreadcrumbProps) {
  return (
    <nav aria-label="Breadcrumb" className={`flex items-center gap-2 font-body text-xs uppercase tracking-wider ${className}`}>
      {items.map((item, index) => {
        const isLast = index === items.length - 1;
        return (
          <span key={`${item.label}-${index}`} className="flex items-center gap-2">
            {item.path && !isLast ? (
              <Link to={item.path} className="text-beige/80 hover:text-gold transition-colors">
                {item.label}
              </Link>
            ) : (
              <span className={isLast ? 'text-gold' : 'text-beige/80'}>{item.label}</span>
            )}
            {!isLast && <ChevronRight size={12} className="text-beige/50" />}
          </span>
        );
      })}
    </nav>
  );
}
