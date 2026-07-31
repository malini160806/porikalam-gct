import {
  Cpu,
  Wrench,
  TerminalSquare,
  Lightbulb,
  ScrollText,
  Code2,
  Gamepad2,
  Camera,
  Map,
} from 'lucide-react';
import { WorkshopCard } from '@/components/cards/WorkshopCard';
import { SectionHeading } from '@/components/ui/SectionHeading';
import { Button } from '@/components/ui/Button';

const categories = [
  { icon: Cpu, title: 'Technical Events', description: 'Explore a wide range of engineering competitions and challenges.' },
  { icon: Wrench, title: 'Workshops', description: 'Build, learn and master new skills with expert mentors.' },
  { icon: TerminalSquare, title: 'Hackathons', description: 'Overnight sprints to design, build, and ship real solutions.' },
  { icon: Lightbulb, title: 'Project Expo', description: 'Showcase working prototypes and innovative engineering marvels.' },
  { icon: ScrollText, title: 'Paper Presentation', description: 'Present original research before an expert faculty panel.' },
  { icon: Code2, title: 'Coding', description: 'Speed coding, debugging, and algorithmic problem solving.' },
  { icon: Gamepad2, title: 'Gaming', description: 'Bracket-style eliminations across popular competitive titles.' },
  { icon: Camera, title: 'Photography', description: 'Capture the spirit of the fest through a themed photo trail.' },
  { icon: Map, title: 'Treasure Hunt', description: 'Decode heritage-inspired riddles across the campus.' },
];

export function EventCategories() {
  return (
    <section className="relative bg-navy py-24">
      <div className="absolute inset-0 bp-grid-bg opacity-[0.25]" />
      <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <SectionHeading
          eyebrow="What's In Store"
          title="Event Categories"
          subtitle="From battle-ready robots to heritage trails — nine ways to compete, create, and conquer."
          tone="dark"
        />

        <div className="mt-14 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {categories.map((category, index) => (
            <WorkshopCard
              key={category.title}
              icon={category.icon}
              title={category.title}
              description={category.description}
              href="/events"
              index={index}
            />
          ))}
        </div>

        <div className="mt-14 flex justify-center">
          <Button to="/events" variant="primary" size="md">
            View All Events
          </Button>
        </div>
      </div>
    </section>
  );
}
