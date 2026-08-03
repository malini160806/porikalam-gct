import { ArrowRight } from 'lucide-react';
import { SectionHeading } from '@/components/ui/SectionHeading';
import { Accordion } from '@/components/ui/Accordion';
import { Button } from '@/components/ui/Button';
import { faqs } from '@/data/faq';

const featured = faqs.slice(0, 4);

export function FaqPreview() {
  return (
    <section className="bg-cream py-24">
      <div className="mx-auto max-w-3xl px-4 sm:px-6 lg:px-8">
        <SectionHeading eyebrow="Questions" title="Frequently Asked Questions" />

        <div className="mt-12">
          <Accordion items={featured} />
        </div>

        <div className="mt-10 flex justify-center">
          <Button to="/faq" variant="outline" icon={<ArrowRight size={16} />}>
            View All FAQs
          </Button>
        </div>
      </div>
    </section>
  );
}
