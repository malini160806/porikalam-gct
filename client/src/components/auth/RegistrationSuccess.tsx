import { useState } from 'react';
import { motion } from 'framer-motion';
import { Check, Copy, Download, PartyPopper, QrCode, Settings as GearIcon } from 'lucide-react';
import { Button } from '@/components/ui/Button';
import { CornerOrnament } from '@/components/common/CornerOrnament';
import { SITE } from '@/constants/site';

interface RegistrationSuccessProps {
  username: string;
  fullName: string;
  onContinue: () => void;
}

export function RegistrationSuccess({ username, fullName, onContinue }: RegistrationSuccessProps) {
  const [copied, setCopied] = useState(false);

  async function handleCopy() {
    await navigator.clipboard.writeText(username);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  }

  async function handleDownloadPdf() {
    const { jsPDF } = await import('jspdf');
    const doc = new jsPDF();

    const navy: [number, number, number] = [0, 27, 42];
    const gold: [number, number, number] = [212, 175, 55];
    const cream: [number, number, number] = [245, 241, 232];
    const beige: [number, number, number] = [232, 217, 181];

    const x = 20;
    const y = 20;
    const w = 170;
    const h = 95;
    const perfY = y + 58;

    // Ticket body
    doc.setFillColor(...navy);
    doc.rect(x, y, w, h, 'F');
    doc.setDrawColor(...gold);
    doc.setLineWidth(0.8);
    doc.rect(x, y, w, h);

    // Header
    doc.setTextColor(...gold);
    doc.setFont('helvetica', 'bold');
    doc.setFontSize(17);
    doc.text(`${SITE.name} ${SITE.year}`, 105, y + 13, { align: 'center' });

    doc.setFont('helvetica', 'normal');
    doc.setFontSize(8);
    doc.setTextColor(...beige);
    doc.text(SITE.tagline.toUpperCase(), 105, y + 19, { align: 'center' });

    doc.setFontSize(9);
    doc.setTextColor(...gold);
    doc.text('ADMISSION PASS', 105, y + 29, { align: 'center' });

    doc.setFont('helvetica', 'bold');
    doc.setFontSize(20);
    doc.setTextColor(...cream);
    doc.text(fullName, 105, y + 41, { align: 'center' });

    doc.setFont('helvetica', 'normal');
    doc.setFontSize(9);
    doc.setTextColor(...beige);
    doc.text(`${SITE.college}  //  ${SITE.eventDateRange}`, 105, y + 49, { align: 'center' });

    // Perforation between the pass and the stub
    doc.setDrawColor(...cream);
    doc.setLineWidth(0.4);
    doc.setLineDashPattern([1.2, 1.2], 0);
    doc.line(x + 5, perfY, x + w - 5, perfY);
    doc.setLineDashPattern([], 0);
    doc.setFillColor(255, 255, 255);
    doc.circle(x, perfY, 3, 'F');
    doc.circle(x + w, perfY, 3, 'F');

    // Stub: username / barcode
    doc.setFont('helvetica', 'normal');
    doc.setFontSize(7.5);
    doc.setTextColor(...beige);
    doc.text('PARTICIPANT USERNAME', x + 8, perfY + 11);

    doc.setFont('helvetica', 'bold');
    doc.setFontSize(17);
    doc.setTextColor(...gold);
    doc.text(username, x + 8, perfY + 22);

    // Decorative barcode
    let barX = x + 8;
    const barY = perfY + 26;
    const barH = 8;
    for (let i = 0; i < username.length && barX < x + 100; i++) {
      const code = username.charCodeAt(i);
      const barW = code % 3 === 0 ? 1.4 : code % 2 === 0 ? 0.8 : 0.5;
      doc.setFillColor(...(code % 4 === 0 ? gold : cream));
      doc.rect(barX, barY, barW, barH, 'F');
      barX += barW + 0.6;
    }

    // Decorative QR placeholder
    const qrX = x + w - 34;
    const qrY = perfY + 6;
    const qrSize = 26;
    doc.setDrawColor(...cream);
    doc.setLineWidth(0.5);
    doc.rect(qrX, qrY, qrSize, qrSize);
    const finder = 5;
    doc.setFillColor(...cream);
    [
      [qrX + 1.5, qrY + 1.5],
      [qrX + qrSize - finder - 1.5, qrY + 1.5],
      [qrX + 1.5, qrY + qrSize - finder - 1.5],
    ].forEach(([fx, fy]) => doc.rect(fx, fy, finder, finder, 'F'));
    doc.setFillColor(...navy);
    [
      [qrX + 2.7, qrY + 2.7],
      [qrX + qrSize - finder + 0.3, qrY + 2.7],
      [qrX + 2.7, qrY + qrSize - finder + 0.3],
    ].forEach(([fx, fy]) => doc.rect(fx, fy, finder - 2.4, finder - 2.4, 'F'));

    doc.setFontSize(9);
    doc.setFont('helvetica', 'normal');
    doc.setTextColor(...navy);
    doc.text('Please keep this pass safe — you will need your username to log in', 20, y + h + 16);
    doc.text(`and register for events at ${SITE.name} ${SITE.year}.`, 20, y + h + 22);

    doc.save(`${username}-registration-pass.pdf`);
  }

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.96 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.4 }}
      className="mx-auto flex w-full max-w-md flex-col items-center gap-6 text-center"
    >
      <motion.div
        initial={{ scale: 0 }}
        animate={{ scale: 1 }}
        transition={{ delay: 0.15, type: 'spring', stiffness: 200 }}
        className="flex h-16 w-16 items-center justify-center rounded-full bg-gold/15 text-brown"
      >
        <PartyPopper size={30} />
      </motion.div>

      <div>
        <h2 className="font-heading text-3xl font-bold tracking-wide text-navy">
          Registration Successful!
        </h2>
        <p className="font-quote mt-2 text-lg italic text-slate">
          Welcome to {SITE.name} {SITE.year}, {fullName}.
        </p>
      </div>

      {/* The pass */}
      <motion.div
        initial={{ opacity: 0, y: 16, rotate: -2 }}
        animate={{ opacity: 1, y: 0, rotate: 0 }}
        transition={{ delay: 0.2, duration: 0.5 }}
        className="relative w-full max-w-sm overflow-hidden border border-gold/50 bg-gradient-to-br from-navy-deep via-navy to-tech-blue/40 text-cream shadow-card"
      >
        <div className="pointer-events-none absolute inset-0 bp-grid-bg opacity-[0.1]" />
        <CornerOrnament corner="top-left" size={44} opacity={0.7} />
        <CornerOrnament corner="top-right" size={44} opacity={0.7} />

        {/* Main stub */}
        <div className="relative flex flex-col items-center gap-2 px-6 pb-7 pt-8">
          <div className="flex items-center gap-2">
            <div className="flex h-8 w-8 items-center justify-center rounded-full border border-gold/60 text-gold">
              <GearIcon size={16} strokeWidth={1.5} />
            </div>
            <p className="font-heading text-sm font-bold tracking-wide text-gold">
              {SITE.name} {SITE.year}
            </p>
          </div>
          <p className="font-body text-[9px] uppercase tracking-widest text-beige/70">{SITE.tagline}</p>

          <p className="mt-3 font-body text-xs font-semibold uppercase tracking-[0.35em] text-gold">
            Admission Pass
          </p>
          <p className="font-heading text-2xl font-bold tracking-wide text-cream">{fullName}</p>
          <p className="font-body text-xs text-beige/75">
            {SITE.college} &middot; {SITE.eventDateRange}
          </p>
        </div>

        {/* Perforation */}
        <div className="relative flex items-center px-1">
          <span className="absolute -left-3 h-6 w-6 rounded-full bg-cream" />
          <div className="h-px flex-1 border-t-2 border-dashed border-cream/25" />
          <span className="absolute -right-3 h-6 w-6 rounded-full bg-cream" />
        </div>

        {/* Bottom stub */}
        <div className="relative flex items-center justify-between gap-4 px-6 py-5">
          <div className="min-w-0">
            <p className="font-body text-[9px] uppercase tracking-widest text-beige/60">
              Participant Username
            </p>
            <p className="mt-1 truncate font-heading text-xl font-bold tracking-[0.1em] text-gold">
              {username}
            </p>
            <div
              className="mt-2 h-4 w-32 opacity-80"
              style={{
                backgroundImage:
                  'repeating-linear-gradient(90deg, var(--color-cream) 0px, var(--color-cream) 1px, transparent 1px, transparent 3px, var(--color-gold) 3px, var(--color-gold) 4px, transparent 4px, transparent 6px)',
              }}
            />
          </div>
          <div className="flex h-16 w-16 shrink-0 items-center justify-center border border-cream/40 bg-cream/95 text-navy">
            <QrCode size={40} strokeWidth={1.2} />
          </div>
        </div>
      </motion.div>

      <p className="font-body text-xs text-brown">
        Please save this pass. You will need your username to log in and register for events.
      </p>

      <div className="flex w-full flex-col gap-3 sm:flex-row">
        <Button variant="outline" className="flex-1" onClick={handleCopy} icon={copied ? <Check size={16} /> : <Copy size={16} />}>
          {copied ? 'Copied' : 'Copy Username'}
        </Button>
        <Button variant="outline" className="flex-1" onClick={handleDownloadPdf} icon={<Download size={16} />}>
          Download Pass
        </Button>
      </div>

      <Button variant="primary" size="lg" className="w-full" onClick={onContinue}>
        Continue to Login
      </Button>
    </motion.div>
  );
}
