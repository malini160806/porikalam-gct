import { useState, type FormEvent } from 'react';
import { Plus, Pencil, Trash2, Loader2 } from 'lucide-react';
import { AdminModal, AdminField, adminInputClass } from '@/components/admin/AdminModal';
import { useAdminEvents } from '@/hooks/useAdmin';
import { adminApiFetch, AdminApiError } from '@/lib/adminApiClient';
import type { AdminEventDto } from '@/types/adminApi';

type FormState = {
  eventName: string;
  category: 'technical' | 'non-technical' | 'workshop';
  description: string;
  teamType: 'individual' | 'team';
  teamSize: string;
  eventType: 'competition' | 'participation';
  prequalifierRequired: boolean;
  duration: string;
  expectedParticipants: string;
  venue: string;
  resources: string;
  budget: string;
  prizePool: string;
  registrationFee: string;
  whyIncluded: string;
  icon: string;
};

const EMPTY_FORM: FormState = {
  eventName: '',
  category: 'technical',
  description: '',
  teamType: 'individual',
  teamSize: 'Individual',
  eventType: 'competition',
  prequalifierRequired: false,
  duration: '',
  expectedParticipants: '',
  venue: '',
  resources: '',
  budget: '',
  prizePool: '',
  registrationFee: '',
  whyIncluded: '',
  icon: 'cog',
};

function toForm(event: AdminEventDto): FormState {
  return {
    eventName: event.event_name,
    category: event.category,
    description: event.description,
    teamType: event.team_type,
    teamSize: event.team_size,
    eventType: event.event_type,
    prequalifierRequired: event.prequalifier_required,
    duration: event.duration,
    expectedParticipants: String(event.expected_participants),
    venue: event.venue,
    resources: event.resources ?? '',
    budget: event.budget ?? '',
    prizePool: event.prize_pool ?? '',
    registrationFee: event.registration_fee ?? '',
    whyIncluded: event.why_included ?? '',
    icon: event.icon,
  };
}

