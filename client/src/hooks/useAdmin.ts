import { useCallback, useEffect, useState } from 'react';
import { adminApiDownload, adminApiFetch } from '@/lib/adminApiClient';
import type {
  AdminAttendanceLookupResponse,
  AdminDto,
  AdminEventDto,
  AdminParticipantsResponse,
  AdminPaymentsResponse,
  AdminRegistrationsResponse,
  AdminStatsDto,
} from '@/types/adminApi';

export function useAdminStats() {
  const [stats, setStats] = useState<AdminStatsDto | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let cancelled = false;
    adminApiFetch<AdminStatsDto>('/stats')
      .then((data) => {
        if (!cancelled) setStats(data);
      })
      .finally(() => {
        if (!cancelled) setLoading(false);
      });
    return () => {
      cancelled = true;
    };
  }, []);

  return { stats, loading };
}

export function useAdminEvents() {
  const [events, setEvents] = useState<AdminEventDto[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const reload = useCallback(() => {
    setLoading(true);
    setError(null);
    return adminApiFetch<{ events: AdminEventDto[] }>('/events')
      .then((data) => setEvents(data.events))
      .catch(() => setError('Could not load events right now.'))
      .finally(() => setLoading(false));
  }, []);

  useEffect(() => {
    void reload();
  }, [reload]);

  return { events, loading, error, reload };
}

export function useAdminParticipants(query: string, page: number) {
  const [data, setData] = useState<AdminParticipantsResponse | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let cancelled = false;
    setLoading(true);
    const params = new URLSearchParams({ page: String(page), limit: '20' });
    if (query) params.set('q', query);
    adminApiFetch<AdminParticipantsResponse>(`/participants?${params.toString()}`)
      .then((result) => {
        if (!cancelled) setData(result);
      })
      .finally(() => {
        if (!cancelled) setLoading(false);
      });
    return () => {
      cancelled = true;
    };
  }, [query, page]);

  return { data, loading };
}

export interface RegistrationFilters {
  q: string;
  event: string;
  payment: 'all' | 'paid' | 'pending' | 'free';
  attendance: 'all' | 'checked-in' | 'not-checked-in';
  page: number;
}

function registrationParams(filters: RegistrationFilters): URLSearchParams {
  const params = new URLSearchParams({
    page: String(filters.page),
    limit: '25',
    payment: filters.payment,
    attendance: filters.attendance,
  });
  if (filters.q) params.set('q', filters.q);
  if (filters.event && filters.event !== 'all') params.set('event', filters.event);
  return params;
}

export function useAdminRegistrations(filters: RegistrationFilters) {
  const [data, setData] = useState<AdminRegistrationsResponse | null>(null);
  const [loading, setLoading] = useState(true);

  const reload = useCallback(() => {
    setLoading(true);
    return adminApiFetch<AdminRegistrationsResponse>(`/registrations?${registrationParams(filters).toString()}`)
      .then((result) => setData(result))
      .finally(() => setLoading(false));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [filters.q, filters.event, filters.payment, filters.attendance, filters.page]);

  useEffect(() => {
    void reload();
  }, [reload]);

  return { data, loading, reload };
}

export function downloadAdminRegistrationsCsv(filters: RegistrationFilters): Promise<void> {
  const params = registrationParams(filters);
  return adminApiDownload(`/registrations/export?${params.toString()}`, `registrations-${Date.now()}.csv`);
}

export interface PaymentFilters {
  q: string;
  status: 'all' | 'pending' | 'paid' | 'rejected';
  page: number;
}

export function useAdminPayments(filters: PaymentFilters) {
  const [data, setData] = useState<AdminPaymentsResponse | null>(null);
  const [loading, setLoading] = useState(true);

  const reload = useCallback(() => {
    setLoading(true);
    const params = new URLSearchParams({ page: String(filters.page), limit: '25', status: filters.status });
    if (filters.q) params.set('q', filters.q);
    return adminApiFetch<AdminPaymentsResponse>(`/payments?${params.toString()}`)
      .then((result) => setData(result))
      .finally(() => setLoading(false));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [filters.q, filters.status, filters.page]);

  useEffect(() => {
    void reload();
  }, [reload]);

  return { data, loading, reload };
}

export function confirmAdminPayment(id: string) {
  return adminApiFetch(`/payments/${id}/confirm`, { method: 'POST' });
}

export function rejectAdminPayment(id: string) {
  return adminApiFetch(`/payments/${id}/reject`, { method: 'POST' });
}

export function lookupAdminAttendance(username: string) {
  return adminApiFetch<AdminAttendanceLookupResponse>(`/attendance/lookup?${new URLSearchParams({ username }).toString()}`);
}

export function checkInAdminRegistration(id: string) {
  return adminApiFetch<{ checked_in_at: string }>(`/attendance/${id}/checkin`, { method: 'POST' });
}

export function undoAdminCheckIn(id: string) {
  return adminApiFetch<{ checked_in_at: null }>(`/attendance/${id}/undo`, { method: 'POST' });
}

export function useAdminAdmins() {
  const [admins, setAdmins] = useState<AdminDto[]>([]);
  const [loading, setLoading] = useState(true);

  const reload = useCallback(() => {
    setLoading(true);
    return adminApiFetch<{ admins: AdminDto[] }>('/admins')
      .then((data) => setAdmins(data.admins))
      .finally(() => setLoading(false));
  }, []);

  useEffect(() => {
    void reload();
  }, [reload]);

  return { admins, loading, reload };
}
