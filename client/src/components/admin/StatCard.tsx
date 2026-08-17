import type { ReactNode } from 'react';

type StatCardProps = {
  label: string;
  value: number | null;
  icon: ReactNode;
};

/** `value: null` renders "Not live yet" instead of a number — used for sections (registrations, attendance, payments) whose backing systems don't exist yet. */
export function StatCard({ label, value, icon }: StatCardProps) {
  return (
    <div className="flex flex-col gap-3 border border-gold/20 bg-navy p-5 shadow-[inset_0_0_30px_-22px_rgba(212,175,55,0.5)]">
      <div className="flex items-center justify-between">
        <span className="flex h-9 w-9 items-center justify-center border border-gold/30 text-gold">{icon}</span>
      </div>
      {value === null ? (
        <span className="font-body text-xs uppercase tracking-wide text-beige/40">Not live yet</span>
      ) : (
        <span className="font-heading text-3xl font-bold text-cream">{value.toLocaleString()}</span>
      )}
      <span className="font-body text-[11px] font-semibold uppercase tracking-widest text-beige/60">{label}</span>
    </div>
  );
}
