import type { SVGProps } from 'react';

type IconProps = SVGProps<SVGSVGElement>;

/**
 * Antique engraved / blueprint line-art icon set for events: 100x100 viewBox, stroke-only,
 * `currentColor` so callers control the gold/bronze tone via text color classes.
 */
const base = {
  viewBox: '0 0 100 100',
  fill: 'none',
  stroke: 'currentColor',
  strokeWidth: 1.6,
  strokeLinecap: 'round' as const,
  strokeLinejoin: 'round' as const,
};

/** The Outliner — antique quill drafting a line, ink pooling at the nib. */
export function QuillIcon(props: IconProps) {
  return (
    <svg {...base} {...props}>
      <path d="M28 82 L74 20 C82 10 90 14 86 24 L48 66 Z" />
      <path d="M48 66 L28 82" />
      <path d="M74 20 C68 26 58 38 48 52" strokeWidth={0.9} />
      <circle cx="30" cy="80" r="2.4" fill="currentColor" stroke="none" />
      <path d="M16 90 Q30 84 44 90" strokeWidth={1} />
    </svg>
  );
}

/** SiteSprint — hard hat with rivet crest over a survey ground line. */
export function HardHatIcon(props: IconProps) {
  return (
    <svg {...base} {...props}>
      <path d="M20 66 C20 40 34 26 50 26 C66 26 80 40 80 66 Z" />
      <path d="M14 66 H86" />
      <path d="M50 26 V16" />
      <path d="M44 16 H56" />
      <path d="M50 34 V58" strokeWidth={0.9} />
      <path d="M30 78 H70" strokeWidth={1} strokeDasharray="1 5" />
    </svg>
  );
}

/** Structron — classical fluted column bearing an entablature. */
export function ColumnIcon(props: IconProps) {
  return (
    <svg {...base} {...props}>
      <path d="M22 20 H78" strokeWidth={2} />
      <path d="M26 26 H74" />
      <path d="M32 30 V80" strokeWidth={0.9} />
      <path d="M42 30 V80" strokeWidth={0.9} />
      <path d="M50 30 V80" strokeWidth={0.9} />
      <path d="M58 30 V80" strokeWidth={0.9} />
      <path d="M68 30 V80" strokeWidth={0.9} />
      <path d="M24 80 H76" strokeWidth={2} />
      <path d="M18 88 H82" strokeWidth={2} />
    </svg>
  );
}

/** Concept Clash — two facing scrolls in debate, ruled text lines. */
export function DebateScrollsIcon(props: IconProps) {
  return (
    <svg {...base} {...props}>
      <path d="M14 34 C14 28 20 28 20 34 V66 C20 72 14 72 14 66 Z" />
      <path d="M20 34 H50 V66 H20" />
      <path d="M28 44 H44" strokeWidth={1} />
      <path d="M28 52 H40" strokeWidth={1} />
      <path d="M86 34 C86 28 80 28 80 34 V66 C80 72 86 72 86 66 Z" />
      <path d="M80 34 H50 V66 H80" />
      <path d="M56 44 H72" strokeWidth={1} />
      <path d="M60 52 H72" strokeWidth={1} />
    </svg>
  );
}

/** Deep Dive Challenge / Product Presentation — chart easel on a tripod. */
export function EaselIcon(props: IconProps) {
  return (
    <svg {...base} {...props}>
      <path d="M24 22 H76 V64 H24 Z" />
      <path d="M30 56 L42 40 L52 48 L70 26" strokeWidth={1.1} />
      <circle cx="70" cy="26" r="2.4" fill="currentColor" stroke="none" />
      <path d="M50 64 L38 90" />
      <path d="M50 64 L62 90" />
      <path d="M50 64 V78" strokeWidth={1} />
      <path d="M28 90 H72" strokeWidth={1} />
    </svg>
  );
}

/** Brainstorm Battle — engraved brain profile meshed with a gear. */
export function BrainGearIcon(props: IconProps) {
  return (
    <svg {...base} {...props}>
      <path d="M42 22 C24 22 16 36 20 48 C14 52 14 62 22 66 C22 76 32 82 42 78 C48 84 60 84 64 76 C76 78 84 66 78 56 C84 48 78 36 66 36 C64 26 52 20 42 22 Z" />
      <path d="M30 40 C36 38 38 44 34 48 C40 48 42 54 36 58" strokeWidth={1} />
      <path d="M46 34 V70" strokeWidth={0.9} />
      <circle cx="68" cy="60" r="12" />
      <circle cx="68" cy="60" r="4" />
      {[0, 60, 120, 180, 240, 300].map((deg) => (
        <line
          key={deg}
          x1={68 + 12 * Math.cos((deg * Math.PI) / 180)}
          y1={60 + 12 * Math.sin((deg * Math.PI) / 180)}
          x2={68 + 17 * Math.cos((deg * Math.PI) / 180)}
          y2={60 + 17 * Math.sin((deg * Math.PI) / 180)}
        />
      ))}
    </svg>
  );
}

