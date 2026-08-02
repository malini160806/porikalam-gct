import type { ReactNode } from 'react';
import { Navigate } from 'react-router-dom';
import { PageLoader } from '@/components/common/PageLoader';
import { useSession } from '@/context/SessionContext';

export function ProtectedRoute({ children }: { children: ReactNode }) {
  const { user, isLoading } = useSession();

  if (isLoading) return <PageLoader />;
  if (!user) return <Navigate to="/login" replace />;

  return <>{children}</>;
}
