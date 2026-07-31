type GearMotifProps = {
  className?: string;
  teeth?: number;
};

/**
 * Decorative outlined gear used as a floating/rotating accent icon.
 * Drawn as pure geometry (no external asset) so it recolors via `currentColor`.
 */
export function GearMotif({ className, teeth = 12 }: GearMotifProps) {
  const outerR = 46;
  const innerR = 36;
  const toothLen = 10;

  const points: string[] = [];
  for (let i = 0; i < teeth * 2; i++) {
    const angle = (Math.PI * 2 * i) / (teeth * 2);
    const r = i % 2 === 0 ? outerR + toothLen : outerR;
    points.push(`${50 + r * Math.cos(angle)},${50 + r * Math.sin(angle)}`);
  }

  return (
    <svg viewBox="0 0 100 100" className={className} fill="none" stroke="currentColor" strokeWidth="1.4">
      <polygon points={points.join(' ')} strokeLinejoin="round" />
      <circle cx="50" cy="50" r={innerR} />
      <circle cx="50" cy="50" r="10" />
      <line x1="50" y1="24" x2="50" y2="34" />
      <line x1="50" y1="66" x2="50" y2="76" />
      <line x1="24" y1="50" x2="34" y2="50" />
      <line x1="66" y1="50" x2="76" y2="50" />
    </svg>
  );
}
