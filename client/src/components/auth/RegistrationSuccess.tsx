import { useState } from 'react';
import { motion } from 'framer-motion';
import { Check, Copy, Download, PartyPopper } from 'lucide-react';
import { Button } from '@/components/ui/Button';
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

    doc.setFont('helvetica', 'bold');
    doc.setFontSize(20);
    doc.text(`${SITE.name} ${SITE.year}`, 105, 30, { align: 'center' });

    doc.setFontSize(14);
    doc.setFont('helvetica', 'normal');
    doc.text('Registration Confirmation', 105, 40, { align: 'center' });

    doc.setDrawColor(212, 175, 55);
    doc.line(20, 48, 190, 48);

    doc.setFontSize(11);
    doc.text(`Participant Name: ${fullName}`, 20, 62);
    doc.text('Your Participant Username:', 20, 76);

    doc.setFontSize(18);
    doc.setFont('helvetica', 'bold');
    doc.text(username, 20, 88);

    doc.setFontSize(10);
    doc.setFont('helvetica', 'normal');
    doc.text('Please keep this username safe — you will need it to log in and register', 20, 102);
    doc.text('for events at ' + SITE.name + ' ' + SITE.year + '.', 20, 108);

    doc.save(`${username}-registration.pdf`);
  }

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.96 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.4 }}
      className="mx-auto flex w-full max-w-lg flex-col items-center gap-6 border border-gold/30 bg-white/50 p-10 text-center"
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
        <h2 className="font-heading text-2xl text-navy">Registration Successful!</h2>
        <p className="mt-2 font-body text-sm text-slate">
          Welcome to {SITE.name} {SITE.year}, {fullName}.
        </p>
      </div>

      <div className="w-full border border-gold/40 bg-cream/60 p-6">
        <p className="font-body text-xs font-semibold uppercase tracking-widest text-slate/70">
          Your Participant Username
        </p>
        <p className="mt-2 font-heading text-3xl font-bold tracking-wide text-navy">{username}</p>
      </div>

      <p className="font-body text-xs text-brown">
        Please save this username. You will need it to log in and register for events.
      </p>

      <div className="flex w-full flex-col gap-3 sm:flex-row">
        <Button variant="outline" className="flex-1" onClick={handleCopy} icon={copied ? <Check size={16} /> : <Copy size={16} />}>
          {copied ? 'Copied' : 'Copy Username'}
        </Button>
        <Button variant="outline" className="flex-1" onClick={handleDownloadPdf} icon={<Download size={16} />}>
          Download PDF
        </Button>
      </div>

      <Button variant="primary" size="lg" className="w-full" onClick={onContinue}>
        Continue to Login
      </Button>
    </motion.div>
  );
}
