import { useState, type FormEvent } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { Building2, Hotel, Bus, MapPinned, CheckCircle2, XCircle } from 'lucide-react';
import { PageHero } from '@/components/common/PageHero';
import { SectionHeading } from '@/components/ui/SectionHeading';
import { Accordion } from '@/components/ui/Accordion';
import { Input, Select } from '@/components/ui/Input';
import { Button } from '@/components/ui/Button';
import { SITE } from '@/constants/site';
import { faqs } from '@/data/faq';

type AccommodationChoice = 'yes' | 'no';

const CHOICES: {
  value: AccommodationChoice;
  icon: typeof Building2;
  title: string;
  description: string;
}[] = [
  {
    value: 'yes',
    icon: Building2,
    title: 'Yes, I Need Accommodation',
    description: "I'll be travelling from outside Coimbatore and need a place to stay.",
  },
  {
    value: 'no',
    icon: XCircle,
    title: 'No, I Have My Own Arrangements',
    description: "I'm a local participant or I've already sorted my stay.",
  },
];

const GENDER_OPTIONS = ['Male', 'Female', 'Other'];

type RequestDetails = { headcount: string; gender: string; phone: string };

const EMPTY_REQUEST: RequestDetails = { headcount: '1', gender: '', phone: '' };

function AccommodationRequestForm() {
  const [details, setDetails] = useState<RequestDetails>(EMPTY_REQUEST);
  const [submitted, setSubmitted] = useState(false);

  function updateField<K extends keyof RequestDetails>(key: K, value: RequestDetails[K]) {
    setDetails((prev) => ({ ...prev, [key]: value }));
  }

  function handleSubmit(event: FormEvent) {
    event.preventDefault();
    setSubmitted(true);
  }

  if (submitted) {
    const count = Number(details.headcount) || 1;
    return (
      <motion.div
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3 }}
        className="mt-8 flex items-start gap-3 border border-gold/40 bg-white/60 p-5"
      >
        <CheckCircle2 size={20} className="mt-0.5 shrink-0 text-brown" />
        <p className="font-body text-sm text-navy">
          Request noted for <strong>{count}</strong> {count === 1 ? 'person' : 'people'}
          {details.gender && <> ({details.gender})</>}. We'll reach out on <strong>{details.phone}</strong>{' '}
          once on-campus accommodation requests officially open.
        </p>
      </motion.div>
    );
  }

  return (
    <motion.form
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
      onSubmit={handleSubmit}
      className="mt-8 flex flex-col gap-5 border border-gold/40 bg-white/60 p-6"
    >
      <div className="flex items-start gap-3">
        <CheckCircle2 size={20} className="mt-0.5 shrink-0 text-brown" />
        <p className="font-body text-sm text-navy">
          Noted! Share a few details so we can plan on-campus accommodation for you.
        </p>
      </div>

      <div className="grid grid-cols-1 gap-5 sm:grid-cols-3">
        <Input
          label="Number of People"
          type="number"
          min={1}
          max={10}
          required
          value={details.headcount}
          onChange={(e) => updateField('headcount', e.target.value)}
        />
        <Select
          label="Gender"
          required
          value={details.gender}
          onChange={(e) => updateField('gender', e.target.value)}
        >
          <option value="" disabled>
            Select gender
          </option>
          {GENDER_OPTIONS.map((option) => (
            <option key={option} value={option}>
              {option}
            </option>
          ))}
        </Select>
        <Input
          label="Phone Number"
          type="tel"
          required
          placeholder="10-digit mobile number"
          value={details.phone}
          onChange={(e) => updateField('phone', e.target.value.replace(/[^\d]/g, ''))}
        />
      </div>

      <div>
        <Button type="submit" variant="primary">
          Save Details
        </Button>
      </div>
    </motion.form>
  );
}

