import { motion } from 'framer-motion';
import { PageHero } from '@/components/common/PageHero';
import { departments, getEventsForDepartment } from '@/data/departments';
import { getIcon } from '@/utils/icons';
import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';
import departmentPanorama from '@/assets/hero/department-panorama.jpg';

export default function Departments() {
  return (
    <div className="relative">
      <div className="fixed inset-0 -z-10 overflow-hidden">
        <motion.img
          src={departmentPanorama}
          alt=""
          aria-hidden="true"
          initial={{ opacity: 0, scale: 1.15 }}
          animate={{ opacity: 1, scale: [1.15, 1, 1.06, 1] }}
          transition={{
            opacity: { duration: 2, ease: 'easeOut' },
            scale: { duration: 26, times: [0, 0.08, 0.54, 1], repeat: Infinity, ease: 'easeInOut' },
          }}
          className="h-full w-full object-cover"
        />
        <div className="absolute inset-0 bg-cream/30" />
      </div>

      <PageHero
        title="Departments"
        subtitle="Explore events by engineering discipline."
        backgroundImage={departmentPanorama}
        heroTone="light"
      />

      <section className="relative bg-cream/70 py-24">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
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
                    className="group flex h-full flex-col gap-4 border border-navy/15 bg-white/40 p-7 transition-colors hover:border-gold"
                  >
                    <div className="flex h-14 w-14 items-center justify-center border border-gold/50 text-brown transition-colors group-hover:bg-gold group-hover:text-navy">
                      <Icon size={26} strokeWidth={1.5} />
                    </div>
                    <div>
                      <h3 className="font-heading text-2xl font-semibold tracking-wide text-navy">
                        {department.name}
                      </h3>
                      <p className="font-body text-xs font-semibold uppercase tracking-wider text-brown">
                        {department.fullName}
                      </p>
                    </div>
                    <p className="font-body text-sm text-slate leading-relaxed">{department.description}</p>
                    <div className="mt-auto flex items-center justify-between pt-2">
                      <span className="font-body text-xs font-semibold uppercase tracking-wide text-slate/70">
                        {count} {count === 1 ? 'Event' : 'Events'}
                      </span>
                      <ArrowRight size={16} className="text-gold transition-transform group-hover:translate-x-1" />
                    </div>
                  </Link>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>
    </div>
  );
}
