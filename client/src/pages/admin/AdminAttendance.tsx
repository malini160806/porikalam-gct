import { QrCode, ScanLine, UserSearch, ListChecks, CheckCircle2 } from 'lucide-react';
import { NotLiveYet } from '@/components/admin/NotLiveYet';

const FLOW = [
  { icon: ScanLine, label: 'Open QR Scanner' },
  { icon: QrCode, label: 'Scan Participant QR' },
  { icon: UserSearch, label: 'Find Participant' },
  { icon: ListChecks, label: 'Select Registered Event' },
  { icon: CheckCircle2, label: 'Mark Attendance' },
];

export default function AdminAttendance() {
  return (
    <div className="flex flex-col gap-6">
      <h2 className="font-heading text-lg font-semibold uppercase tracking-wide text-gold">Attendance</h2>

      <div className="flex flex-col items-center gap-6 border border-gold/20 bg-navy px-6 py-12">
        <div className="flex h-40 w-40 items-center justify-center border-2 border-dashed border-gold/30">
          <QrCode size={56} className="text-gold/40" strokeWidth={1} />
        </div>
        <p className="max-w-sm text-center font-body text-sm text-beige/60">
          QR check-in activates once the registration system is live — every registered participant will
          receive a scannable QR pass, and admins will be able to check them into events here.
        </p>
      </div>

      <div>
        <h3 className="font-body text-xs font-semibold uppercase tracking-widest text-beige/60">Planned Flow</h3>
        <div className="mt-3 grid grid-cols-1 gap-3 sm:grid-cols-5">
          {FLOW.map((step, index) => (
            <div key={step.label} className="flex flex-col items-center gap-2 border border-gold/15 bg-navy/60 px-3 py-4 text-center">
              <span className="flex h-9 w-9 items-center justify-center rounded-full border border-gold/30 font-heading text-xs font-bold text-gold">
                {index + 1}
              </span>
              <step.icon size={18} className="text-gold/70" strokeWidth={1.5} />
              <span className="font-body text-[11px] uppercase tracking-wide text-beige/60">{step.label}</span>
            </div>
          ))}
        </div>
      </div>

      <NotLiveYet>Today&apos;s check-in log will appear here once attendance tracking goes live.</NotLiveYet>
    </div>
  );
}
