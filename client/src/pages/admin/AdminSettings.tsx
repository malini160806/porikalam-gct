import { useState, type FormEvent } from 'react';
import { KeyRound, Loader2 } from 'lucide-react';
import { AdminField, adminInputClass } from '@/components/admin/AdminModal';
import { adminApiFetch, AdminApiError } from '@/lib/adminApiClient';
import { useAdminSession } from '@/context/AdminSessionContext';

export default function AdminSettings() {
  const { admin } = useAdminSession();
  const [currentPassword, setCurrentPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [error, setError] = useState('');
  const [success, setSuccess] = useState(false);
  const [saving, setSaving] = useState(false);

  async function handleSubmit(e: FormEvent) {
    e.preventDefault();
    setError('');
    setSuccess(false);

    if (newPassword !== confirmPassword) {
      setError('New password and confirmation do not match.');
      return;
    }

    setSaving(true);
    try {
      await adminApiFetch('/auth/password', {
        method: 'PATCH',
        body: JSON.stringify({ currentPassword, newPassword }),
      });
      setSuccess(true);
      setCurrentPassword('');
      setNewPassword('');
      setConfirmPassword('');
    } catch (err) {
      setError(err instanceof AdminApiError ? err.message : 'Could not update your password right now.');
    } finally {
      setSaving(false);
    }
  }

  return (
    <div className="flex flex-col gap-8">
      <h2 className="font-heading text-lg font-semibold uppercase tracking-wide text-gold">Settings</h2>

      <div className="border border-gold/20 bg-navy p-6">
        <h3 className="font-body text-xs font-semibold uppercase tracking-widest text-beige/60">Account</h3>
        <dl className="mt-4 grid grid-cols-1 gap-3 sm:grid-cols-2">
          <div>
            <dt className="font-body text-[11px] uppercase tracking-wide text-beige/50">Name</dt>
            <dd className="font-body text-sm text-cream">{admin?.name}</dd>
          </div>
          <div>
            <dt className="font-body text-[11px] uppercase tracking-wide text-beige/50">Username</dt>
            <dd className="font-body text-sm text-cream">{admin?.username}</dd>
          </div>
          <div>
            <dt className="font-body text-[11px] uppercase tracking-wide text-beige/50">Email</dt>
            <dd className="font-body text-sm text-cream">{admin?.email}</dd>
          </div>
          <div>
            <dt className="font-body text-[11px] uppercase tracking-wide text-beige/50">Role</dt>
            <dd className="font-body text-sm text-cream">{admin?.role === 'super_admin' ? 'Super Admin' : 'Event Admin'}</dd>
          </div>
        </dl>
      </div>

      <div className="max-w-md border border-gold/20 bg-navy p-6">
        <h3 className="flex items-center gap-2 font-body text-xs font-semibold uppercase tracking-widest text-beige/60">
          <KeyRound size={14} /> Change Password
        </h3>
        <form onSubmit={handleSubmit} className="mt-4 flex flex-col gap-4">
          <AdminField label="Current Password">
            <input
              required
              type="password"
              autoComplete="current-password"
              className={adminInputClass}
              value={currentPassword}
              onChange={(e) => setCurrentPassword(e.target.value)}
            />
          </AdminField>
          <AdminField label="New Password">
            <input
              required
              type="password"
              autoComplete="new-password"
              minLength={8}
              className={adminInputClass}
              value={newPassword}
              onChange={(e) => setNewPassword(e.target.value)}
            />
          </AdminField>
          <AdminField label="Confirm New Password">
            <input
              required
              type="password"
              autoComplete="new-password"
              minLength={8}
              className={adminInputClass}
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
            />
          </AdminField>

          {error && <p className="font-body text-sm text-red-400">{error}</p>}
          {success && <p className="font-body text-sm text-gold">Password updated.</p>}

          <button
            type="submit"
            disabled={saving}
            className="flex items-center justify-center gap-2 border border-gold bg-gold px-6 py-3 font-body text-sm font-semibold uppercase tracking-wide text-navy transition-colors hover:bg-gold-light disabled:opacity-50"
          >
            {saving && <Loader2 size={14} className="animate-spin" />}
            {saving ? 'Updating…' : 'Update Password'}
          </button>
        </form>
      </div>
    </div>
  );
}
