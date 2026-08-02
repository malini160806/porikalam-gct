import { Check } from 'lucide-react';
import { motion } from 'framer-motion';

export type WizardStep = 1 | 2 | 3;

const STEPS: Array<{ step: WizardStep; label: string }> = [
  { step: 1, label: 'Personal Information' },
  { step: 2, label: 'Account Setup' },
  { step: 3, label: 'Review & Confirm' },
];

export function WizardStepper({ currentStep }: { currentStep: WizardStep }) {
  return (
    <div className="space-y-5">
      <div className="h-1 w-full overflow-hidden rounded-full bg-navy/10">
        <motion.div
          className="h-full rounded-full bg-gold"
          initial={false}
          animate={{ width: `${((currentStep - 1) / (STEPS.length - 1)) * 100}%` }}
          transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
        />
      </div>
      <div className="flex items-center justify-between">
        {STEPS.map(({ step, label }) => {
          const isCurrent = step === currentStep;
          const isDone = step < currentStep;
          return (
            <div key={step} className="flex flex-1 flex-col items-center gap-2 text-center">
              <div
                className={`flex h-8 w-8 items-center justify-center rounded-full border font-body text-xs font-bold transition-colors duration-200 ${
                  isDone
                    ? 'border-gold bg-gold text-navy'
                    : isCurrent
                      ? 'border-gold text-gold'
                      : 'border-navy/20 text-slate/50'
                }`}
              >
                {isDone ? <Check size={14} /> : step}
              </div>
              <span
                className={`font-body text-[11px] font-semibold uppercase tracking-wide sm:text-xs ${
                  isCurrent || isDone ? 'text-navy' : 'text-slate/50'
                }`}
              >
                {label}
              </span>
            </div>
          );
        })}
      </div>
    </div>
  );
}
