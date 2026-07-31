type DividerProps = {
  className?: string;
  tone?: 'gold' | 'navy';
};

/** Thin ornamental divider with a central diamond, matching the reference's "Dividers" swatch. */
export function Divider({ className = '', tone = 'gold' }: DividerProps) {
  const color = tone === 'gold' ? 'bg-gold' : 'bg-navy';
  return (
    <div className={`flex items-center justify-center gap-3 ${className}`}>
      <span className={`h-px w-16 ${color} opacity-70`} />
      <span className={`h-1.5 w-1.5 rotate-45 ${color}`} />
      <span className={`h-px w-16 ${color} opacity-70`} />
    </div>
  );
}
