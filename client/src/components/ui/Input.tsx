import { forwardRef, type InputHTMLAttributes, type TextareaHTMLAttributes, type SelectHTMLAttributes } from 'react';

const fieldBase =
  'w-full bg-cream/60 border border-navy/25 text-navy placeholder:text-slate/60 font-body text-sm px-4 py-3 outline-none transition-all duration-200 focus:border-gold focus:ring-1 focus:ring-gold focus:shadow-[0_0_12px_0_rgba(212,175,55,0.35)] disabled:opacity-50 disabled:cursor-not-allowed';

type InputProps = InputHTMLAttributes<HTMLInputElement> & {
  label?: string;
  error?: string;
};

export const Input = forwardRef<HTMLInputElement, InputProps>(function Input(
  { label, error, className = '', id, ...rest },
  ref,
) {
  return (
    <label className="flex flex-col gap-1.5 text-left" htmlFor={id}>
      {label && (
        <span className="font-body text-xs font-semibold uppercase tracking-wider text-slate">
          {label}
        </span>
      )}
      <input
        ref={ref}
        id={id}
        className={`${fieldBase} ${error ? 'border-red-700 focus:border-red-700 focus:ring-red-700' : ''} ${className}`}
        {...rest}
      />
      {error && <span className="text-xs text-red-700">{error}</span>}
    </label>
  );
});

type TextareaProps = TextareaHTMLAttributes<HTMLTextAreaElement> & {
  label?: string;
  error?: string;
};

export const Textarea = forwardRef<HTMLTextAreaElement, TextareaProps>(function Textarea(
  { label, error, className = '', id, rows = 5, ...rest },
  ref,
) {
  return (
    <label className="flex flex-col gap-1.5 text-left" htmlFor={id}>
      {label && (
        <span className="font-body text-xs font-semibold uppercase tracking-wider text-slate">
          {label}
        </span>
      )}
      <textarea
        ref={ref}
        id={id}
        rows={rows}
        className={`${fieldBase} resize-none ${error ? 'border-red-700 focus:border-red-700 focus:ring-red-700' : ''} ${className}`}
        {...rest}
      />
      {error && <span className="text-xs text-red-700">{error}</span>}
    </label>
  );
});

type SelectProps = SelectHTMLAttributes<HTMLSelectElement> & {
  label?: string;
};

export const Select = forwardRef<HTMLSelectElement, SelectProps>(function Select(
  { label, className = '', id, children, ...rest },
  ref,
) {
  return (
    <label className="flex flex-col gap-1.5 text-left" htmlFor={id}>
      {label && (
        <span className="font-body text-xs font-semibold uppercase tracking-wider text-slate">
          {label}
        </span>
      )}
      <select ref={ref} id={id} className={`${fieldBase} ${className}`} {...rest}>
        {children}
      </select>
    </label>
  );
});

type CheckboxProps = InputHTMLAttributes<HTMLInputElement> & { label: string };

export function Checkbox({ label, id, className = '', ...rest }: CheckboxProps) {
  return (
    <label htmlFor={id} className="flex items-center gap-2 cursor-pointer select-none font-body text-sm text-navy">
      <input
        type="checkbox"
        id={id}
        className={`h-4 w-4 accent-[#d4af37] border border-navy/40 ${className}`}
        {...rest}
      />
      {label}
    </label>
  );
}

type RadioProps = InputHTMLAttributes<HTMLInputElement> & { label: string };

export function Radio({ label, id, className = '', ...rest }: RadioProps) {
  return (
    <label htmlFor={id} className="flex items-center gap-2 cursor-pointer select-none font-body text-sm text-navy">
      <input
        type="radio"
        id={id}
        className={`h-4 w-4 accent-[#d4af37] border border-navy/40 ${className}`}
        {...rest}
      />
      {label}
    </label>
  );
}
