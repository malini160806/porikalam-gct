import type { ComponentType, ReactNode } from 'react';
import { motion, type TargetAndTransition, type Transition } from 'framer-motion';
import {
  Ruler,
  Layers,
  Anchor,
  Bug,
  Terminal,
  GraduationCap,
  PenTool,
  Share2,
  Gavel,
  Shapes,
  Navigation2,
  Droplet,
  Cpu,
  Target,
  Lock,
  Sparkle,
} from 'lucide-react';
import type { EventTheme, EventThemeId, IconMotion } from '@/data/eventThemes';

type BadgeIconProps = { size?: number; strokeWidth?: number; className?: string };

const BADGE_ICONS: Record<string, ComponentType<BadgeIconProps>> = {
  Ruler,
  Layers,
  Anchor,
  Bug,
  Terminal,
  GraduationCap,
  PenTool,
  Share2,
  Gavel,
  Shapes,
  Navigation2,
  Droplet,
  Cpu,
  Target,
  Lock,
  Sparkle,
};

/* =========================================================
   BACKGROUND MOTIFS — one per theme id, same viewBox so any
   of them can drop into the backdrop without layout changes.
========================================================= */

type PatternProps = { accent: string; accentSoft: string };
const VB = '0 0 400 260';

function CivilPattern({ accent }: PatternProps) {
  return (
    <svg viewBox={VB} preserveAspectRatio="xMidYMid slice" className="h-full w-full">
      {Array.from({ length: 9 }).map((_, i) => (
        <line key={`v${i}`} x1={i * 50} y1={0} x2={i * 50} y2={260} stroke={accent} strokeWidth={0.5} />
      ))}
      {Array.from({ length: 6 }).map((_, i) => (
        <line key={`h${i}`} x1={0} y1={i * 52} x2={400} y2={i * 52} stroke={accent} strokeWidth={0.5} />
      ))}
      <motion.path
        d="M240 210 L240 120 L290 85 L340 120 L340 210 M262 210 V165 H300 V210"
        stroke={accent}
        strokeWidth={1.6}
        fill="none"
        initial={{ pathLength: 0, opacity: 0 }}
        animate={{ pathLength: 1, opacity: 1 }}
        transition={{ duration: 3, repeat: Infinity, repeatDelay: 2.5, ease: 'easeInOut' }}
      />
      <motion.line
        x1={40}
        y1={200}
        x2={160}
        y2={200}
        stroke={accent}
        strokeWidth={1.2}
        initial={{ pathLength: 0 }}
        animate={{ pathLength: 1 }}
        transition={{ duration: 2, repeat: Infinity, repeatDelay: 3, ease: 'easeInOut' }}
      />
      <line x1={40} y1={195} x2={40} y2={205} stroke={accent} strokeWidth={1.2} />
      <line x1={160} y1={195} x2={160} y2={205} stroke={accent} strokeWidth={1.2} />
    </svg>
  );
}

function StructuralPattern({ accent }: PatternProps) {
  const beams = [
    'M40 220 L110 140 L180 220',
    'M180 220 L250 140 L320 220',
    'M75 180 L145 180',
    'M215 180 L285 180',
  ];
  return (
    <svg viewBox={VB} preserveAspectRatio="xMidYMid slice" className="h-full w-full">
      {beams.map((d, i) => (
        <motion.path
          key={d}
          d={d}
          stroke={accent}
          strokeWidth={1.4}
          fill="none"
          initial={{ pathLength: 0, opacity: 0.3 }}
          animate={{ pathLength: 1, opacity: 0.9 }}
          transition={{ duration: 1.6, delay: i * 0.5, repeat: Infinity, repeatDelay: 3.5, ease: 'easeOut' }}
        />
      ))}
      {[40, 110, 180, 250, 320].map((x) => (
        <circle key={x} cx={x} cy={220} r={3} fill={accent} opacity={0.6} />
      ))}
    </svg>
  );
}

