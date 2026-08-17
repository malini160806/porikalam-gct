import { AnimatePresence, motion } from 'framer-motion';
import { LockKeyhole, X, LogIn, UserPlus } from 'lucide-react';
import { Button } from '@/components/ui/Button';
import { CornerOrnament } from '@/components/common/CornerOrnament';

type AuthRequiredModalProps = {
  open: boolean;
  onClose: () => void;
};

/** Premium gate shown when a signed-out visitor tries to reach a participant-only nav item. */
export function AuthRequiredModal({ open, onClose }: AuthRequiredModalProps) {
  return (
    <AnimatePresence>
      {open && (
        <motion.div
          className="fixed inset-0 z-[60] flex items-center justify-center bg-navy-deep/80 px-4 backdrop-blur-sm"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
        >
          <motion.div
            role="dialog"
            aria-modal="true"
            aria-label="Account required"
            initial={{ opacity: 0, scale: 0.94, y: 16 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.94, y: 16 }}
            transition={{ duration: 0.25, ease: 'easeOut' }}
            onClick={(e) => e.stopPropagation()}
            className="bp-grid-bg relative w-full max-w-md overflow-hidden border border-gold/40 bg-navy-deep p-8 text-center shadow-[0_0_60px_-12px_rgba(212,175,55,0.45)] sm:p-10"
          >
            <CornerOrnament corner="top-left" />
            <CornerOrnament corner="bottom-right" />

            <button
              type="button"
              onClick={onClose}
              aria-label="Close"
              className="absolute right-3 top-3 flex h-10 w-10 items-center justify-center text-beige/50 hover:text-gold"
            >
              <X size={18} />
            </button>

            <div className="relative flex flex-col items-center gap-5">
              <div className="flex h-16 w-16 items-center justify-center rounded-full border border-gold/50 text-gold shadow-[0_0_18px_-4px_rgba(212,175,55,0.5)]">
                <LockKeyhole size={26} strokeWidth={1.5} />
              </div>

              <h3 className="font-heading text-xl font-bold uppercase tracking-wide text-gold sm:text-2xl">
                Participants Only
              </h3>

              <p className="font-body text-sm leading-relaxed text-beige/85">
                Please create your Porikkalam participant account to access events, schedules,
                workshops, registrations, and all other features.
              </p>

              <div className="mt-2 flex w-full flex-col gap-3 sm:flex-row">
                <Button to="/register" variant="primary" size="md" icon={<UserPlus size={15} />} onClick={onClose} className="flex-1">
                  Register Now
                </Button>
                <Button to="/login" variant="secondary" size="md" icon={<LogIn size={15} />} onClick={onClose} className="flex-1">
                  Login
                </Button>
              </div>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
