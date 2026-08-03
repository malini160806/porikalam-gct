import { motion } from 'framer-motion';
import { Quote } from 'lucide-react';
import { SectionHeading } from '@/components/ui/SectionHeading';
import { testimonials } from '@/data/testimonials';

export function TestimonialsSection() {
  return (
    <section className="relative overflow-hidden bg-navy py-24">
      <div className="absolute inset-0 bp-grid-bg opacity-[0.2]" />
      <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <SectionHeading eyebrow="Voices Of Porikkalam" title="Testimonials" tone="dark" />

        <div className="mt-14 grid grid-cols-1 gap-6 sm:grid-cols-3">
          {testimonials.map((testimonial, index) => (
            <motion.div
              key={testimonial.id}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.4 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="flex flex-col gap-4 border border-gold/25 bg-charcoal p-6 shadow-card"
            >
              <Quote size={22} className="text-gold" />
              <p className="font-quote text-base italic leading-relaxed text-beige/85">
                "{testimonial.quote}"
              </p>
              <div className="mt-auto flex items-center gap-3 border-t border-gold/15 pt-4">
                <div className="flex h-10 w-10 items-center justify-center rounded-full border border-gold/50 font-heading text-sm text-gold">
                  {testimonial.initials}
                </div>
                <div>
                  <p className="font-body text-sm font-semibold text-cream">{testimonial.name}</p>
                  <p className="font-body text-xs text-beige/60">{testimonial.role}</p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
