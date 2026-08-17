import { useCallback, useEffect, useState } from 'react';
import { adminApiFetch } from '@/lib/adminApiClient';
import type {
  AdminDto,
  AdminEventDto,
  AdminParticipantsResponse,
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
