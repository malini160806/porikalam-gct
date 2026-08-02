import { motion } from 'framer-motion';
import { Divider } from './Divider';

type SectionHeadingProps = {
  eyebrow?: string;
  title: string;
  subtitle?: string;
  align?: 'center' | 'left';
  tone?: 'light' | 'dark';
};

export function SectionHeading({
  eyebrow,
  title,
  subtitle,
  align = 'center',
  tone = 'light',
}: SectionHeadingProps) {
  const alignment = align === 'center' ? 'items-center text-center mx-auto' : 'items-start text-left';
  const titleColor = tone === 'light' ? 'text-navy' : 'text-cream';
  const subColor = tone === 'light' ? 'text-slate' : 'text-beige';

  return (
    <motion.div
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.4 }}
      transition={{ duration: 0.6, ease: 'easeOut' }}
      className={`flex flex-col gap-3 max-w-2xl ${alignment}`}
    >
      {eyebrow && (
        <span className="font-body text-xs font-bold uppercase tracking-[0.3em] text-brown">
          {eyebrow}
        </span>
      )}
      <h2 className={`font-heading text-4xl font-bold tracking-wide sm:text-5xl ${titleColor}`}>
        {title}
      </h2>
      <Divider />
      {subtitle && (
        <p className={`font-quote text-lg italic sm:text-xl ${subColor}`}>{subtitle}</p>
      )}
    </motion.div>
  );
}