const INFO_CARDS = [
  {
    icon: Building2,
    title: 'Hostel Accommodation',
    description:
      'On-campus hostel accommodation is available for outstation participants on a request basis, subject to availability. Requests can be raised from your Dashboard once registration opens.',
  },
  {
    icon: Hotel,
    title: 'Hotels Nearby',
    description:
      'A curated list of budget-friendly and premium hotels near campus will be published closer to the event for participants who prefer off-campus stays.',
  },
  {
    icon: Bus,
    title: 'Transportation',
    description:
      'Coimbatore is well connected by rail, road, and air. Shuttle information from major transit points to campus will be shared with registered participants.',
  },
  {
    icon: MapPinned,
    title: 'Campus Map',
    description:
      'A detailed campus map covering all venues, hostels, and facilities is available on the Resources page.',
  },
];

const accommodationFaqs = faqs.filter((f) => f.category === 'accommodation');

export default function Accommodation() {
  const [choice, setChoice] = useState<AccommodationChoice | null>(null);

  return (
    <>
      <PageHero title="Accommodation" subtitle="Everything outstation participants need to plan their stay." />

      <section className="bg-cream py-24">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {INFO_CARDS.map((card, index) => (
              <motion.div
                key={card.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.4 }}
                transition={{ duration: 0.45, delay: index * 0.08 }}
                className="flex flex-col gap-3 border border-navy/15 bg-white/40 p-6"
              >
                <card.icon size={26} className="text-gold" strokeWidth={1.5} />
                <h3 className="font-heading text-lg font-semibold tracking-wide text-navy">{card.title}</h3>
                <p className="font-body text-sm text-slate leading-relaxed">{card.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-beige/30 py-24">
        <div className="mx-auto max-w-3xl px-4 sm:px-6 lg:px-8">
          <SectionHeading eyebrow="Plan Ahead" title="Do You Need Accommodation?" />

          <div className="mt-12 grid grid-cols-1 gap-6 sm:grid-cols-2">
            {CHOICES.map((option) => {
              const isSelected = choice === option.value;
              return (
                <button
                  key={option.value}
                  type="button"
                  onClick={() => setChoice(option.value)}
                  aria-pressed={isSelected}
                  className={`flex flex-col items-center gap-3 border p-8 text-center transition-colors duration-200 ${
                    isSelected
                      ? 'border-gold bg-navy text-cream shadow-card'
                      : 'border-navy/20 bg-white/50 text-navy hover:border-gold/60'
                  }`}
                >
                  <option.icon
                    size={28}
                    strokeWidth={1.5}
                    className={isSelected ? 'text-gold' : 'text-brown'}
                  />
                  <span className="font-heading text-lg font-semibold tracking-wide">{option.title}</span>
                  <span className={`font-body text-sm ${isSelected ? 'text-beige/80' : 'text-slate'}`}>
                    {option.description}
                  </span>
                </button>
              );
            })}
          </div>

          <AnimatePresence mode="wait">
            {choice === 'yes' && <AccommodationRequestForm key="yes" />}
            {choice === 'no' && (
              <motion.div
                key="no"
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -12 }}
                transition={{ duration: 0.3 }}
                className="mt-8 flex items-start gap-3 border border-gold/40 bg-white/60 p-5"
              >
                <CheckCircle2 size={20} className="mt-0.5 shrink-0 text-brown" />
                <p className="font-body text-sm text-navy">
                  Got it — no accommodation request needed. You can change this anytime from your Dashboard.
                </p>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </section>

      <section className="bg-navy py-24">
        <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
          <SectionHeading eyebrow="Locate Us" title="Campus Location" tone="dark" />
          <div className="mt-10 border border-gold/30 bg-navy p-2 shadow-card">
            <iframe
              title="Government College of Technology, Coimbatore — location map"
              src={`https://maps.google.com/maps?q=${encodeURIComponent(`${SITE.college}, ${SITE.location}`)}&z=15&output=embed`}
              className="h-80 w-full grayscale-[35%] sm:h-96"
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
            />
          </div>
        </div>
      </section>

      {accommodationFaqs.length > 0 && (
        <section className="bg-cream py-24">
          <div className="mx-auto max-w-3xl px-4 sm:px-6 lg:px-8">
            <SectionHeading eyebrow="Questions" title="Accommodation FAQ" />
            <div className="mt-12">
              <Accordion items={accommodationFaqs} />
            </div>
          </div>
        </section>
      )}
    </>
  );
}
