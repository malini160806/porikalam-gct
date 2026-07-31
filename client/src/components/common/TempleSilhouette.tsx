type TempleSilhouetteProps = {
  className?: string;
  strokeWidth?: number;
};

/**
 * Line-art gopuram (temple tower) sketch used as the recurring heritage motif
 * across hero, about, and footer sections. Pure stroke geometry so it can be
 * recolored via `currentColor` on navy or cream backgrounds.
 */
export function TempleSilhouette({ className, strokeWidth = 1.4 }: TempleSilhouetteProps) {
  const tiers = [
    { y: 210, w: 150 },
    { y: 186, w: 132 },
    { y: 162, w: 114 },
    { y: 138, w: 96 },
    { y: 114, w: 78 },
    { y: 92, w: 60 },
    { y: 72, w: 44 },
  ];

  return (
    <svg
      viewBox="0 0 220 260"
      fill="none"
      className={className}
      stroke="currentColor"
      strokeWidth={strokeWidth}
    >
      {/* finial */}
      <line x1="110" y1="18" x2="110" y2="42" />
      <circle cx="110" cy="14" r="4" />
      <path d="M96 42 L110 30 L124 42 Z" />

      {/* tiers */}
      {tiers.map((tier, i) => {
        const x = 110 - tier.w / 2;
        const h = i === tiers.length - 1 ? 30 : 22;
        return (
          <g key={tier.y}>
            <path
              d={`M${x} ${tier.y + h} L${x + 8} ${tier.y} L${x + tier.w - 8} ${tier.y} L${x + tier.w} ${tier.y + h} Z`}
            />
            <line x1={x + 4} y1={tier.y + h * 0.55} x2={x + tier.w - 4} y2={tier.y + h * 0.55} strokeWidth={strokeWidth * 0.6} />
          </g>
        );
      })}

      {/* base body */}
      <rect x="35" y="210" width="150" height="16" />
      <rect x="20" y="226" width="180" height="10" />

      {/* archway */}
      <path d="M92 226 L92 200 Q110 182 128 200 L128 226" />

      {/* base plinth */}
      <line x1="10" y1="246" x2="210" y2="246" />
      <line x1="4" y1="252" x2="216" y2="252" strokeWidth={strokeWidth * 0.6} />
    </svg>
  );
}
