import { createContext, useCallback, useContext, useEffect, useState, type ReactNode } from 'react';
import { adminApiFetch } from '@/lib/adminApiClient';
import { ADMIN_AUTH_CHANGED_EVENT, clearAdminToken, getAdminToken } from '@/lib/adminTokenStorage';
import type { AdminDto, AdminMeResponse } from '@/types/adminApi';

export interface AdminSessionState {
  admin: AdminDto | null;
  isLoading: boolean;
  refresh: () => Promise<void>;
  signOut: () => void;
}

const AdminSessionContext = createContext<AdminSessionState | null>(null);

export function AdminSessionProvider({ children }: { children: ReactNode }) {
  const [admin, setAdmin] = useState<AdminDto | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  const load = useCallback(async () => {
    if (!getAdminToken()) {
      setAdmin(null);
      setIsLoading(false);
      return;
    }

    setIsLoading(true);
    try {
      const data = await adminApiFetch<AdminMeResponse>('/auth/me');
      setAdmin(data.admin);
    } catch {
      clearAdminToken();
      setAdmin(null);
    } finally {
      setIsLoading(false);
    }
  }, []);

  useEffect(() => {
    void load();
    window.addEventListener(ADMIN_AUTH_CHANGED_EVENT, load);
    return () => window.removeEventListener(ADMIN_AUTH_CHANGED_EVENT, load);
  }, [load]);

  const signOut = useCallback(() => {
    clearAdminToken();
  }, []);

  return (
    <AdminSessionContext.Provider value={{ admin, isLoading, refresh: load, signOut }}>
      {children}
    </AdminSessionContext.Provider>
  );
}

export function useAdminSession(): AdminSessionState {
  const context = useContext(AdminSessionContext);
  if (!context) throw new Error('useAdminSession must be used within an AdminSessionProvider');
  return context;
}
