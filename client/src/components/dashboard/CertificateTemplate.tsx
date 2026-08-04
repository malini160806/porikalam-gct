import { Settings as GearIcon } from 'lucide-react';
import { CornerOrnament } from '@/components/common/CornerOrnament';
import { SITE } from '@/constants/site';

type CertificateTemplateProps = {
  participantName: string;
};

export function CertificateTemplate({ participantName }: CertificateTemplateProps) {
  return (
    <div className="relative mx-auto w-full max-w-2xl overflow-hidden border-2 border-gold/60 bg-cream p-5 text-center shadow-card sm:p-10 lg:p-14">
      <div className="pointer-events-none absolute inset-0 border border-tech-blue/25" />
      <div
        className="pointer-events-none absolute -right-10 -top-10 h-48 w-48 rounded-full opacity-20"
        style={{ background: 'radial-gradient(circle, var(--color-tech-blue) 0%, transparent 70%)' }}
      />
      <div
        className="pointer-events-none absolute -bottom-10 -right-10 h-40 w-40 rounded-full opacity-15"
        style={{ background: 'radial-gradient(circle, var(--color-future-purple) 0%, transparent 70%)' }}
      />
      <CornerOrnament corner="top-left" variant="scroll" />
      <CornerOrnament corner="bottom-left" variant="floral" />

      <div className="relative flex flex-col items-center gap-3">
        <span className="font-body text-xs font-semibold uppercase tracking-[0.3em] text-brown">
          {SITE.name} {SITE.year}
        </span>
        <h2 className="font-heading text-4xl font-bold uppercase tracking-wide text-navy sm:text-5xl">
          Certificate
        </h2>
        <p className="font-body text-sm font-semibold uppercase tracking-[0.35em] text-slate">
          Of Participation
        </p>

        <p className="mt-8 font-quote text-base italic text-slate">Presented to</p>
        <p className="min-w-[min(16rem,80vw)] border-b border-navy/30 pb-2 font-heading text-xl font-semibold tracking-wide text-navy sm:text-2xl">
          {participantName}
        </p>

        <div className="mt-10 flex w-full flex-col items-center gap-6 sm:flex-row sm:items-end sm:justify-between">
          <div className="flex flex-col items-center gap-1 sm:items-start">
            <div className="h-px w-24 bg-navy/30 sm:w-32" />
            <span className="font-body text-xs uppercase tracking-wide text-slate/70">Organizing Committee</span>
          </div>
          <div className="flex flex-col items-center gap-1">
            <div className="flex h-12 w-12 items-center justify-center rounded-full border border-gold/60 text-gold">
              <GearIcon size={22} strokeWidth={1.5} />
            </div>
            <span className="font-heading text-sm font-semibold tracking-wide text-navy">
              {SITE.name} {SITE.year}
            </span>
            <span className="font-body text-[10px] uppercase tracking-widest text-slate/60">
              {SITE.tagline}
            </span>
          </div>
          <div className="flex flex-col items-center gap-1 sm:items-end">
            <div className="h-px w-24 bg-navy/30 sm:w-32" />
            <span className="font-body text-xs uppercase tracking-wide text-slate/70">Principal</span>
          </div>
        </div>
      </div>
    </div>
  );
}
