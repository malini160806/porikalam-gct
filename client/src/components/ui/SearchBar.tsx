import { Search } from 'lucide-react';
import type { InputHTMLAttributes } from 'react';

type SearchBarProps = InputHTMLAttributes<HTMLInputElement> & {
  className?: string;
};

export function SearchBar({ className = '', ...rest }: SearchBarProps) {
  return (
    <div
      className={`flex items-center gap-2 border border-navy/25 bg-cream/60 px-4 py-2.5 focus-within:border-gold focus-within:ring-1 focus-within:ring-gold ${className}`}
    >
      <Search size={16} className="text-brown shrink-0" />
      <input
        type="search"
        placeholder="Search events"
        className="w-full bg-transparent font-body text-sm text-navy placeholder:text-slate/60 outline-none"
        {...rest}
      />
    </div>
  );
}
