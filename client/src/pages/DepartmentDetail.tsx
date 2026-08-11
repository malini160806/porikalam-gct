import { useParams } from 'react-router-dom';
import { PageHero } from '@/components/common/PageHero';
import { Divider } from '@/components/ui/Divider';
import { Button } from '@/components/ui/Button';
import { EventCard } from '@/components/cards/EventCard';
import { departments, getEventsForDepartment } from '@/data/departments';

export default function DepartmentDetail() {
  const { slug } = useParams<{ slug: string }>();
  const department = departments.find((d) => d.id === slug);

  if (!department) {
    return (
      <section className="flex min-h-[60vh] flex-col items-center justify-center gap-6 navy-paper px-4 py-24 text-center text-cream">
        <h1 className="font-heading text-3xl font-bold uppercase tracking-wide text-cream sm:text-4xl">
          Department Not Found
        </h1>
        <Divider />
        <p className="font-quote max-w-sm text-lg italic text-beige/85">
          We couldn't find that department. It may have been renamed or removed.
        </p>
        <Button to="/departments" variant="primary">
          Back to Departments
        </Button>
      </section>
    );
  }

  const events = getEventsForDepartment(department.id);

  return (
    <>
      <PageHero title={department.fullName} subtitle={department.description} />

      <section className="bg-cream py-20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          {events.length > 0 ? (
            <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
              {events.map((event, index) => (
                <EventCard key={event.id} event={event} index={index} />
              ))}
            </div>
          ) : (
            <p className="text-center font-body text-sm text-slate">
              No events listed for this department yet. Check back soon.
            </p>
          )}
        </div>
      </section>
    </>
  );
}
