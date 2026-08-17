import { useState } from 'react';
import { Search } from 'lucide-react';
import { useAdminParticipants } from '@/hooks/useAdmin';

export default function AdminParticipants() {
  const [query, setQuery] = useState('');
  const [page, setPage] = useState(1);
  const { data, loading } = useAdminParticipants(query, page);

  return (
    <div className="flex flex-col gap-6">
      <div className="flex items-center justify-between gap-4">
        <h2 className="font-heading text-lg font-semibold uppercase tracking-wide text-gold">Participants</h2>
        {data && <span className="font-body text-xs text-beige/50">{data.total} total</span>}
      </div>

      <div className="relative max-w-sm">
        <Search size={15} className="absolute left-3 top-1/2 -translate-y-1/2 text-beige/40" />
        <input
          value={query}
          onChange={(e) => {
            setQuery(e.target.value);
            setPage(1);
          }}
          placeholder="Search name, username, email, phone, college…"
          className="w-full border border-gold/25 bg-navy-deep/60 py-2.5 pl-9 pr-3 font-body text-sm text-cream placeholder:text-beige/35 outline-none focus:border-gold focus:ring-1 focus:ring-gold"
        />
      </div>

      {loading ? (
        <p className="font-body text-sm text-beige/60">Loading participants…</p>
      ) : !data || data.participants.length === 0 ? (
        <p className="font-body text-sm text-beige/60">No participants match your search.</p>
      ) : (
        <>
          <div className="overflow-x-auto border border-gold/20">
            <table className="w-full min-w-[820px] border-collapse text-left">
              <thead>
                <tr className="border-b border-gold/20 bg-navy">
                  {['Name', 'Username', 'Phone', 'College', 'Department', 'Year', 'Joined'].map((h) => (
                    <th key={h} className="px-4 py-3 font-body text-[11px] font-semibold uppercase tracking-widest text-beige/60">
                      {h}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {data.participants.map((p) => (
                  <tr key={p.id} className="border-b border-gold/10 last:border-b-0 hover:bg-white/[0.02]">
                    <td className="px-4 py-3 font-body text-sm text-cream">{p.display_name}</td>
                    <td className="px-4 py-3 font-body text-xs text-beige/70">{p.username}</td>
                    <td className="px-4 py-3 font-body text-xs text-beige/70">{p.phone}</td>
                    <td className="px-4 py-3 font-body text-xs text-beige/70">{p.college ?? '—'}</td>
                    <td className="px-4 py-3 font-body text-xs text-beige/70">{p.department ?? '—'}</td>
                    <td className="px-4 py-3 font-body text-xs text-beige/70">{p.year_of_study ?? '—'}</td>
                    <td className="px-4 py-3 font-body text-xs text-beige/50">
                      {new Date(p.created_at).toLocaleDateString('en-IN', { day: '2-digit', month: 'short', year: 'numeric' })}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {data.total > data.limit && (
            <div className="flex items-center justify-center gap-4">
              <button
                type="button"
                disabled={page <= 1}
                onClick={() => setPage((p) => p - 1)}
                className="border border-gold/25 px-3 py-1.5 font-body text-xs uppercase tracking-wide text-beige/70 disabled:opacity-30 hover:text-gold"
              >
                Prev
              </button>
              <span className="font-body text-xs text-beige/50">
                Page {data.page} of {Math.ceil(data.total / data.limit)}
              </span>
              <button
                type="button"
                disabled={page >= Math.ceil(data.total / data.limit)}
                onClick={() => setPage((p) => p + 1)}
                className="border border-gold/25 px-3 py-1.5 font-body text-xs uppercase tracking-wide text-beige/70 disabled:opacity-30 hover:text-gold"
              >
                Next
              </button>
            </div>
          )}
        </>
      )}
    </div>
  );
}