/** Civil CBI — magnifying glass over a surveyed blueprint. */
export function MagnifierBlueprintIcon(props: IconProps) {
  return (
    <svg {...base} {...props}>
      <path d="M16 24 H62 V64 H16 Z" strokeWidth={1} />
      <path d="M24 34 H54" strokeWidth={0.9} />
      <path d="M24 42 H48" strokeWidth={0.9} />
      <path d="M24 50 H54" strokeWidth={0.9} />
      <path d="M24 58 H40" strokeWidth={0.9} />
      <circle cx="62" cy="58" r="18" />
      <path d="M75 71 L90 86" strokeWidth={2.2} />
    </svg>
  );
}

/** Robo Soccer / Robo Rally — schematic automaton head and chassis. */
export function RoboticIcon(props: IconProps) {
  return (
    <svg {...base} {...props}>
      <path d="M38 18 V10" />
      <circle cx="38" cy="7" r="2.6" fill="currentColor" stroke="none" />
      <path d="M24 20 H52 V42 H24 Z" />
      <circle cx="32" cy="31" r="3" />
      <circle cx="44" cy="31" r="3" />
      <path d="M18 50 H58 V78 H18 Z" />
      <path d="M28 50 V42" strokeWidth={0.9} />
      <path d="M48 50 V42" strokeWidth={0.9} />
      <path d="M18 62 H58" strokeWidth={0.9} />
      <path d="M10 54 L18 58 V70 L10 74" strokeWidth={1} />
      <path d="M66 54 L58 58 V70 L66 74" strokeWidth={1} />
      <path d="M26 78 V88" />
      <path d="M50 78 V88" />
    </svg>
  );
}

/** Flightcraft / Skyworks — folded paper glider with lift lines. */
export function GliderIcon(props: IconProps) {
  return (
    <svg {...base} {...props}>
      <path d="M10 58 L88 46 L54 62 L88 46 L58 84 L48 60 L10 58 Z" />
      <path d="M48 60 L58 84" strokeWidth={0.9} />
      <path d="M20 40 Q40 30 60 34" strokeWidth={1} strokeDasharray="1 5" />
      <path d="M16 26 Q34 18 52 22" strokeWidth={1} strokeDasharray="1 5" />
    </svg>
  );
}

/** Water Rokletry — antique bottle rocket with fins and a trailing arc. */
export function RocketIcon(props: IconProps) {
  return (
    <svg {...base} {...props}>
      <path d="M50 12 C62 24 66 42 62 62 H38 C34 42 38 24 50 12 Z" />
      <path d="M38 62 L26 78 L38 72 Z" />
      <path d="M62 62 L74 78 L62 72 Z" />
      <path d="M42 62 L38 86 M50 62 V90 M58 62 L62 86" strokeWidth={1} />
      <circle cx="50" cy="34" r="6" />
      <path d="M18 90 Q34 82 50 90" strokeWidth={1} strokeDasharray="1 5" />
    </svg>
  );
}

/** Gear Heads — twin interlocking gears (mechanical/automotive). */
export function TwinGearsIcon(props: IconProps) {
  function toothed(cx: number, r: number, teeth: number) {
    const pts: string[] = [];
    for (let i = 0; i < teeth * 2; i++) {
      const angle = (Math.PI * 2 * i) / (teeth * 2);
      const rad = i % 2 === 0 ? r + 6 : r;
      pts.push(`${cx + rad * Math.cos(angle)},${50 + rad * Math.sin(angle)}`);
    }
    return pts.join(' ');
  }
  return (
    <svg {...base} {...props}>
      <polygon points={toothed(34, 22, 9)} strokeLinejoin="round" />
      <circle cx="34" cy="50" r="8" />
      <polygon points={toothed(70, 16, 8)} strokeLinejoin="round" />
      <circle cx="70" cy="50" r="6" />
    </svg>
  );
}

/** What If? — engraved circuit trace with junction nodes. */
export function CircuitTraceIcon(props: IconProps) {
  return (
    <svg {...base} {...props}>
      <path d="M12 24 H36 V44 H64 V24 H88" />
      <path d="M12 76 H36 V56 H64 V76 H88" />
      <path d="M50 44 V56" />
      {[12, 36, 64, 88].map((x) => (
        <circle key={`t-${x}`} cx={x} cy={24} r={2.6} fill="currentColor" stroke="none" />
      ))}
      {[12, 36, 64, 88].map((x) => (
        <circle key={`b-${x}`} cx={x} cy={76} r={2.6} fill="currentColor" stroke="none" />
      ))}
      <circle cx="50" cy="50" r={2.6} fill="currentColor" stroke="none" />
    </svg>
  );
}

/** Industry 5.0 Challenge — heritage factory silhouette with rising smoke. */
export function FactoryIcon(props: IconProps) {
  return (
    <svg {...base} {...props}>
      <path d="M14 84 V56 L38 68 V56 L62 68 V40 H74 V84 Z" />
      <path d="M14 84 H86" strokeWidth={2} />
      <path d="M66 40 V26" />
      <path d="M66 26 Q60 20 66 14 Q72 8 66 2" strokeWidth={1} strokeDasharray="1 4" />
      <path d="M26 84 V70 M38 84 V70 M50 84 V70 M62 84 V70" strokeWidth={0.9} />
    </svg>
  );
}

