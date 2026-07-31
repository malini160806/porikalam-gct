import { SectionHeading } from '@/components/ui/SectionHeading';
import { Timeline } from '@/components/ui/Timeline';
import { timeline } from '@/data/statistics';

export function TimelineSection() {
  return (
    <section className="bg-beige/40 py-24">
      <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
        <SectionHeading eyebrow="The Journey" title="Event Timeline" />
        <div className="mt-16">
          <Timeline steps={timeline} />
        </div>
      </div>
    </section>
  );
}
