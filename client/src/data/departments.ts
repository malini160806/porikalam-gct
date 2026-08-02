import type { DepartmentInfo, EventItem } from './types';
import { events } from './events';

/** The 7 department groupings shown across Departments/Workshops — tagMatches map onto the tags already present in events.ts. */
export const departments: DepartmentInfo[] = [
  {
    id: 'civil',
    name: 'Civil',
    fullName: 'Civil Engineering',
    icon: 'landmark',
    description: 'Structures, site management, and the craft of building what lasts.',
    tagMatches: ['Civil Engineering'],
  },
  {
    id: 'mechanical',
    name: 'Mechanical',
    fullName: 'Mechanical & Production Engineering',
    icon: 'cog',
    description: 'Machines, automotive systems, and manufacturing challenges.',
    tagMatches: ['Mechanical', 'Production'],
  },
  {
    id: 'eee',
    name: 'EEE',
    fullName: 'Electrical & Electronics Engineering',
    icon: 'circuit-board',
    description: 'Power systems, circuits, and instrumentation in action.',
    tagMatches: ['EEE', 'EIE'],
  },
  {
    id: 'ece',
    name: 'ECE',
    fullName: 'Electronics & Communication Engineering',
    icon: 'circuit-board',
    description: 'Signal, circuit, and communication-systems engineering.',
    tagMatches: ['ECE'],
  },
  {
    id: 'cs',
    name: 'CS',
    fullName: 'Computer Science & Information Technology',
    icon: 'terminal-square',
    description: 'Code, systems, and software built under pressure.',
    tagMatches: ['CSE', 'IT'],
  },
  {
    id: 'aiml',
    name: 'AI & ML',
    fullName: 'Artificial Intelligence & Machine Learning',
    icon: 'brain-circuit',
    description: 'Intelligent systems, models, and the frontier of automation.',
    tagMatches: ['AI/ML'],
  },
  {
    id: 'open',
    name: 'Open Events',
    fullName: 'Open to All Departments',
    icon: 'compass',
    description: 'Cross-disciplinary events open to every engineering background.',
    tagMatches: ['Open to All'],
  },
];

export function getEventsForDepartment(id: string): EventItem[] {
  const department = departments.find((d) => d.id === id);
  if (!department) return [];
  return events.filter((event) => event.tags.some((tag) => department.tagMatches.includes(tag)));
}
