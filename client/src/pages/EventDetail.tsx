import { useParams } from 'react-router-dom';
import { motion } from 'framer-motion';
import {
  Clock,
  MapPin,
  ShieldCheck,
  Users,
  Wrench,
} from 'lucide-react';

import { PageHero } from '@/components/common/PageHero';
import { Badge } from '@/components/ui/Badge';
import { PageLoader } from '@/components/common/PageLoader';
import { EventRegistrationAction } from '@/components/events/EventRegistrationAction';
import { getEventIconComponent } from '@/components/icons/EventIcons';
import { EVENT_CATEGORY_LABELS } from '@/data/eventMeta';
import { useEvent } from '@/hooks/useEvents';
import NotFound from './NotFound';

function DetailRow({
  icon,
  label,
  value,
}: {
  icon: React.ReactNode;
  label: string;
  value: string;
}) {
  return (
    <div className="group flex items-start gap-3 border-b border-brown/15 pb-4 last:border-b-0 last:pb-0">
      <div className="mt-0.5 shrink-0 text-brown">
        {icon}
      </div>

      <div className="min-w-0">
        <span className="block font-body text-[10px] font-bold uppercase tracking-[0.18em] text-brown/80">
          {label}
        </span>

        <span className="mt-1 block font-body text-sm leading-relaxed text-navy">
          {value}
        </span>
      </div>
    </div>
  );
}

