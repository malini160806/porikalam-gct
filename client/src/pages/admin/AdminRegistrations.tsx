import { useState } from 'react';
import { Download, Loader2, ExternalLink } from 'lucide-react';
import { useAdminEvents, useAdminRegistrations, downloadAdminRegistrationsCsv, type RegistrationFilters } from '@/hooks/useAdmin';
import { resolveUploadUrl } from '@/lib/apiClient';

const COLUMNS = [
  'Participant',
  'Username',
  'Phone',
  'College',
  'Department',
  'Year',
  'Event',
  'Registered On',
  'Payment',
  'Attendance',
];

const PAYMENT_LABEL: Record<string, string> = { paid: 'Paid', pending: 'Pending', free: 'Free' };
const PAYMENT_STYLE: Record<string, string> = {
  paid: 'border-gold/40 text-gold',
  pending: 'border-amber-400/40 text-amber-300',
  free: 'border-beige/25 text-beige/50',
};

export default function AdminRegistrations() {
  const { events } = useAdminEvents();
  const [filters, setFilters] = useState<RegistrationFilters>({
    q: '',
    event: 'all',
    payment: 'all',
    attendance: 'all',
    page: 1,
  });
  const { data, loading, reload } = useAdminRegistrations(filters);
  const [exporting, setExporting] = useState(false);

  function updateFilter<K extends keyof RegistrationFilters>(key: K, value: RegistrationFilters[K]) {
    setFilters((prev) => ({ ...prev, [key]: value, page: key === 'page' ? (value as number) : 1 }));
  }

  async function handleExport() {
    setExporting(true);
    try {
      await downloadAdminRegistrationsCsv(filters);
    } catch {
      // Best-effort — the button just stops spinning if it fails.
    } finally {
      setExporting(false);
    }
  }

  const totalPages = data ? Math.max(1, Math.ceil(data.total / data.limit)) : 1;

  return (
    <div className="flex flex-col gap-6">
      <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <h2 className="font-heading text-lg font-semibold uppercase tracking-wide text-gold">Registration Management</h2>
        <button
          type="button"
          onClick={handleExport}
          disabled={exporting || !data || data.total === 0}
          className="flex items-center justify-center gap-2 border border-gold/40 px-4 py-2 font-body text-xs font-semibold uppercase tracking-wide text-gold transition-colors hover:bg-gold/10 disabled:cursor-not-allowed disabled:border-gold/20 disabled:text-beige/40"
        >
          {exporting ? <Loader2 size={14} className="animate-spin" /> : <Download size={14} />}
          Export CSV
        </button>
      </div>

      <div className="flex flex-col flex-wrap gap-3 sm:flex-row">
        <input
          value={filters.q}
          onChange={(e) => updateFilter('q', e.target.value)}
          placeholder="Search participant, username, phone, college…"
          className="w-full border border-gold/25 bg-navy-deep/60 px-3.5 py-2 font-body text-sm text-cream placeholder:text-beige/35 outline-none focus:border-gold focus:ring-1 focus:ring-gold sm:w-64"
        />
        <select
          value={filters.event}
          onChange={(e) => updateFilter('event', e.target.value)}
          className="w-full border border-gold/25 bg-navy-deep/60 px-3.5 py-2 font-body text-sm text-cream outline-none focus:border-gold sm:w-auto"
        >
          <option value="all">All Events</option>
          {events.map((ev) => (
            <option key={ev.slug} value={ev.slug}>
              {ev.event_name}
            </option>
          ))}
        </select>
        <select
          value={filters.payment}
          onChange={(e) => updateFilter('payment', e.target.value as RegistrationFilters['payment'])}
          className="w-full border border-gold/25 bg-navy-deep/60 px-3.5 py-2 font-body text-sm text-cream outline-none focus:border-gold sm:w-auto"
        >
          <option value="all">All Payment Statuses</option>
          <option value="paid">Paid</option>
          <option value="pending">Pending</option>
          <option value="free">Free</option>
        </select>
        <select
          value={filters.attendance}
          onChange={(e) => updateFilter('attendance', e.target.value as RegistrationFilters['attendance'])}
          className="w-full border border-gold/25 bg-navy-deep/60 px-3.5 py-2 font-body text-sm text-cream outline-none focus:border-gold sm:w-auto"
        >
          <option value="all">All Attendance</option>
          <option value="checked-in">Checked In</option>
          <option value="not-checked-in">Not Checked In</option>
        </select>
      </div>

      <div className="overflow-x-auto border border-gold/20">
        <table className="w-full min-w-[960px] border-collapse text-left">
          <thead>
            <tr className="border-b border-gold/20 bg-navy">
              {COLUMNS.map((h) => (
                <th key={h} className="px-4 py-3 font-body text-[11px] font-semibold uppercase tracking-widest text-beige/60">
                  {h}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {loading ? (
              <tr>
                <td colSpan={COLUMNS.length} className="px-4 py-10 text-center font-body text-sm text-beige/60">
                  Loading registrations…
                </td>
              </tr>
            ) : !data || data.registrations.length === 0 ? (
              <tr>
                <td colSpan={COLUMNS.length} className="px-4 py-10 text-center font-body text-sm text-beige/60">
                  No registrations match your filters.
                </td>
              </tr>
            ) : (
              data.registrations.map((registration) => (
                <tr key={registration.id} className="border-b border-gold/10 last:border-b-0 hover:bg-white/[0.02]">
                  <td className="px-4 py-3 font-body text-sm text-cream">
                    {registration.participant_name}
                    {registration.team_name && (
                      <span className="ml-1.5 font-body text-[11px] text-beige/50">({registration.team_name})</span>
                    )}
                  </td>
                  <td className="px-4 py-3 font-body text-xs text-beige/70">{registration.username}</td>
                  <td className="px-4 py-3 font-body text-xs text-beige/70">{registration.phone}</td>
                  <td className="px-4 py-3 font-body text-xs text-beige/70">{registration.college ?? '—'}</td>
                  <td className="px-4 py-3 font-body text-xs text-beige/70">{registration.department ?? '—'}</td>
                  <td className="px-4 py-3 font-body text-xs text-beige/70">{registration.year_of_study ?? '—'}</td>
                  <td className="px-4 py-3 font-body text-xs text-beige/70">{registration.event_name}</td>
                  <td className="px-4 py-3 font-body text-xs text-beige/50">
                    {new Date(registration.created_at).toLocaleDateString('en-IN', { day: '2-digit', month: 'short', year: 'numeric' })}
                  </td>
                  <td className="px-4 py-3">
                    <span
                      className={`border px-2 py-0.5 font-body text-[10px] font-semibold uppercase tracking-wide ${PAYMENT_STYLE[registration.payment_status]}`}
                    >
                      {PAYMENT_LABEL[registration.payment_status]}
                    </span>
                    {registration.payment_screenshot_url && (
                      <a
                        href={resolveUploadUrl(registration.payment_screenshot_url) ?? undefined}
                        target="_blank"
                        rel="noreferrer"
                        className="ml-2 inline-flex items-center text-beige/50 hover:text-gold"
                        aria-label="View payment screenshot"
                      >
                        <ExternalLink size={12} />
                      </a>
                    )}
                  </td>
                  <td className="px-4 py-3 font-body text-xs">
                    {registration.checked_in_at ? (
                      <span className="text-gold">Checked In</span>
                    ) : (
                      <span className="text-beige/40">Not Yet</span>
                    )}
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>

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

      {!loading && data && (
        <button
          type="button"
          onClick={() => void reload()}
          className="self-start font-body text-[11px] uppercase tracking-wide text-beige/40 hover:text-gold"
        >
          Refresh
        </button>
      )}
    </div>
  );
}