function DeepSeaPattern({ accent, accentSoft }: PatternProps) {
  return (
    <svg viewBox={VB} preserveAspectRatio="xMidYMid slice" className="h-full w-full">
      {[60, 110, 160, 210].map((y, i) => (
        <motion.path
          key={y}
          d={`M0 ${y} Q50 ${y - 14} 100 ${y} T200 ${y} T300 ${y} T400 ${y}`}
          stroke={i % 2 === 0 ? accent : accentSoft}
          strokeWidth={1}
          fill="none"
          animate={{ x: [0, -40, 0] }}
          transition={{ duration: 10 + i * 2, repeat: Infinity, ease: 'easeInOut' }}
        />
      ))}
      {[
        { cx: 90, cy: 200, r: 3 },
        { cx: 130, cy: 170, r: 2 },
        { cx: 250, cy: 190, r: 4 },
        { cx: 300, cy: 150, r: 2.5 },
      ].map((b, i) => (
        <motion.circle
          key={i}
          cx={b.cx}
          cy={b.cy}
          r={b.r}
          fill="none"
          stroke={accent}
          strokeWidth={0.8}
          animate={{ cy: [b.cy, b.cy - 90], opacity: [0.9, 0] }}
          transition={{ duration: 5 + i, repeat: Infinity, delay: i * 0.8, ease: 'easeOut' }}
        />
      ))}
    </svg>
  );
}

function ReverseEngineeringPattern({ accent, accentSoft }: PatternProps) {
  return (
    <svg viewBox={VB} preserveAspectRatio="xMidYMid slice" className="h-full w-full">
      <path d="M40 40 H140 V90 H220 V40 H360" stroke={accent} strokeWidth={1} fill="none" strokeDasharray="6 5" />
      <path d="M40 220 H140 V170 H220 V220 H360" stroke={accentSoft} strokeWidth={1} fill="none" strokeDasharray="6 5" />
      {[40, 140, 220, 360].map((x) => (
        <circle key={`t${x}`} cx={x} cy={40} r={2.6} fill={accent} />
      ))}
      {[40, 140, 220, 360].map((x) => (
        <circle key={`b${x}`} cx={x} cy={220} r={2.6} fill={accentSoft} />
      ))}
      <motion.circle
        cx={220}
        cy={130}
        r={6}
        fill="none"
        stroke={accent}
        strokeWidth={1.4}
        animate={{ scale: [1, 1.6, 1], opacity: [0.9, 0.1, 0.9] }}
        transition={{ duration: 2.4, repeat: Infinity, ease: 'easeInOut' }}
      />
    </svg>
  );
}

function CodeInvestigationPattern({ accent }: PatternProps) {
  const lines = [70, 95, 120, 145, 170];
  return (
    <svg viewBox={VB} preserveAspectRatio="xMidYMid slice" className="h-full w-full">
      <rect x={50} y={50} width={300} height={150} rx={2} stroke={accent} strokeWidth={1} fill="none" opacity={0.5} />
      {lines.map((y, i) => (
        <motion.line
          key={y}
          x1={70}
          y1={y}
          x2={70 + 40 + i * 30}
          y2={y}
          stroke={accent}
          strokeWidth={2}
          initial={{ pathLength: 0 }}
          animate={{ pathLength: 1 }}
          transition={{ duration: 0.6, delay: i * 0.35, repeat: Infinity, repeatDelay: 3.5 }}
        />
      ))}
      <motion.rect
        x={200}
        y={116}
        width={90}
        height={16}
        fill={accent}
        animate={{ opacity: [0, 0.18, 0] }}
        transition={{ duration: 2.4, repeat: Infinity, delay: 1.5 }}
      />
    </svg>
  );
}

