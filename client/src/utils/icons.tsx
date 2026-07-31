import {
  Bot,
  Landmark,
  Code2,
  Compass,
  ScrollText,
  Lightbulb,
  TerminalSquare,
  Settings,
  BrainCircuit,
  Gamepad2,
  Camera,
  Map,
  Calendar,
  Users,
  Trophy,
  type LucideIcon,
} from 'lucide-react';

export const ICON_MAP: Record<string, LucideIcon> = {
  bot: Bot,
  landmark: Landmark,
  'code-2': Code2,
  compass: Compass,
  'scroll-text': ScrollText,
  lightbulb: Lightbulb,
  'terminal-square': TerminalSquare,
  settings: Settings,
  'brain-circuit': BrainCircuit,
  'gamepad-2': Gamepad2,
  camera: Camera,
  map: Map,
  calendar: Calendar,
  users: Users,
  trophy: Trophy,
};

export function getIcon(name: string): LucideIcon {
  return ICON_MAP[name] ?? Compass;
}
