import { motion } from 'framer-motion';
import { ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';
import { SectionHeading } from '@/components/ui/SectionHeading';
import { Button } from '@/components/ui/Button';
import { departments, getEventsForDepartment } from '@/data/departments';
import { getIcon } from '@/utils/icons';

export function DepartmentsPreview() {
  return (
    <section className="relative overflow-hidden bg-cream py-24">
      <div className="absolute inset-0 bp-grid-bg opacity-30" />
      <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <SectionHeading
          eyebrow="Explore By Discipline"
          title="Departments"
          subtitle="Every branch of engineering has a stage at Porikkalam."
        />

        <div className="mt-14 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {departments.map((department, index) => {
            const Icon = getIcon(department.icon);
            const count = getEventsForDepartment(department.id).length;
            return (
              <motion.div
                key={department.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.4 }}
                transition={{ duration: 0.45, delay: index * 0.06 }}
                whileHover={{ y: -6 }}
              >
                <Link
                  to={`/departments/${department.id}`}
                  className="group flex h-full flex-col gap-3 border border-navy/15 bg-white/40 p-6 transition-colors hover:border-gold"
                >
                  <div className="flex h-12 w-12 items-center justify-center border border-gold/50 text-brown transition-colors group-hover:bg-gold group-hover:text-navy">
                    <Icon size={22} strokeWidth={1.5} />
                  </div>
                  <h4 className="font-heading text-lg font-semibold tracking-wide text-navy">
                    {department.name}
                  </h4>
                  <span className="mt-auto font-body text-xs font-semibold uppercase tracking-wide text-slate/70">
                    {count} {count === 1 ? 'Event' : 'Events'}
                  </span>
                </Link>
              </motion.div>
            );
          })}
        </div>

        <div className="mt-12 flex justify-center">
          <Button to="/departments" variant="outline" icon={<ArrowRight size={16} />}>
            View All Departments
          </Button>
        </div>
      </div>
    </section>
  );
}