function AcademicPattern({ accent }: PatternProps) {
  return (
    <svg viewBox={VB} preserveAspectRatio="xMidYMid slice" className="h-full w-full">
      <rect x={130} y={40} width={140} height={180} stroke={accent} strokeWidth={1} fill="none" />
      {[60, 75, 90, 105, 120].map((y, i) => (
        <motion.line
          key={y}
          x1={145}
          y1={y}
          x2={i === 4 ? 220 : 255}
          y2={y}
          stroke={accent}
          strokeWidth={1}
          initial={{ pathLength: 0 }}
          animate={{ pathLength: 1 }}
          transition={{ duration: 0.5, delay: i * 0.15, repeat: Infinity, repeatDelay: 4 }}
        />
      ))}
      {[0, 1, 2, 3].map((i) => (
        <motion.rect
          key={i}
          x={145 + i * 25}
          y={190}
          width={14}
          height={0}
          fill={accent}
          animate={{ height: [0, 20 + i * 5, 0], y: [190, 170 - i * 5, 190] }}
          transition={{ duration: 3, repeat: Infinity, delay: i * 0.3, ease: 'easeInOut' }}
        />
      ))}
    </svg>
  );
}

function SketchPattern({ accent }: PatternProps) {
  return (
    <svg viewBox={VB} preserveAspectRatio="xMidYMid slice" className="h-full w-full">
      <motion.path
        d="M60 200 C90 120 140 90 200 100 C250 108 260 150 220 170 C190 184 170 160 190 140"
        stroke={accent}
        strokeWidth={1.4}
        fill="none"
        strokeLinecap="round"
        initial={{ pathLength: 0 }}
        animate={{ pathLength: 1 }}
        transition={{ duration: 3.5, repeat: Infinity, repeatDelay: 2, ease: 'easeInOut' }}
      />
      <motion.path
        d="M260 60 L330 80"
        stroke={accent}
        strokeWidth={1}
        strokeLinecap="round"
        initial={{ pathLength: 0 }}
        animate={{ pathLength: 1 }}
        transition={{ duration: 0.8, repeat: Infinity, repeatDelay: 3.5, delay: 1 }}
      />
      <path d="M280 200 Q300 190 320 200" stroke={accent} strokeWidth={0.8} fill="none" opacity={0.5} />
    </svg>
  );
}

function HumanMatrixPattern({ accent }: PatternProps) {
  const nodes = [
    [80, 70], [160, 60], [240, 80], [320, 65],
    [100, 140], [200, 150], [300, 135],
    [90, 210], [190, 205], [290, 215],
  ];
  const edges: [number, number][] = [[0, 4], [1, 4], [1, 5], [2, 5], [2, 6], [3, 6], [4, 7], [5, 8], [6, 9]];
  return (
    <svg viewBox={VB} preserveAspectRatio="xMidYMid slice" className="h-full w-full">
      {edges.map(([a, b], i) => (
        <motion.line
          key={i}
          x1={nodes[a][0]}
          y1={nodes[a][1]}
          x2={nodes[b][0]}
          y2={nodes[b][1]}
          stroke={accent}
          strokeWidth={0.8}
          initial={{ opacity: 0.1 }}
          animate={{ opacity: [0.1, 0.6, 0.1] }}
          transition={{ duration: 2.5, repeat: Infinity, delay: i * 0.25, ease: 'easeInOut' }}
        />
      ))}
      {nodes.map(([x, y], i) => (
        <motion.circle
          key={i}
          cx={x}
          cy={y}
          r={3}
          fill={accent}
          animate={{ opacity: [0.5, 1, 0.5] }}
          transition={{ duration: 2, repeat: Infinity, delay: i * 0.2 }}
        />
      ))}
    </svg>
  );
}

function CricketAuctionPattern({ accent, accentSoft }: PatternProps) {
  return (
    <svg viewBox={VB} preserveAspectRatio="xMidYMid slice" className="h-full w-full">
      <circle cx={200} cy={140} r={95} stroke={accent} strokeWidth={1} fill="none" opacity={0.5} />
      <circle cx={200} cy={140} r={40} stroke={accent} strokeWidth={1} fill="none" opacity={0.5} />
      <line x1={200} y1={45} x2={200} y2={235} stroke={accent} strokeWidth={0.6} opacity={0.4} />
      {[0, 1, 2].map((i) => (
        <motion.text
          key={i}
          x={70}
          y={70 + i * 26}
          fontSize={14}
          fontFamily="monospace"
          fill={accentSoft}
          animate={{ opacity: [0.2, 1, 0.2] }}
          transition={{ duration: 2.2, repeat: Infinity, delay: i * 0.5 }}
        >
          ₹{(i + 1) * 25}L
        </motion.text>
      ))}
      <motion.circle
        cx={200}
        cy={140}
        r={5}
        fill={accentSoft}
        animate={{ cx: [130, 270, 130], cy: [110, 170, 110] }}
        transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut' }}
      />
    </svg>
  );
}

