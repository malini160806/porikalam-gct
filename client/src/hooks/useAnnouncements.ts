import { useEffect, useState } from 'react';
import { fetchAnnouncements } from '@/lib/announcementsApi';
import type { AnnouncementItem } from '@/data/types';

type AnnouncementsState = {
  announcements: AnnouncementItem[];
  loading: boolean;
  error: string | null;
};

/** Fetches announcements (manual + auto-pulled social posts) from the database once on mount. */
export function useAnnouncements() {
  const [state, setState] = useState<AnnouncementsState>({ announcements: [], loading: true, error: null });

  useEffect(() => {
    let cancelled = false;
    fetchAnnouncements()
      .then((announcements) => {
        if (!cancelled) setState({ announcements, loading: false, error: null });
      })
      .catch(() => {
        if (!cancelled) setState({ announcements: [], loading: false, error: 'Could not load announcements right now.' });
      });
    return () => {
      cancelled = true;
    };
  }, []);

  return state;
}
