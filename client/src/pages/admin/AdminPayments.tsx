import { NotLiveYet } from '@/components/admin/NotLiveYet';

export default function AdminPayments() {
  return (
    <div className="flex flex-col gap-6">
      <h2 className="font-heading text-lg font-semibold uppercase tracking-wide text-gold">Payments</h2>
      <NotLiveYet>
        Payment tracking hasn&apos;t shipped yet — once registration fees can be collected, paid and pending
        registrations, receipts, and totals will appear here.
      </NotLiveYet>
    </div>
  );
}