function VisualDesignPattern({ accent, accentSoft }: PatternProps) {
  return (
    <svg viewBox={VB} preserveAspectRatio="xMidYMid slice" className="h-full w-full">
      <motion.rect
        x={90}
        y={80}
        width={60}
        height={60}
        stroke={accent}
        strokeWidth={1.2}
        fill="none"
        animate={{ rotate: [0, 15, 0] }}
        transition={{ duration: 6, repeat: Infinity, ease: 'easeInOut' }}
        style={{ transformOrigin: '120px 110px' }}
      />
      <motion.circle
        cx={230}
        cy={110}
        r={34}
        stroke={accentSoft}
        strokeWidth={1.2}
        fill="none"
        animate={{ scale: [1, 1.12, 1] }}
        transition={{ duration: 5, repeat: Infinity, ease: 'easeInOut' }}
      />
      <motion.polygon
        points="300,150 330,205 270,205"
        stroke={accent}
        strokeWidth={1.2}
        fill="none"
        animate={{ y: [0, -10, 0] }}
        transition={{ duration: 4.5, repeat: Infinity, ease: 'easeInOut' }}
      />
    </svg>
  );
}

function AviationPattern({ accent, accentSoft }: PatternProps) {
  return (
    <svg viewBox={VB} preserveAspectRatio="xMidYMid slice" className="h-full w-full">
      <path d="M20 210 Q150 60 380 90" stroke={accent} strokeWidth={1} strokeDasharray="2 8" fill="none" opacity={0.6} />
      <motion.g
        animate={{ offsetDistance: ['0%', '100%'] }}
        transition={{ duration: 7, repeat: Infinity, ease: 'linear' }}
        style={{ offsetPath: "path('M20 210 Q150 60 380 90')" } as React.CSSProperties}
      >
        <path d="M-8 0 L8 0 L2 -6 M8 0 L2 6" stroke={accent} strokeWidth={1.4} fill="none" />
      </motion.g>
      <path d="M250 50 q12 -8 24 0 q-6 6 -24 0" stroke={accentSoft} strokeWidth={0.8} fill="none" opacity={0.6} />
      <path d="M300 90 q12 -8 24 0 q-6 6 -24 0" stroke={accentSoft} strokeWidth={0.8} fill="none" opacity={0.5} />
    </svg>
  );
}

function RocketryPattern({ accent, accentSoft }: PatternProps) {
  return (
    <svg viewBox={VB} preserveAspectRatio="xMidYMid slice" className="h-full w-full">
      <path d="M200 230 C205 150 205 100 200 40" stroke={accent} strokeWidth={1} strokeDasharray="2 7" opacity={0.5} />
      <motion.g
        animate={{ y: [90, -20, 90], opacity: [0, 1, 0] }}
        transition={{ duration: 3.4, repeat: Infinity, ease: 'easeInOut' }}
      >
        <path d="M200 150 C207 165 207 185 200 200 H193 C186 185 186 165 193 150 Z" stroke={accent} strokeWidth={1.2} fill="none" />
      </motion.g>
      {[0, 1, 2].map((i) => (
        <motion.circle
          key={i}
          cx={190 + i * 8}
          cy={220}
          r={2}
          fill={accentSoft}
          animate={{ cy: [220, 235], opacity: [0.8, 0] }}
          transition={{ duration: 1.2, repeat: Infinity, delay: i * 0.2 }}
        />
      ))}
    </svg>
  );
}