export default function EventDetail() {
  const { eventId } = useParams<{ eventId: string }>();
  const { event, loading } = useEvent(eventId);

  if (loading) {
    return <PageLoader />;
  }

  if (!event) {
    return <NotFound />;
  }

  const Icon = getEventIconComponent(event.icon);

  return (
    <>
      {/* EVENT HERO */}
      <PageHero
        title={event.title}
        subtitle={EVENT_CATEGORY_LABELS[event.category]}
        backgroundImage={event.poster}
      />

      <section className="bg-cream py-14 sm:py-16 lg:py-20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">

          {/* EVENT HEADER */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="mb-10"
          >
            <div className="flex flex-col gap-5 sm:flex-row sm:items-center sm:justify-between">

              <div className="flex items-center gap-4">
                <div className="flex h-16 w-16 shrink-0 items-center justify-center border border-brown/40 bg-white/60 p-3 text-brown shadow-[0_0_20px_-5px_rgba(139,115,51,0.35)]">
                  <Icon
                    className="h-full w-full"
                    strokeWidth={1.5}
                  />
                </div>

                <div>
                  <p className="font-body text-[10px] font-bold uppercase tracking-[0.25em] text-brown">
                    Event Details
                  </p>

                  <h2 className="mt-1 font-heading text-2xl font-bold tracking-wide text-navy sm:text-3xl">
                    {event.title}
                  </h2>
                </div>
              </div>

              <div className="flex flex-wrap gap-2">
                <Badge variant="navy">
                  {EVENT_CATEGORY_LABELS[event.category]}
                </Badge>

                <Badge variant="gold">
                  {event.format === 'team'
                    ? 'Team Event'
                    : 'Individual Event'}
                </Badge>
              </div>
            </div>
          </motion.div>

          {/* MAIN CONTENT */}
          <div className="grid items-start gap-8 lg:grid-cols-[minmax(0,1.7fr)_minmax(320px,0.9fr)]">

            {/* LEFT CONTENT */}
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5 }}
              className="space-y-8"
            >

              {/* ABOUT EVENT */}
              <div className="relative border border-brown/20 bg-white/50 p-6 shadow-[0_8px_30px_-20px_rgba(15,35,50,0.35)] sm:p-8">
                <div className="absolute left-0 top-0 h-full w-1 bg-brown/60" />

                <p className="font-body text-[10px] font-bold uppercase tracking-[0.25em] text-brown">
                  About The Event
                </p>

                <h3 className="mt-2 font-heading text-2xl font-semibold tracking-wide text-navy">
                  {event.title}
                </h3>

                <p className="mt-5 font-body text-base leading-8 text-slate">
                  {event.description}
                </p>
              </div>

              {/* EVENT HIGHLIGHTS */}
              <div className="border border-brown/20 bg-white/40 p-6 sm:p-8">
                <div className="mb-6 flex items-center gap-3">
                  <div className="h-px flex-1 bg-brown/20" />

                  <h3 className="font-heading text-lg font-semibold uppercase tracking-wider text-navy">
                    Event Highlights
                  </h3>

                  <div className="h-px flex-1 bg-brown/20" />
                </div>

                <div className="grid gap-4 sm:grid-cols-2">

                  {/* DURATION */}
                  <div className="border border-brown/15 bg-cream/60 p-5 transition-all duration-300 hover:-translate-y-1 hover:border-brown/40">
                    <Clock
                      size={22}
                      className="text-brown"
                      strokeWidth={1.5}
                    />

                    <p className="mt-3 font-body text-[10px] font-bold uppercase tracking-widest text-brown">
                      Duration
                    </p>

                    <p className="mt-1 font-heading text-lg text-navy">
                      {event.duration}
                    </p>
                  </div>

                  {/* TEAM SIZE */}
                  <div className="border border-brown/15 bg-cream/60 p-5 transition-all duration-300 hover:-translate-y-1 hover:border-brown/40">
                    <Users
                      size={22}
                      className="text-brown"
                      strokeWidth={1.5}
                    />

                    <p className="mt-3 font-body text-[10px] font-bold uppercase tracking-widest text-brown">
                      Team Size
                    </p>

                    <p className="mt-1 font-heading text-lg text-navy">
                      {event.format === 'team'
                        ? `Team of ${event.teamSize}`
                        : 'Individual'}
                    </p>
                  </div>

                  {/* LOCATION */}
                  <div className="border border-brown/15 bg-cream/60 p-5 transition-all duration-300 hover:-translate-y-1 hover:border-brown/40">
                    <MapPin
                      size={22}
                      className="text-brown"
                      strokeWidth={1.5}
                    />

                    <p className="mt-3 font-body text-[10px] font-bold uppercase tracking-widest text-brown">
                      Location
                    </p>

                    <p className="mt-1 font-heading text-lg text-navy">
                      {event.venue}
                    </p>
                  </div>

                  {/* REGISTRATION LIMIT */}
                  <div className="border border-brown/15 bg-cream/60 p-5 transition-all duration-300 hover:-translate-y-1 hover:border-brown/40">
                    <Users
                      size={22}
                      className="text-brown"
                      strokeWidth={1.5}
                    />

                    <p className="mt-3 font-body text-[10px] font-bold uppercase tracking-widest text-brown">
                      Registration Limit
                    </p>

                    <p className="mt-1 font-heading text-lg text-navy">
                      {event.expectedParticipants} Participants
                    </p>
                  </div>
                </div>
              </div>

              {/* WHY THIS EVENT */}
              {event.whyIncluded && (
                <div className="relative border border-brown/20 bg-white/50 p-6 sm:p-8">
                  <div className="absolute right-0 top-0 h-1 w-24 bg-brown/50" />

                  <p className="font-body text-[10px] font-bold uppercase tracking-[0.25em] text-brown">
                    Event Information
                  </p>

                  <h3 className="mt-2 font-heading text-xl font-semibold tracking-wide text-navy">
                    Why This Event Is Included
                  </h3>

                  <p className="mt-4 font-body text-sm leading-7 text-slate">
                    {event.whyIncluded}
                  </p>
                </div>
              )}
            </motion.div>
            {/* RIGHT SIDEBAR */}
            <motion.aside
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5, delay: 0.1 }}
              className="lg:sticky lg:top-24"
            >
              <div className="overflow-hidden border border-brown/30 bg-white/60 shadow-[0_12px_40px_-25px_rgba(15,35,50,0.45)]">

                {/* SIDEBAR HEADER */}
                <div className="border-b border-brown/20 bg-navy px-6 py-5">
                  <p className="font-body text-[10px] font-bold uppercase tracking-[0.25em] text-gold">
                    Event Information
                  </p>

                  <h3 className="mt-1 font-heading text-xl font-semibold text-cream">
                    {event.title}
                  </h3>
                </div>

                {/* EVENT DETAILS */}
                <div className="space-y-4 p-6">

                  <DetailRow
                    icon={<ShieldCheck size={17} />}
                    label="Eligibility"
                    value={event.eligibility}
                  />

                  <DetailRow
                    icon={<Users size={17} />}
                    label="Team Size"
                    value={
                      event.format === 'team'
                        ? `Team — ${event.teamSize}`
                        : 'Individual'
                    }
                  />

                  <DetailRow
                    icon={<ShieldCheck size={17} />}
                    label="Type"
                    value={
                      event.formatMode === 'competition'
                        ? 'Competition'
                        : 'Participation'
                    }
                  />

                  <DetailRow
                    icon={<ShieldCheck size={17} />}
                    label="Prequalifier"
                    value={
                      event.prequalifierRequired
                        ? 'Required'
                        : 'Not Required'
                    }
                  />

                  <DetailRow
                    icon={<Clock size={17} />}
                    label="Duration"
                    value={event.duration}
                  />

                  <DetailRow
                    icon={<Users size={17} />}
                    label="Registration Limit"
                    value={`${event.expectedParticipants} Participants`}
                  />

                  <DetailRow
                    icon={<MapPin size={17} />}
                    label="Location"
                    value={event.venue}
                  />

                  {/* RESOURCES */}
                  {event.resources && (
                    <DetailRow
                      icon={<Wrench size={17} />}
                      label="Resources"
                      value={event.resources}
                    />
                  )}
                </div>

                {/* REGISTRATION */}
                <div className="border-t border-brown/20 p-6">

                  {event.registrationFee && (
                    <div className="mb-4 flex items-center justify-between border border-brown/20 bg-cream/70 px-4 py-3">
                      <span className="font-body text-[10px] font-bold uppercase tracking-widest text-brown">
                        Registration Fee
                      </span>

                      <span className="font-heading text-lg font-bold text-navy">
                        {event.registrationFee}
                      </span>
                    </div>
                  )}

                  <EventRegistrationAction event={event} />
                </div>
              </div>
            </motion.aside>
          </div>
        </div>
      </section>
    </>
  );
}