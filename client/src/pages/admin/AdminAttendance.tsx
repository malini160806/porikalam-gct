import { useState } from 'react';
import { CheckCircle2, Loader2, RotateCcw, ScanLine, Search, User as UserIcon, X } from 'lucide-react';
import { QrScanner } from '@/components/admin/QrScanner';
import { lookupAdminAttendance, checkInAdminRegistration, undoAdminCheckIn } from '@/hooks/useAdmin';
import { AdminApiError } from '@/lib/adminApiClient';
import { resolveUploadUrl } from '@/lib/apiClient';
import type { AdminAttendanceLookupResponse } from '@/types/adminApi';

export default function AdminAttendance() {
  const [scanning, setScanning] = useState(false);
  const [scannerKey, setScannerKey] = useState(0);
  const [manualUsername, setManualUsername] = useState('');
  const [looking, setLooking] = useState(false);
  const [lookupError, setLookupError] = useState<string | null>(null);
  const [result, setResult] = useState<AdminAttendanceLookupResponse | null>(null);
  const [actingId, setActingId] = useState<string | null>(null);

  async function runLookup(username: string) {
    if (!username.trim()) return;
    setLooking(true);
    setLookupError(null);
    setScanning(false);
    try {
      const data = await lookupAdminAttendance(username.trim());
      setResult(data);
    } catch (err) {
      setResult(null);
      setLookupError(err instanceof AdminApiError ? err.message : 'Could not look up this participant right now.');
    } finally {
      setLooking(false);
    }
  }

  async function handleCheckIn(registrationId: string) {
    setActingId(registrationId);
    try {
      const { checked_in_at } = await checkInAdminRegistration(registrationId);
      setResult((prev) =>
        prev
          ? {
              ...prev,
              registrations: prev.registrations.map((r) =>
                r.id === registrationId ? { ...r, checked_in_at } : r,
              ),
            }
          : prev,
      );
    } catch (err) {
      setLookupError(err instanceof AdminApiError ? err.message : 'Could not check in this registration.');
    } finally {
      setActingId(null);
    }
  }

  async function handleUndo(registrationId: string) {
    setActingId(registrationId);
    try {
      await undoAdminCheckIn(registrationId);
      setResult((prev) =>
        prev
          ? {
              ...prev,
              registrations: prev.registrations.map((r) => (r.id === registrationId ? { ...r, checked_in_at: null } : r)),
            }
          : prev,
      );
    } finally {
      setActingId(null);
    }
  }

  const photoUrl = resolveUploadUrl(result?.participant.profile_photo_url ?? null);

  return (
    <div className="flex flex-col gap-6">
      <h2 className="font-heading text-lg font-semibold uppercase tracking-wide text-gold">Attendance</h2>

      <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
        <div className="flex flex-col gap-4 border border-gold/20 bg-navy p-6">
          <div className="flex items-center justify-between">
            <h3 className="font-body text-xs font-semibold uppercase tracking-widest text-beige/60">Scan Participant QR</h3>
            {scanning && (
              <button
                type="button"
                onClick={() => setScanning(false)}
                className="flex items-center gap-1 font-body text-[11px] uppercase tracking-wide text-beige/50 hover:text-gold"
              >
                <X size={12} /> Close
              </button>
            )}
          </div>

          {scanning ? (
            <QrScanner key={scannerKey} onScan={(text) => void runLookup(text)} />
          ) : (
            <button
              type="button"
              onClick={() => {
                setScannerKey((k) => k + 1);
                setScanning(true);
              }}
              className="flex flex-col items-center gap-4 border-2 border-dashed border-gold/30 px-6 py-10 text-center transition-colors hover:border-gold/60"
            >
              <ScanLine size={40} className="text-gold/60" strokeWidth={1.2} />
              <span className="font-body text-sm text-beige/70">Tap to open the camera scanner</span>
            </button>
          )}

          <div className="flex items-center gap-2 text-beige/30">
            <span className="h-px flex-1 bg-gold/15" />
            <span className="font-body text-[10px] uppercase tracking-widest">Or</span>
            <span className="h-px flex-1 bg-gold/15" />
          </div>

          <form
            onSubmit={(e) => {
              e.preventDefault();
              void runLookup(manualUsername);
            }}
            className="flex gap-2"
          >
            <div className="relative flex-1">
              <Search size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-beige/40" />
              <input
                value={manualUsername}
                onChange={(e) => setManualUsername(e.target.value)}
                placeholder="Type participant username…"
                className="w-full border border-gold/25 bg-navy-deep/60 py-2.5 pl-9 pr-3 font-body text-sm text-cream placeholder:text-beige/35 outline-none focus:border-gold focus:ring-1 focus:ring-gold"
              />
            </div>
            <button
              type="submit"
              disabled={looking || !manualUsername.trim()}
              className="flex items-center gap-1.5 border border-gold/40 px-4 py-2 font-body text-xs font-semibold uppercase tracking-wide text-gold hover:bg-gold/10 disabled:opacity-40"
            >
              {looking ? <Loader2 size={13} className="animate-spin" /> : <Search size={13} />}
              Find
            </button>
          </form>

          {lookupError && <p className="font-body text-sm text-red-400">{lookupError}</p>}
        </div>

        <div className="flex flex-col gap-4 border border-gold/20 bg-navy p-6">
          <h3 className="font-body text-xs font-semibold uppercase tracking-widest text-beige/60">Participant</h3>

          {!result ? (
            <div className="flex flex-1 flex-col items-center justify-center gap-3 py-10 text-center">
              <UserIcon size={32} className="text-beige/25" strokeWidth={1.2} />
              <p className="max-w-xs font-body text-sm text-beige/50">
                Scan a QR pass or search a username to see their confirmed events here.
              </p>
            </div>
          ) : (
            <>
              <div className="flex items-center gap-3 border-b border-gold/10 pb-4">
                <div className="flex h-14 w-14 shrink-0 items-center justify-center overflow-hidden rounded-full border border-gold/30 bg-cream/10">
                  {photoUrl ? (
                    <img src={photoUrl} alt={result.participant.display_name} className="h-full w-full object-cover" />
                  ) : (
                    <UserIcon size={24} className="text-beige/40" />
                  )}
                </div>
                <div className="min-w-0">
                  <p className="break-words font-body text-sm font-semibold text-cream">{result.participant.display_name}</p>
                  <p className="break-words font-body text-xs text-beige/60">
                    @{result.participant.username} · {result.participant.college ?? 'No college on file'}
                  </p>
                </div>
              </div>

              {result.registrations.length === 0 ? (
                <p className="font-body text-sm text-beige/50">
                  No confirmed registrations for this participant in your assigned events.
                </p>
              ) : (
                <div className="flex flex-col gap-2">
                  {result.registrations.map((registration) => (
                    <div
                      key={registration.id}
                      className="flex flex-wrap items-center justify-between gap-3 border border-gold/15 bg-navy-deep/40 px-4 py-3"
                    >
                      <div className="min-w-0">
                        <p className="break-words font-body text-sm text-cream">{registration.event_name}</p>
                        {registration.team_name && (
                          <p className="break-words font-body text-[11px] text-beige/50">{registration.team_name}</p>
                        )}
                      </div>
                      {registration.checked_in_at ? (
                        <button
                          type="button"
                          disabled={actingId === registration.id}
                          onClick={() => void handleUndo(registration.id)}
                          className="flex items-center gap-1.5 border border-gold/40 bg-gold/10 px-3 py-1.5 font-body text-[11px] font-semibold uppercase tracking-wide text-gold hover:bg-gold/20 disabled:opacity-50"
                        >
                          {actingId === registration.id ? (
                            <Loader2 size={12} className="animate-spin" />
                          ) : (
                            <RotateCcw size={12} />
                          )}
                          Undo
                        </button>
                      ) : (
                        <button
                          type="button"
                          disabled={actingId === registration.id}
                          onClick={() => void handleCheckIn(registration.id)}
                          className="flex items-center gap-1.5 border border-green-500/40 bg-green-500/10 px-3 py-1.5 font-body text-[11px] font-semibold uppercase tracking-wide text-green-300 hover:bg-green-500/20 disabled:opacity-50"
                        >
                          {actingId === registration.id ? (
                            <Loader2 size={12} className="animate-spin" />
                          ) : (
                            <CheckCircle2 size={12} />
                          )}
                          Check In
                        </button>
                      )}
                    </div>
                  ))}
                </div>
              )}
            </>
          )}
        </div>
      </div>
    </div>
  );
}