export default function AdminEvents() {
  const { events, loading, error, reload } = useAdminEvents();
  const [modalMode, setModalMode] = useState<'create' | 'edit' | null>(null);
  const [editingSlug, setEditingSlug] = useState<string | null>(null);
  const [form, setForm] = useState<FormState>(EMPTY_FORM);
  const [formError, setFormError] = useState('');
  const [saving, setSaving] = useState(false);
  const [pendingDelete, setPendingDelete] = useState<AdminEventDto | null>(null);
  const [togglingSlug, setTogglingSlug] = useState<string | null>(null);

  function openCreate() {
    setForm(EMPTY_FORM);
    setEditingSlug(null);
    setModalMode('create');
    setFormError('');
  }

  function openEdit(event: AdminEventDto) {
    setForm(toForm(event));
    setEditingSlug(event.slug);
    setModalMode('edit');
    setFormError('');
  }

  async function handleSubmit(e: FormEvent) {
    e.preventDefault();
    setSaving(true);
    setFormError('');

    const payload = {
      ...form,
      expectedParticipants: Number(form.expectedParticipants),
      targetParticipants: Number(form.expectedParticipants),
      resources: form.resources || undefined,
      budget: form.budget || undefined,
      prizePool: form.prizePool || undefined,
      registrationFee: form.registrationFee || undefined,
      whyIncluded: form.whyIncluded || undefined,
    };

    try {
      if (modalMode === 'create') {
        await adminApiFetch('/events', { method: 'POST', body: JSON.stringify(payload) });
      } else if (editingSlug) {
        await adminApiFetch(`/events/${editingSlug}`, { method: 'PUT', body: JSON.stringify(payload) });
      }
      setModalMode(null);
      await reload();
    } catch (err) {
      setFormError(err instanceof AdminApiError ? err.message : 'Could not save this event right now.');
    } finally {
      setSaving(false);
    }
  }

  async function toggleRegistration(event: AdminEventDto) {
    setTogglingSlug(event.slug);
    try {
      await adminApiFetch(`/events/${event.slug}/registration`, {
        method: 'PATCH',
        body: JSON.stringify({ open: !event.registration_open }),
      });
      await reload();
    } finally {
      setTogglingSlug(null);
    }
  }

  async function confirmDelete() {
    if (!pendingDelete) return;
    await adminApiFetch(`/events/${pendingDelete.slug}`, { method: 'DELETE' });
    setPendingDelete(null);
    await reload();
  }

  return (
    <div className="flex flex-col gap-6">
      <div className="flex items-center justify-between">
        <h2 className="font-heading text-lg font-semibold uppercase tracking-wide text-gold">Event Management</h2>
        <button
          type="button"
          onClick={openCreate}
          className="flex items-center gap-2 border border-gold/40 bg-gold/10 px-4 py-2 font-body text-xs font-semibold uppercase tracking-wide text-gold transition-colors hover:bg-gold/20"
        >
          <Plus size={14} /> New Event
        </button>
      </div>

      {loading ? (
        <p className="font-body text-sm text-beige/60">Loading events…</p>
      ) : error ? (
        <p className="font-body text-sm text-beige/60">{error}</p>
      ) : (
        <div className="overflow-x-auto border border-gold/20">
          <table className="w-full min-w-[760px] border-collapse text-left">
            <thead>
              <tr className="border-b border-gold/20 bg-navy">
                {['Event', 'Category', 'Team', 'Expected', 'Registration', 'Actions'].map((h) => (
                  <th key={h} className="px-4 py-3 font-body text-[11px] font-semibold uppercase tracking-widest text-beige/60">
                    {h}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {events.map((event) => (
                <tr key={event.id} className="border-b border-gold/10 last:border-b-0 hover:bg-white/[0.02]">
                  <td className="px-4 py-3 font-body text-sm text-cream">{event.event_name}</td>
                  <td className="px-4 py-3 font-body text-xs uppercase tracking-wide text-beige/60">{event.category}</td>
                  <td className="px-4 py-3 font-body text-xs text-beige/70">
                    {event.team_type === 'team' ? `Team (${event.team_size})` : 'Individual'}
                  </td>
                  <td className="px-4 py-3 font-body text-xs text-beige/70">{event.expected_participants}</td>
                  <td className="px-4 py-3">
                    <button
                      type="button"
                      onClick={() => toggleRegistration(event)}
                      disabled={togglingSlug === event.slug}
                      className={`flex items-center gap-1.5 border px-2.5 py-1 font-body text-[11px] font-semibold uppercase tracking-wide transition-colors disabled:opacity-50 ${
                        event.registration_open
                          ? 'border-gold/40 text-gold hover:bg-gold/10'
                          : 'border-beige/20 text-beige/40 hover:bg-white/5'
                      }`}
                    >
                      {togglingSlug === event.slug && <Loader2 size={11} className="animate-spin" />}
                      {event.registration_open ? 'Open' : 'Closed'}
                    </button>
                  </td>
                  <td className="px-4 py-3">
                    <div className="flex items-center gap-3">
                      <button type="button" onClick={() => openEdit(event)} className="text-beige/60 hover:text-gold" aria-label="Edit">
                        <Pencil size={15} />
                      </button>
                      <button
                        type="button"
                        onClick={() => setPendingDelete(event)}
                        className="text-beige/60 hover:text-red-400"
                        aria-label="Delete"
                      >
                        <Trash2 size={15} />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      <AdminModal open={modalMode !== null} onClose={() => setModalMode(null)} title={modalMode === 'create' ? 'New Event' : 'Edit Event'}>
        <form onSubmit={handleSubmit} className="flex flex-col gap-4">
          <AdminField label="Event Name">
            <input
              required
              className={adminInputClass}
              value={form.eventName}
              onChange={(e) => setForm((f) => ({ ...f, eventName: e.target.value }))}
            />
          </AdminField>

          <div className="grid grid-cols-2 gap-4">
            <AdminField label="Category">
              <select
                className={adminInputClass}
                value={form.category}
                onChange={(e) => setForm((f) => ({ ...f, category: e.target.value as FormState['category'] }))}
              >
                <option value="technical">Technical</option>
                <option value="non-technical">Non-Technical</option>
                <option value="workshop">Workshop</option>
              </select>
            </AdminField>
            <AdminField label="Type">
              <select
                className={adminInputClass}
                value={form.eventType}
                onChange={(e) => setForm((f) => ({ ...f, eventType: e.target.value as FormState['eventType'] }))}
              >
                <option value="competition">Competition</option>
                <option value="participation">Participation</option>
              </select>
            </AdminField>
          </div>

          <AdminField label="Description">
            <textarea
              required
              rows={3}
              className={`${adminInputClass} resize-none`}
              value={form.description}
              onChange={(e) => setForm((f) => ({ ...f, description: e.target.value }))}
            />
          </AdminField>

          <div className="grid grid-cols-2 gap-4">
            <AdminField label="Team Type">
              <select
                className={adminInputClass}
                value={form.teamType}
                onChange={(e) => setForm((f) => ({ ...f, teamType: e.target.value as FormState['teamType'] }))}
              >
                <option value="individual">Individual</option>
                <option value="team">Team</option>
              </select>
            </AdminField>
            <AdminField label="Team Size">
              <input
                required
                className={adminInputClass}
                value={form.teamSize}
                onChange={(e) => setForm((f) => ({ ...f, teamSize: e.target.value }))}
              />
            </AdminField>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <AdminField label="Duration">
              <input
                required
                className={adminInputClass}
                value={form.duration}
                onChange={(e) => setForm((f) => ({ ...f, duration: e.target.value }))}
              />
            </AdminField>
            <AdminField label="Expected Participants">
              <input
                required
                type="number"
                min={1}
                className={adminInputClass}
                value={form.expectedParticipants}
                onChange={(e) => setForm((f) => ({ ...f, expectedParticipants: e.target.value }))}
              />
            </AdminField>
          </div>

          <AdminField label="Venue">
            <input
              required
              className={adminInputClass}
              value={form.venue}
              onChange={(e) => setForm((f) => ({ ...f, venue: e.target.value }))}
            />
          </AdminField>

          <AdminField label="Resources">
            <input
              className={adminInputClass}
              value={form.resources}
              onChange={(e) => setForm((f) => ({ ...f, resources: e.target.value }))}
            />
          </AdminField>

          <div className="grid grid-cols-3 gap-4">
            <AdminField label="Budget">
              <input
                className={adminInputClass}
                value={form.budget}
                onChange={(e) => setForm((f) => ({ ...f, budget: e.target.value }))}
              />
            </AdminField>
            <AdminField label="Prize Pool">
              <input
                className={adminInputClass}
                value={form.prizePool}
                onChange={(e) => setForm((f) => ({ ...f, prizePool: e.target.value }))}
              />
            </AdminField>
            <AdminField label="Registration Fee">
              <input
                className={adminInputClass}
                value={form.registrationFee}
                onChange={(e) => setForm((f) => ({ ...f, registrationFee: e.target.value }))}
              />
            </AdminField>
          </div>

          <AdminField label="Why This Event Is Included">
            <textarea
              rows={2}
              className={`${adminInputClass} resize-none`}
              value={form.whyIncluded}
              onChange={(e) => setForm((f) => ({ ...f, whyIncluded: e.target.value }))}
            />
          </AdminField>

          <label className="flex items-center gap-2 font-body text-sm text-beige/80">
            <input
              type="checkbox"
              checked={form.prequalifierRequired}
              onChange={(e) => setForm((f) => ({ ...f, prequalifierRequired: e.target.checked }))}
              className="h-4 w-4 accent-[#d4af37]"
            />
            Prequalifier required
          </label>

          {formError && <p className="font-body text-sm text-red-400">{formError}</p>}

          <button
            type="submit"
            disabled={saving}
            className="mt-2 flex items-center justify-center gap-2 border border-gold bg-gold px-6 py-3 font-body text-sm font-semibold uppercase tracking-wide text-navy transition-colors hover:bg-gold-light disabled:opacity-50"
          >
            {saving && <Loader2 size={14} className="animate-spin" />}
            {saving ? 'Saving…' : modalMode === 'create' ? 'Create Event' : 'Save Changes'}
          </button>
        </form>
      </AdminModal>

      <AdminModal open={pendingDelete !== null} onClose={() => setPendingDelete(null)} title="Delete Event">
        <p className="font-body text-sm text-beige/80">
          Delete <span className="text-gold">{pendingDelete?.event_name}</span> permanently? This cannot be undone.
        </p>
        <div className="mt-6 flex justify-end gap-3">
          <button
            type="button"
            onClick={() => setPendingDelete(null)}
            className="border border-gold/25 px-4 py-2 font-body text-xs font-semibold uppercase tracking-wide text-beige/70 hover:text-gold"
          >
            Cancel
          </button>
          <button
            type="button"
            onClick={confirmDelete}
            className="border border-red-500/50 bg-red-500/10 px-4 py-2 font-body text-xs font-semibold uppercase tracking-wide text-red-300 hover:bg-red-500/20"
          >
            Delete
          </button>
        </div>
      </AdminModal>
    </div>
  );
}
