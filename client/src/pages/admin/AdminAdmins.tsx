import { useState, type FormEvent } from 'react';
import { Plus, Loader2, ShieldOff } from 'lucide-react';
import { AdminModal, AdminField, adminInputClass } from '@/components/admin/AdminModal';
import { useAdminAdmins, useAdminEvents } from '@/hooks/useAdmin';
import { adminApiFetch, AdminApiError } from '@/lib/adminApiClient';
import { useAdminSession } from '@/context/AdminSessionContext';

type FormState = {
  username: string;
  email: string;
  name: string;
  role: 'super_admin' | 'event_admin';
  assignedEvents: string[];
  password: string;
};

const EMPTY_FORM: FormState = {
  username: '',
  email: '',
  name: '',
  role: 'event_admin',
  assignedEvents: [],
  password: '',
};

export default function AdminAdmins() {
  const { admins, loading, reload } = useAdminAdmins();
  const { events } = useAdminEvents();
  const { admin: currentAdmin } = useAdminSession();
  const [modalOpen, setModalOpen] = useState(false);
  const [form, setForm] = useState<FormState>(EMPTY_FORM);
  const [formError, setFormError] = useState('');
  const [saving, setSaving] = useState(false);

  function toggleAssignedEvent(slug: string) {
    setForm((f) => ({
      ...f,
      assignedEvents: f.assignedEvents.includes(slug)
        ? f.assignedEvents.filter((s) => s !== slug)
        : [...f.assignedEvents, slug],
    }));
  }

  async function handleSubmit(e: FormEvent) {
    e.preventDefault();
    setSaving(true);
    setFormError('');
    try {
      await adminApiFetch('/admins', { method: 'POST', body: JSON.stringify(form) });
      setModalOpen(false);
      setForm(EMPTY_FORM);
      await reload();
    } catch (err) {
      setFormError(err instanceof AdminApiError ? err.message : 'Could not create this admin right now.');
    } finally {
      setSaving(false);
    }
  }

  async function deactivate(id: string) {
    await adminApiFetch(`/admins/${id}`, { method: 'DELETE' });
    await reload();
  }

  return (
    <div className="flex flex-col gap-6">
      <div className="flex items-center justify-between">
        <h2 className="font-heading text-lg font-semibold uppercase tracking-wide text-gold">Admin Management</h2>
        <button
          type="button"
          onClick={() => {
            setForm(EMPTY_FORM);
            setFormError('');
            setModalOpen(true);
          }}
          className="flex items-center gap-2 border border-gold/40 bg-gold/10 px-4 py-2 font-body text-xs font-semibold uppercase tracking-wide text-gold transition-colors hover:bg-gold/20"
        >
          <Plus size={14} /> New Admin
        </button>
      </div>

      {loading ? (
        <p className="font-body text-sm text-beige/60">Loading admins…</p>
      ) : (
        <div className="overflow-x-auto border border-gold/20">
          <table className="w-full min-w-[760px] border-collapse text-left">
            <thead>
              <tr className="border-b border-gold/20 bg-navy">
                {['Name', 'Username', 'Email', 'Role', 'Status', 'Last Login', ''].map((h) => (
                  <th key={h} className="px-4 py-3 font-body text-[11px] font-semibold uppercase tracking-widest text-beige/60">
                    {h}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {admins.map((a) => (
                <tr key={a.id} className="border-b border-gold/10 last:border-b-0 hover:bg-white/[0.02]">
                  <td className="px-4 py-3 font-body text-sm text-cream">{a.name}</td>
                  <td className="px-4 py-3 font-body text-xs text-beige/70">{a.username}</td>
                  <td className="px-4 py-3 font-body text-xs text-beige/70">{a.email}</td>
                  <td className="px-4 py-3 font-body text-xs uppercase tracking-wide text-beige/60">
                    {a.role === 'super_admin' ? 'Super Admin' : 'Event Admin'}
                  </td>
                  <td className="px-4 py-3">
                    <span
                      className={`border px-2 py-0.5 font-body text-[11px] uppercase tracking-wide ${
                        a.is_active ? 'border-gold/40 text-gold' : 'border-beige/20 text-beige/40'
                      }`}
                    >
                      {a.is_active ? 'Active' : 'Deactivated'}
                    </span>
                  </td>
                  <td className="px-4 py-3 font-body text-xs text-beige/50">
                    {a.last_login ? new Date(a.last_login).toLocaleString('en-IN') : 'Never'}
                  </td>
                  <td className="px-4 py-3">
                    {a.is_active && a.id !== currentAdmin?.id && (
                      <button
                        type="button"
                        onClick={() => deactivate(a.id)}
                        className="flex items-center gap-1 text-beige/60 hover:text-red-400"
                        aria-label="Deactivate"
                      >
                        <ShieldOff size={14} />
                      </button>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      <AdminModal open={modalOpen} onClose={() => setModalOpen(false)} title="New Admin">
        <form onSubmit={handleSubmit} className="flex flex-col gap-4">
          <div className="grid grid-cols-2 gap-4">
            <AdminField label="Full Name">
              <input required className={adminInputClass} value={form.name} onChange={(e) => setForm((f) => ({ ...f, name: e.target.value }))} />
            </AdminField>
            <AdminField label="Username">
              <input
                required
                className={adminInputClass}
                value={form.username}
                onChange={(e) => setForm((f) => ({ ...f, username: e.target.value }))}
              />
            </AdminField>
          </div>

          <AdminField label="Email">
            <input
              required
              type="email"
              className={adminInputClass}
              value={form.email}
              onChange={(e) => setForm((f) => ({ ...f, email: e.target.value }))}
            />
          </AdminField>

          <AdminField label="Role">
            <select
              className={adminInputClass}
              value={form.role}
              onChange={(e) => setForm((f) => ({ ...f, role: e.target.value as FormState['role'] }))}
            >
              <option value="event_admin">Event Admin</option>
              <option value="super_admin">Super Admin</option>
            </select>
          </AdminField>

          {form.role === 'event_admin' && (
            <AdminField label="Assigned Events">
              <div className="flex max-h-40 flex-col gap-1.5 overflow-y-auto border border-gold/20 p-3">
                {events.map((ev) => (
                  <label key={ev.slug} className="flex items-center gap-2 font-body text-xs text-beige/80">
                    <input
                      type="checkbox"
                      checked={form.assignedEvents.includes(ev.slug)}
                      onChange={() => toggleAssignedEvent(ev.slug)}
                      className="h-3.5 w-3.5 accent-[#d4af37]"
                    />
                    {ev.event_name}
                  </label>
                ))}
              </div>
            </AdminField>
          )}

          <AdminField label="Temporary Password">
            <input
              required
              type="text"
              minLength={8}
              className={adminInputClass}
              value={form.password}
              onChange={(e) => setForm((f) => ({ ...f, password: e.target.value }))}
              placeholder="At least 8 characters, upper + lower + number"
            />
          </AdminField>

          {formError && <p className="font-body text-sm text-red-400">{formError}</p>}

          <button
            type="submit"
            disabled={saving}
            className="mt-2 flex items-center justify-center gap-2 border border-gold bg-gold px-6 py-3 font-body text-sm font-semibold uppercase tracking-wide text-navy transition-colors hover:bg-gold-light disabled:opacity-50"
          >
            {saving && <Loader2 size={14} className="animate-spin" />}
            {saving ? 'Creating…' : 'Create Admin'}
          </button>
        </form>
      </AdminModal>
    </div>
  );
}
