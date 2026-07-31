type CompassMotifProps = {
  className?: string;
};

/** Decorative drafting-compass / blueprint rose accent. */
export function CompassMotif({ className }: CompassMotifProps) {
  return (
    <svg viewBox="0 0 100 100" className={className} fill="none" stroke="currentColor" strokeWidth="1.2">
      <circle cx="50" cy="50" r="46" />
      <circle cx="50" cy="50" r="34" strokeDasharray="2 4" />
      <circle cx="50" cy="50" r="3" />
      {[0, 45, 90, 135, 180, 225, 270, 315].map((deg) => (
        <line
          key={deg}
          x1="50"
          y1="50"
          x2={50 + 46 * Math.cos((deg * Math.PI) / 180)}
          y2={50 + 46 * Math.sin((deg * Math.PI) / 180)}
          strokeWidth={deg % 90 === 0 ? 1.2 : 0.6}
        />
      ))}
      <path d="M50 10 L54 50 L50 90 L46 50 Z" />
    </svg>
  );
}
