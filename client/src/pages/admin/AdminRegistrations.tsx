import { useState } from 'react';
import { Download } from 'lucide-react';
import { NotLiveYet } from '@/components/admin/NotLiveYet';
import { useAdminEvents } from '@/hooks/useAdmin';

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

export default function AdminRegistrations() {
  const { events } = useAdminEvents();
  const [eventFilter, setEventFilter] = useState('all');
  const [paymentFilter, setPaymentFilter] = useState('all');
  const [attendanceFilter, setAttendanceFilter] = useState('all');

  return (
    <div className="flex flex-col gap-6">
      <div className="flex items-center justify-between">
        <h2 className="font-heading text-lg font-semibold uppercase tracking-wide text-gold">Registration Management</h2>
        <button
          type="button"
          disabled
          title="Export becomes available once the registration system is live"
          className="flex items-center gap-2 border border-gold/20 px-4 py-2 font-body text-xs font-semibold uppercase tracking-wide text-beige/40"
        >
          <Download size={14} /> Export
        </button>
      </div>

      <div className="flex flex-wrap gap-3">
        <input
          disabled
          placeholder="Search participant…"
          className="w-56 border border-gold/15 bg-navy-deep/40 px-3.5 py-2 font-body text-sm text-beige/40 placeholder:text-beige/30"
        />
        <select
          value={eventFilter}
          onChange={(e) => setEventFilter(e.target.value)}
          disabled
          className="border border-gold/15 bg-navy-deep/40 px-3.5 py-2 font-body text-sm text-beige/40"
        >
          <option value="all">All Events</option>
          {events.map((ev) => (
            <option key={ev.slug} value={ev.slug}>
              {ev.event_name}
            </option>
          ))}
        </select>
        <select
          value={paymentFilter}
          onChange={(e) => setPaymentFilter(e.target.value)}
          disabled
          className="border border-gold/15 bg-navy-deep/40 px-3.5 py-2 font-body text-sm text-beige/40"
        >
          <option value="all">All Payment Statuses</option>
          <option value="paid">Paid</option>
          <option value="pending">Pending</option>
        </select>
        <select
          value={attendanceFilter}
          onChange={(e) => setAttendanceFilter(e.target.value)}
          disabled
          className="border border-gold/15 bg-navy-deep/40 px-3.5 py-2 font-body text-sm text-beige/40"
        >
          <option value="all">All Attendance</option>
          <option value="checked-in">Checked In</option>
          <option value="not-checked-in">Not Checked In</option>
        </select>
      </div>

      <div className="overflow-x-auto border border-gold/20">
        <table className="w-full min-w-[900px] border-collapse text-left">
          <thead>
            <tr className="border-b border-gold/20 bg-navy">
              {COLUMNS.map((h) => (
                <th key={h} className="px-4 py-3 font-body text-[11px] font-semibold uppercase tracking-widest text-beige/60">
                  {h}
                </th>
              ))}
            </tr>
          </thead>
        </table>
        <NotLiveYet>
          Event registration hasn&apos;t shipped yet — once participants can register for events, every
          registration will appear here automatically with full filtering, search, and export.
        </NotLiveYet>
      </div>
    </div>
  );
}
