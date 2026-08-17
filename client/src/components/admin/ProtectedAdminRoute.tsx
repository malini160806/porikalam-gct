import type { ReactNode } from 'react';
import { Navigate } from 'react-router-dom';
import { useAdminSession } from '@/context/AdminSessionContext';

type ProtectedAdminRouteProps = {
  children: ReactNode;
  /** When true, only super_admin may pass — event_admin sees an Access Denied message instead of a redirect. */
  requireSuperAdmin?: boolean;
};

export function ProtectedAdminRoute({ children, requireSuperAdmin = false }: ProtectedAdminRouteProps) {
  const { admin, isLoading } = useAdminSession();

  if (isLoading) {
    return (
      <div className="flex min-h-[60vh] items-center justify-center bg-navy-deep">
        <div className="h-8 w-8 animate-spin border-2 border-gold/30 border-t-gold" />
      </div>
    );
  }

  if (!admin) return <Navigate to="/admin/login" replace />;

  if (requireSuperAdmin && admin.role !== 'super_admin') {
    return (
      <div className="flex min-h-[60vh] flex-col items-center justify-center gap-3 bg-navy-deep px-4 text-center">
        <p className="font-heading text-2xl font-bold uppercase tracking-wide text-gold">Access Denied</p>
        <p className="max-w-sm font-body text-sm text-beige/70">
          This section is restricted to super admins. Your account does not have the required permissions.
        </p>
      </div>
    );
  }

  return <>{children}</>;
}
