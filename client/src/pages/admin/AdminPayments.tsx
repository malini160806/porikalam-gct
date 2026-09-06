import { useState } from 'react';
import { Check, ExternalLink, Loader2, X } from 'lucide-react';
import { useAdminPayments, confirmAdminPayment, rejectAdminPayment, type PaymentFilters } from '@/hooks/useAdmin';
import { resolveUploadUrl } from '@/lib/apiClient';

const STATUS_TABS: { value: PaymentFilters['status']; label: string }[] = [
  { value: 'pending', label: 'Pending' },
  { value: 'paid', label: 'Paid' },
  { value: 'rejected', label: 'Rejected' },
  { value: 'all', label: 'All' },
];

export default function AdminPayments() {
  const [filters, setFilters] = useState<PaymentFilters>({ q: '', status: 'pending', page: 1 });
  const { data, loading, reload } = useAdminPayments(filters);
  const [actingId, setActingId] = useState<string | null>(null);

  function updateFilter<K extends keyof PaymentFilters>(key: K, value: PaymentFilters[K]) {
    setFilters((prev) => ({ ...prev, [key]: value, page: key === 'page' ? (value as number) : 1 }));
  }

  async function handleConfirm(id: string) {
    setActingId(id);
    try {
      await confirmAdminPayment(id);
      await reload();
    } finally {
      setActingId(null);
    }
  }

  async function handleReject(id: string) {
    setActingId(id);
    try {
      await rejectAdminPayment(id);
      await reload();
    } finally {
      setActingId(null);
    }
  }

  const totalPages = data ? Math.max(1, Math.ceil(data.total / data.limit)) : 1;

  return (
    <div className="flex flex-col gap-6">
      <h2 className="font-heading text-lg font-semibold uppercase tracking-wide text-gold">Payments</h2>

      <div className="flex flex-col gap-3 sm:flex-row sm:flex-wrap sm:items-center sm:justify-between">
        <div className="flex flex-wrap gap-2">
          {STATUS_TABS.map((tab) => (
            <button
              key={tab.value}
              type="button"
              onClick={() => updateFilter('status', tab.value)}
              className={`border px-3.5 py-1.5 font-body text-xs font-semibold uppercase tracking-wide transition-colors ${
                filters.status === tab.value
                  ? 'border-gold bg-gold/10 text-gold'
                  : 'border-gold/20 text-beige/50 hover:text-gold'
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>
        <input
          value={filters.q}
          onChange={(e) => updateFilter('q', e.target.value)}
          placeholder="Search participant, UTR, event…"
          className="w-full border border-gold/25 bg-navy-deep/60 px-3.5 py-2 font-body text-sm text-cream placeholder:text-beige/35 outline-none focus:border-gold focus:ring-1 focus:ring-gold sm:w-64"
        />
      </div>

      {loading ? (
        <p className="font-body text-sm text-beige/60">Loading payments…</p>
      ) : !data || data.payments.length === 0 ? (
        <p className="font-body text-sm text-beige/60">No payments match this filter.</p>
      ) : (
        <div className="flex flex-col gap-3">
          {data.payments.map((payment) => {
            const screenshotUrl = resolveUploadUrl(payment.payment_screenshot_url);
            return (
              <div
                key={payment.id}
                className="flex flex-col gap-4 border border-gold/20 bg-navy p-4 sm:flex-row sm:items-center sm:justify-between"
              >
                <div className="flex items-center gap-4 min-w-0">
                  {screenshotUrl ? (
                    <a href={screenshotUrl} target="_blank" rel="noreferrer" className="shrink-0">
                      <img
                        src={screenshotUrl}
                        alt="Payment screenshot"
                        className="h-16 w-16 border border-gold/20 object-cover"
                      />
                    </a>
                  ) : (
                    <div className="flex h-16 w-16 shrink-0 items-center justify-center border border-dashed border-gold/20 font-body text-[9px] uppercase text-beige/40">
                      No Image
                    </div>
                  )}
                  <div className="min-w-0">
                    <p className="break-words font-body text-sm font-semibold text-cream">
                      {payment.participant_name}
                      <span className="ml-1.5 font-body text-xs font-normal text-beige/50">({payment.username})</span>
                    </p>
                    <p className="font-body text-xs text-beige/60">
                      {payment.event_name}
                      {payment.team_name ? ` · ${payment.team_name}` : ''}
                    </p>
                    <p className="mt-1 font-body text-xs text-gold">UTR: {payment.payment_reference}</p>
                    <p className="font-body text-[10px] uppercase tracking-wide text-beige/40">
                      {new Date(payment.created_at).toLocaleString('en-IN', {
                        day: '2-digit',
                        month: 'short',
                        year: 'numeric',
                        hour: '2-digit',
                        minute: '2-digit',
                      })}
                    </p>
                  </div>
                </div>

                <div className="flex flex-wrap items-center gap-2">
                  {screenshotUrl && (
                    <a
                      href={screenshotUrl}
                      target="_blank"
                      rel="noreferrer"
                      className="flex items-center gap-1.5 border border-gold/20 px-3 py-1.5 font-body text-xs uppercase tracking-wide text-beige/60 hover:text-gold"
                    >
                      <ExternalLink size={12} /> View
                    </a>
                  )}
                  {payment.status === 'submitted' ? (
                    <>
                      <button
                        type="button"
                        disabled={actingId === payment.id}
                        onClick={() => void handleConfirm(payment.id)}
                        className="flex items-center gap-1.5 border border-green-500/40 bg-green-500/10 px-3 py-1.5 font-body text-xs font-semibold uppercase tracking-wide text-green-300 hover:bg-green-500/20 disabled:opacity-50"
                      >
                        {actingId === payment.id ? <Loader2 size={12} className="animate-spin" /> : <Check size={12} />}
                        Confirm
                      </button>
                      <button
                        type="button"
                        disabled={actingId === payment.id}
                        onClick={() => void handleReject(payment.id)}
                        className="flex items-center gap-1.5 border border-red-500/40 bg-red-500/10 px-3 py-1.5 font-body text-xs font-semibold uppercase tracking-wide text-red-300 hover:bg-red-500/20 disabled:opacity-50"
                      >
                        {actingId === payment.id ? <Loader2 size={12} className="animate-spin" /> : <X size={12} />}
                        Reject
                      </button>
                    </>
                  ) : (
                    <span
                      className={`border px-3 py-1.5 font-body text-xs font-semibold uppercase tracking-wide ${
                        payment.status === 'confirmed'
                          ? 'border-gold/40 text-gold'
                          : 'border-red-500/30 text-red-300/80'
                      }`}
                    >
                      {payment.status === 'confirmed' ? 'Confirmed' : 'Rejected'}
                    </span>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      )}

      {data && data.total > data.limit && (
        <div className="flex items-center justify-center gap-4">
          <button
            type="button"
            disabled={filters.page <= 1}
            onClick={() => updateFilter('page', filters.page - 1)}
            className="border border-gold/25 px-3 py-1.5 font-body text-xs uppercase tracking-wide text-beige/70 disabled:opacity-30 hover:text-gold"
          >
            Prev
          </button>
          <span className="font-body text-xs text-beige/50">
            Page {data.page} of {totalPages}
          </span>
          <button
            type="button"
            disabled={filters.page >= totalPages}
            onClick={() => updateFilter('page', filters.page + 1)}
            className="border border-gold/25 px-3 py-1.5 font-body text-xs uppercase tracking-wide text-beige/70 disabled:opacity-30 hover:text-gold"
          >
            Next
          </button>
        </div>
      )}
    </div>
  );
}
