import { ClipboardList, CalendarCheck, Bell, CheckSquare } from 'lucide-react';
import { PageHero } from '@/components/common/PageHero';
import { SectionHeading } from '@/components/ui/SectionHeading';
import { Button } from '@/components/ui/Button';
import { CornerOrnament } from '@/components/common/CornerOrnament';

const PREVIEW_TILES = [
  { icon: ClipboardList, label: 'Assigned Tasks' },
  { icon: CalendarCheck, label: 'My Schedule' },
  { icon: CheckSquare, label: 'Attendance' },
  { icon: Bell, label: 'Announcements' },
];

export default function VolunteerPortal() {
  return (
    <>
      <PageHero title="Volunteer Portal" subtitle="Be part of the team that makes Porikkalam happen." />

      <section className="relative overflow-hidden bg-navy py-24">
        <div className="relative mx-auto max-w-3xl px-4 py-8 text-center sm:px-6 lg:px-8">
          <CornerOrnament corner="top-left" className="opacity-40" />
          <CornerOrnament corner="bottom-right" className="opacity-40" />
          <div className="relative z-10 flex flex-col items-center gap-6">
            <SectionHeading
              eyebrow="Join The Crew"
              title="Apply to Volunteer"
              subtitle="Help run events, coordinate logistics, and welcome participants from colleges across the region."
              tone="dark"
            />
            <Button to="/contact" variant="primary" size="lg">
              Apply to Volunteer
            </Button>
          </div>
        </div>
      </section>

      <section className="bg-cream py-24">
        <div className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8">
          <SectionHeading
            eyebrow="Coming Soon"
            title="Volunteer Dashboard Preview"
            subtitle="Once you're onboarded, your dashboard will unlock the following."
          />
          <div className="mt-14 grid grid-cols-2 gap-6 sm:grid-cols-4">
            {PREVIEW_TILES.map((tile) => (
              <div
                key={tile.label}
                className="flex flex-col items-center gap-3 border border-navy/15 bg-white/30 px-4 py-8 text-center opacity-60"
              >
                <tile.icon size={26} className="text-gold" strokeWidth={1.5} />
                <span className="font-body text-xs font-semibold uppercase tracking-wide text-navy">
                  {tile.label}
                </span>
              </div>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
