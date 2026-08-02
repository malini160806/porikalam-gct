import { Check, X } from 'lucide-react';

export interface PasswordChecks {
  length: boolean;
  upper: boolean;
  lower: boolean;
  number: boolean;
  special: boolean;
}

export function getPasswordChecks(password: string): PasswordChecks {
  return {
    length: password.length >= 8,
    upper: /[A-Z]/.test(password),
    lower: /[a-z]/.test(password),
    number: /\d/.test(password),
    special: /[^A-Za-z0-9]/.test(password),
  };
}

const REQUIREMENTS: Array<{ key: keyof PasswordChecks; label: string }> = [
  { key: 'length', label: 'At least 8 characters' },
  { key: 'upper', label: 'One uppercase letter' },
  { key: 'lower', label: 'One lowercase letter' },
  { key: 'number', label: 'One number' },
  { key: 'special', label: 'One special character' },
];

export function PasswordRequirements({ password }: { password: string }) {
  const checks = getPasswordChecks(password);

  return (
    <ul className="mt-3 grid gap-1.5 sm:grid-cols-2">
      {REQUIREMENTS.map(({ key, label }) => {
        const met = checks[key];
        return (
          <li
            key={key}
            className={`flex items-center gap-1.5 font-body text-xs ${met ? 'text-brown' : 'text-slate/70'}`}
          >
            {met ? <Check size={13} className="text-brown" /> : <X size={13} className="text-slate/40" />}
            {label}
          </li>
        );
      })}
    </ul>
  );
}
