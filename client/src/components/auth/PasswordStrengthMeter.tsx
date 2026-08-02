import { getPasswordChecks } from './PasswordRequirements';

const LEVELS = [
  { label: 'Very weak', className: 'bg-red-700' },
  { label: 'Weak', className: 'bg-red-700' },
  { label: 'Fair', className: 'bg-brown' },
  { label: 'Good', className: 'bg-gold' },
  { label: 'Strong', className: 'bg-emerald-700' },
];

export function PasswordStrengthMeter({ password }: { password: string }) {
  const checks = getPasswordChecks(password);
  const score = Object.values(checks).filter(Boolean).length;
  const level = LEVELS[Math.max(0, score - 1)] ?? LEVELS[0];

  return (
    <div className="flex flex-col gap-1.5">
      <div className="flex gap-1">
        {Array.from({ length: 5 }).map((_, index) => (
          <div
            key={index}
            className={`h-1.5 flex-1 rounded-full transition-colors duration-200 ${
              index < score ? level.className : 'bg-navy/10'
            }`}
          />
        ))}
      </div>
      {password.length > 0 && (
        <span className="font-body text-xs font-semibold uppercase tracking-wide text-slate">{level.label}</span>
      )}
    </div>
  );
}