/** Code Detective — cipher wheel fused with a circuit trace. */
export function CipherCircuitIcon(props: IconProps) {
  return (
    <svg {...base} {...props}>
      <circle cx="42" cy="46" r="30" />
      <circle cx="42" cy="46" r="20" strokeDasharray="1 5" />
      {Array.from({ length: 12 }).map((_, i) => {
        const angle = (Math.PI * 2 * i) / 12;
        return (
          <line
            key={i}
            x1={42 + 26 * Math.cos(angle)}
            y1={46 + 26 * Math.sin(angle)}
            x2={42 + 30 * Math.cos(angle)}
            y2={46 + 30 * Math.sin(angle)}
          />
        );
      })}
      <circle cx="42" cy="46" r="3" fill="currentColor" stroke="none" />
      <path d="M68 62 H80 V80 H90" strokeWidth={1.2} />
      <circle cx="90" cy="80" r={2.4} fill="currentColor" stroke="none" />
      <path d="M60 74 L70 88" strokeWidth={1.2} />
    </svg>
  );
}

/** Requirement Rumble — clipboard parchment with a checklist. */
export function ChecklistIcon(props: IconProps) {
  return (
    <svg {...base} {...props}>
      <path d="M24 18 H76 V88 H24 Z" />
      <path d="M40 14 H60 V24 H40 Z" />
      <path d="M32 38 L37 43 L46 32" strokeWidth={1.3} />
      <path d="M52 38 H68" strokeWidth={1} />
      <path d="M32 54 L37 59 L46 48" strokeWidth={1.3} />
      <path d="M52 54 H68" strokeWidth={1} />
      <path d="M32 70 L37 75 L46 64" strokeWidth={1.3} />
      <path d="M52 70 H68" strokeWidth={1} />
    </svg>
  );
}

/** AI Workshop — engraved brain interwoven with circuit pathways. */
export function BrainCircuitIcon(props: IconProps) {
  return (
    <svg {...base} {...props}>
      <path d="M42 16 C22 16 14 32 20 44 C12 50 14 62 24 66 C24 78 36 84 46 78 C52 86 66 84 68 74 C80 76 88 62 80 52 C86 42 78 28 64 30 C60 20 50 14 42 16 Z" />
      <path d="M26 40 H38 V50 H50 V40 H62" strokeWidth={1} />
      <path d="M38 50 V64 H52" strokeWidth={1} />
      {[26, 38, 62].map((x) => (
        <circle key={x} cx={x} cy={40} r={2} fill="currentColor" stroke="none" />
      ))}
      <circle cx="52" cy="64" r={2} fill="currentColor" stroke="none" />
    </svg>
  );
}

/** Project Expo — innovation blueprint bulb ringed by a gear. */
export function InnovationBulbIcon(props: IconProps) {
  return (
    <svg {...base} {...props}>
      <path d="M50 14 C36 14 26 24 26 38 C26 48 32 54 38 60 V70 H62 V60 C68 54 74 48 74 38 C74 24 64 14 50 14 Z" />
      <path d="M42 70 H58 V78 H42 Z" />
      <path d="M45 82 H55" strokeWidth={1} />
      <path d="M50 30 L44 44 H52 L46 58" strokeWidth={1} />
      {[0, 45, 90, 135, 180, 225, 270, 315].map((deg) => (
        <line
          key={deg}
          x1={50 + 32 * Math.cos((deg * Math.PI) / 180)}
          y1={38 + 32 * Math.sin((deg * Math.PI) / 180)}
          x2={50 + 38 * Math.cos((deg * Math.PI) / 180)}
          y2={38 + 38 * Math.sin((deg * Math.PI) / 180)}
          strokeWidth={0.8}
        />
      ))}
    </svg>
  );
}



export const EVENT_ICON_COMPONENTS = {
  'pen-tool': QuillIcon,
  'hard-hat': HardHatIcon,
  landmark: ColumnIcon,
  'message-square-text': DebateScrollsIcon,
  presentation: EaselIcon,
  'brain-cog': BrainGearIcon,
  search: MagnifierBlueprintIcon,
  bot: RoboticIcon,
  plane: GliderIcon,
  rocket: RocketIcon,
  cog: TwinGearsIcon,
  'circuit-board': CircuitTraceIcon,
  factory: FactoryIcon,
  bug: CipherCircuitIcon,
  'clipboard-list': ChecklistIcon,
  'brain-circuit': BrainCircuitIcon,
  expo: InnovationBulbIcon,
} satisfies Record<string, (props: IconProps) => React.ReactElement>;

export type EventIconKey = keyof typeof EVENT_ICON_COMPONENTS;

export function getEventIconComponent(iconKey: string) {
  return EVENT_ICON_COMPONENTS[iconKey as EventIconKey] ?? TwinGearsIcon;
}
