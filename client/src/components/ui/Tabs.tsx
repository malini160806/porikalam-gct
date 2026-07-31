type TabOption<T extends string> = {
  label: string;
  value: T;
};

type TabsProps<T extends string> = {
  options: TabOption<T>[];
  value: T;
  onChange: (value: T) => void;
  className?: string;
  tone?: 'light' | 'dark';
};

export function Tabs<T extends string>({
  options,
  value,
  onChange,
  className = '',
  tone = 'light',
}: TabsProps<T>) {
  const inactive =
    tone === 'dark'
      ? 'bg-transparent text-cream border-gold/30 hover:border-gold hover:text-gold'
      : 'bg-transparent text-navy border-navy/25 hover:border-gold hover:text-brown';

  return (
    <div className={`flex flex-wrap items-center justify-center gap-2 ${className}`}>
      {options.map((option) => {
        const active = option.value === value;
        return (
          <button
            key={option.value}
            type="button"
            onClick={() => onChange(option.value)}
            className={`font-body text-xs font-semibold uppercase tracking-wider px-4 py-2 border transition-colors duration-150 ${
              active ? 'bg-gold text-navy border-gold' : inactive
            }`}
          >
            {option.label}
          </button>
        );
      })}
    </div>
  );
}
