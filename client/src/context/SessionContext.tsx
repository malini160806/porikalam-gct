import { createContext, useCallback, useContext, useEffect, useState, type ReactNode } from 'react';
import { apiFetch } from '@/lib/apiClient';
import { AUTH_CHANGED_EVENT, clearToken, getToken } from '@/lib/tokenStorage';
import type { AuthUser, MeResponse, RegistrationDto } from '@/types/api';

export interface SessionState {
  user: AuthUser | null;
  isLoading: boolean;
  isAdmin: boolean;
  isSuperAdmin: boolean;
  registrations: RegistrationDto[];
  refresh: () => Promise<void>;
  signOut: () => void;
}

const SessionContext = createContext<SessionState | null>(null);

export function SessionProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<AuthUser | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isAdmin, setIsAdmin] = useState(false);
  const [isSuperAdmin, setIsSuperAdmin] = useState(false);
  const [registrations, setRegistrations] = useState<RegistrationDto[]>([]);

  const load = useCallback(async () => {
    if (!getToken()) {
      setUser(null);
      setIsAdmin(false);
      setIsSuperAdmin(false);
      setRegistrations([]);
      setIsLoading(false);
      return;
    }

    setIsLoading(true);
    try {
      const data = await apiFetch<MeResponse>('/auth/me');
      setUser(data.user);
      setIsAdmin(data.isAdmin);
      setIsSuperAdmin(data.isSuperAdmin);
      setRegistrations(data.registrations);
    } catch {
      clearToken();
      setUser(null);
      setIsAdmin(false);
      setIsSuperAdmin(false);
      setRegistrations([]);
    } finally {
      setIsLoading(false);
    }
  }, []);

  useEffect(() => {
    void load();
    window.addEventListener(AUTH_CHANGED_EVENT, load);
    return () => window.removeEventListener(AUTH_CHANGED_EVENT, load);
  }, [load]);

  const signOut = useCallback(() => {
    clearToken();
  }, []);

  return (
    <SessionContext.Provider value={{ user, isLoading, isAdmin, isSuperAdmin, registrations, refresh: load, signOut }}>
      {children}
    </SessionContext.Provider>
  );
}

export function useSession(): SessionState {
  const context = useContext(SessionContext);
  if (!context) throw new Error('useSession must be used within a SessionProvider');
  return context;
}
