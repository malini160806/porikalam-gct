import { useMemo, useState } from 'react';
import { motion } from 'framer-motion';
import { PageHero } from '@/components/common/PageHero';
import { Tabs } from '@/components/ui/Tabs';
import { SearchBar } from '@/components/ui/SearchBar';
import { Accordion } from '@/components/ui/Accordion';
import { faqs } from '@/data/faq';
import type { FaqItem } from '@/data/types';

const CATEGORY_LABELS: Record<FaqItem['category'], string> = {
  registration: 'Registration',
  payments: 'Payments',
  certificates: 'Certificates',
  accommodation: 'Accommodation',
  rules: 'Rules',
  general: 'General',
};

const FILTERS: { label: string; value: 'all' | FaqItem['category'] }[] = [
  { label: 'All', value: 'all' },
  ...Array.from(new Set(faqs.map((f) => f.category))).map((category) => ({
    label: CATEGORY_LABELS[category],
    value: category,
  })),
];

export default function Faq() {
  const [filter, setFilter] = useState<'all' | FaqItem['category']>('all');
  const [query, setQuery] = useState('');

  const filtered = useMemo(() => {
    const normalizedQuery = query.trim().toLowerCase();
    return faqs.filter((item) => {
      const matchesFilter = filter === 'all' || item.category === filter;
      const matchesQuery =
        !normalizedQuery ||
        [item.question, item.answer].some((field) => field.toLowerCase().includes(normalizedQuery));
      return matchesFilter && matchesQuery;
    });
  }, [filter, query]);

  return (
    <>
      <PageHero title="FAQ" subtitle="Answers to the questions we hear most." />

      <section className="bg-cream py-24">
        <div className="mx-auto max-w-3xl px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col items-center gap-6">
            <Tabs options={FILTERS} value={filter} onChange={setFilter} />
            <SearchBar
              className="w-full max-w-md"
              placeholder="Search questions..."
              value={query}
              onChange={(e) => setQuery(e.target.value)}
            />
          </div>

          {filtered.length > 0 ? (
            <div className="mt-14">
              <Accordion items={filtered} />
            </div>
          ) : (
            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="mt-16 text-center font-body text-sm text-slate"
            >
              No questions match your search. Try a different keyword or category.
            </motion.p>
          )}
        </div>
      </section>
    </>
  );
}