function RoboticsPattern({ accent }: PatternProps) {
  return (
    <svg viewBox={VB} preserveAspectRatio="xMidYMid slice" className="h-full w-full">
      <path
        d="M40 60 H140 V100 H220 V60 H360 M40 200 H140 V160 H220 V200 H360 M140 100 V160"
        stroke={accent}
        strokeWidth={1}
        fill="none"
        opacity={0.5}
      />
      {[40, 140, 220, 360].map((x) => (
        <circle key={`t${x}`} cx={x} cy={60} r={2.6} fill={accent} />
      ))}
      {[40, 140, 220, 360].map((x) => (
        <circle key={`b${x}`} cx={x} cy={200} r={2.6} fill={accent} />
      ))}
      <motion.line
        x1={20}
        x2={380}
        y1={130}
        y2={130}
        stroke={accent}
        strokeWidth={1.2}
        animate={{ y1: [40, 220, 40], y2: [40, 220, 40], opacity: [0.7, 0.2, 0.7] }}
        transition={{ duration: 3.2, repeat: Infinity, ease: 'linear' }}
      />
    </svg>
  );
}

function RoboticsFootballPattern({ accent, accentSoft }: PatternProps) {
  return (
    <svg viewBox={VB} preserveAspectRatio="xMidYMid slice" className="h-full w-full">
      <rect x={40} y={40} width={320} height={180} stroke={accent} strokeWidth={1} fill="none" opacity={0.5} />
      <line x1={200} y1={40} x2={200} y2={220} stroke={accent} strokeWidth={0.8} opacity={0.4} />
      <circle cx={200} cy={130} r={30} stroke={accent} strokeWidth={0.8} fill="none" opacity={0.4} />
      <rect x={40} y={95} width={22} height={70} stroke={accent} strokeWidth={0.8} fill="none" opacity={0.4} />
      <rect x={338} y={95} width={22} height={70} stroke={accent} strokeWidth={0.8} fill="none" opacity={0.4} />
      <motion.circle
        cx={200}
        cy={130}
        r={5}
        fill={accentSoft}
        animate={{ cx: [80, 320, 150, 80], cy: [130, 100, 180, 130] }}
        transition={{ duration: 5, repeat: Infinity, ease: 'easeInOut' }}
      />
    </svg>
  );
}

function HackathonPattern({ accent }: PatternProps) {
  const dots: [number, number][] = [];
  for (let x = 30; x <= 370; x += 40) {
    for (let y = 30; y <= 230; y += 40) {
      dots.push([x, y]);
    }
  }
  return (
    <svg viewBox={VB} preserveAspectRatio="xMidYMid slice" className="h-full w-full">
      {dots.map(([x, y], i) => (
        <circle key={i} cx={x} cy={y} r={1.1} fill={accent} opacity={0.35} />
      ))}
      <motion.line
        x1={0}
        x2={400}
        y1={40}
        y2={40}
        stroke={accent}
        strokeWidth={1}
        animate={{ y1: [20, 240, 20], y2: [20, 240, 20], opacity: [0.6, 0.15, 0.6] }}
        transition={{ duration: 4, repeat: Infinity, ease: 'linear' }}
      />
      <path d="M60 200 L60 160 L120 160 L120 120 L180 120" stroke={accent} strokeWidth={1} fill="none" opacity={0.55} />
      <path d="M340 60 L340 100 L280 100 L280 140" stroke={accent} strokeWidth={1} fill="none" opacity={0.55} />
    </svg>
  );
}

function DefaultPattern({ accent }: PatternProps) {
  return (
    <svg viewBox={VB} preserveAspectRatio="xMidYMid slice" className="h-full w-full">
      <motion.circle
        cx={200}
        cy={130}
        r={60}
        stroke={accent}
        strokeWidth={1}
        fill="none"
        animate={{ scale: [1, 1.1, 1], opacity: [0.4, 0.15, 0.4] }}
        transition={{ duration: 6, repeat: Infinity, ease: 'easeInOut' }}
      />
    </svg>
  );
}

