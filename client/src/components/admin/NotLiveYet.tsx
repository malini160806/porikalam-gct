import type { ReactNode } from 'react';
import { Construction } from 'lucide-react';

export function NotLiveYet({ children }: { children: ReactNode }) {
  return (
    <div className="flex flex-col items-center gap-3 border border-dashed border-gold/25 bg-navy/40 px-6 py-14 text-center">
      <Construction size={28} className="text-gold/60" strokeWidth={1.5} />
      <p className="font-body text-sm text-beige/70">{children}</p>
    </div>
  );
}
