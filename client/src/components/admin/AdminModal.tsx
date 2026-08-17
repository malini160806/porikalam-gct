import type { ReactNode } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { X } from 'lucide-react';

type AdminModalProps = {
  open: boolean;
  onClose: () => void;
  title: string;
  children: ReactNode;
};

/** Dark navy/gold modal for the admin control panel — a deliberately different look from the participant-facing cream Modal. */
export function AdminModal({ open, onClose, title, children }: AdminModalProps) {
  return (
    <AnimatePresence>
      {open && (
        <motion.div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 px-4 py-8 backdrop-blur-sm"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
        >
          <motion.div
            role="dialog"
            aria-modal="true"
            initial={{ opacity: 0, scale: 0.96, y: 16 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.96, y: 16 }}
            transition={{ duration: 0.2, ease: 'easeOut' }}
            onClick={(e) => e.stopPropagation()}
            className="relative max-h-[85vh] w-full max-w-2xl overflow-y-auto border border-gold/30 bg-navy p-6 shadow-[0_0_60px_-14px_rgba(212,175,55,0.4)] sm:p-8"
          >
            <button
              type="button"
              onClick={onClose}
              aria-label="Close"
              className="absolute right-2 top-2 flex h-11 w-11 items-center justify-center text-beige/60 hover:text-gold"
            >
              <X size={20} />
            </button>
            <h3 className="mb-6 font-heading text-xl font-semibold uppercase tracking-wide text-gold">{title}</h3>
            {children}
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

export function AdminField({
  label,
  children,
}: {
  label: string;
  children: ReactNode;
}) {
  return (
    <label className="flex flex-col gap-1.5">
      <span className="font-body text-xs font-semibold uppercase tracking-wider text-beige/70">{label}</span>
      {children}
    </label>
  );
}

export const adminInputClass =
  'w-full border border-gold/25 bg-navy-deep/60 px-3.5 py-2.5 font-body text-sm text-cream placeholder:text-beige/35 outline-none transition-all duration-200 focus:border-gold focus:ring-1 focus:ring-gold disabled:opacity-50';
