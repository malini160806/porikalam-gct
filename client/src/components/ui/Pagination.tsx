import { ChevronLeft, ChevronRight } from 'lucide-react';

type PaginationProps = {
  page: number;
  totalPages: number;
  onChange: (page: number) => void;
  className?: string;
};

export function Pagination({ page, totalPages, onChange, className = '' }: PaginationProps) {
  const pages = Array.from({ length: totalPages }, (_, i) => i + 1);

  return (
    <div className={`flex items-center justify-center gap-2 ${className}`}>
      <button
        type="button"
        onClick={() => onChange(Math.max(1, page - 1))}
        disabled={page === 1}
        aria-label="Previous page"
        className="flex h-9 w-9 items-center justify-center border border-navy/25 text-navy disabled:opacity-30 hover:border-gold hover:text-brown transition-colors"
      >
        <ChevronLeft size={16} />
      </button>
      {pages.map((p) => (
        <button
          key={p}
          type="button"
          onClick={() => onChange(p)}
          aria-current={p === page ? 'page' : undefined}
          className={`flex h-9 w-9 items-center justify-center border font-body text-sm transition-colors ${
            p === page ? 'bg-gold text-navy border-gold' : 'border-navy/25 text-navy hover:border-gold hover:text-brown'
          }`}
        >
          {p}
        </button>
      ))}
      <button
        type="button"
        onClick={() => onChange(Math.min(totalPages, page + 1))}
        disabled={page === totalPages}
        aria-label="Next page"
        className="flex h-9 w-9 items-center justify-center border border-navy/25 text-navy disabled:opacity-30 hover:border-gold hover:text-brown transition-colors"
      >
        <ChevronRight size={16} />
      </button>
    </div>
  );
}