const PATTERNS: Record<EventThemeId, (props: PatternProps) => ReactNode> = {
  'civil-engineering': CivilPattern,
  'structural-engineering': StructuralPattern,
  'deep-sea': DeepSeaPattern,
  'reverse-engineering': ReverseEngineeringPattern,
  'code-investigation': CodeInvestigationPattern,
  'academic-research': AcademicPattern,
  'sketch-design': SketchPattern,
  'human-matrix': HumanMatrixPattern,
  'cricket-auction': CricketAuctionPattern,
  'visual-design': VisualDesignPattern,
  aviation: AviationPattern,
  rocketry: RocketryPattern,
  robotics: RoboticsPattern,
  'robotics-football': RoboticsFootballPattern,
  'hackathon-cyber': HackathonPattern,
  default: DefaultPattern,
};

/** Ambient glow + the theme's signature motif, layered behind the content card. */
export function EventThemeBackdrop({ theme }: { theme: EventTheme }) {
  const Pattern = PATTERNS[theme.id] ?? DefaultPattern;

  return (
    <div className="pointer-events-none absolute inset-0 overflow-hidden" aria-hidden="true">
      <motion.div
        animate={{ scale: [1, 1.08, 1], opacity: [0.3, 0.5, 0.3] }}
        transition={{ duration: 8, repeat: Infinity, ease: 'easeInOut' }}
        className="absolute -left-40 top-10 h-80 w-80 rounded-full blur-3xl"
        style={{ backgroundColor: theme.accent, opacity: 0.1 }}
      />
      <motion.div
        animate={{ scale: [1.08, 1, 1.08], opacity: [0.25, 0.45, 0.25] }}
        transition={{ duration: 9, repeat: Infinity, ease: 'easeInOut' }}
        className="absolute -right-40 bottom-10 h-80 w-80 rounded-full blur-3xl"
        style={{ backgroundColor: theme.accentSoft, opacity: 0.1 }}
      />
      <div className="absolute inset-0 opacity-[0.16]">
        <Pattern accent={theme.accent} accentSoft={theme.accentSoft} />
      </div>
    </div>
  );
}

/* =========================================================
   ICON TREATMENT — motion variant + corner badge, shared
   frame so every theme still reads as the same component.
========================================================= */

const ICON_MOTION_PROPS: Record<IconMotion, { animate: TargetAndTransition; transition: Transition }> = {
  still: { animate: {}, transition: {} },
  pulse: {
    animate: { scale: [1, 1.05, 1] },
    transition: { duration: 2.6, repeat: Infinity, ease: 'easeInOut' },
  },
  bob: {
    animate: { y: [0, -4, 0] },
    transition: { duration: 3, repeat: Infinity, ease: 'easeInOut' },
  },
  glow: {
    animate: { boxShadow: ['0 0 0px 0px var(--accent)', '0 0 14px 2px var(--accent)', '0 0 0px 0px var(--accent)'] },
    transition: { duration: 2.4, repeat: Infinity, ease: 'easeInOut' },
  },
  spin: {
    animate: { rotate: 360 },
    transition: { duration: 10, repeat: Infinity, ease: 'linear' },
  },
};

export function EventThemeIconFrame({ theme, children }: { theme: EventTheme; children: ReactNode }) {
  const Badge = BADGE_ICONS[theme.badge] ?? Sparkle;
  const motionProps = ICON_MOTION_PROPS[theme.iconMotion];

  return (
    <div className="relative mx-auto h-16 w-16">
      <motion.div
        animate={motionProps.animate}
        transition={motionProps.transition}
        className="flex h-16 w-16 items-center justify-center rounded-full border border-[var(--accent)]/40 bg-white/75 p-4 text-[var(--accent)] shadow-[0_10px_30px_-15px_var(--accent)] backdrop-blur-sm"
      >
        {children}
      </motion.div>

      <motion.div
        animate={{ opacity: [0.6, 1, 0.6] }}
        transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}
        className="absolute -right-1 -top-1 flex h-6 w-6 items-center justify-center rounded-full border border-[var(--accent)]/50 bg-navy text-[var(--accent)] shadow-sm"
      >
        <Badge size={11} strokeWidth={2} />
      </motion.div>
    </div>
  );
}
