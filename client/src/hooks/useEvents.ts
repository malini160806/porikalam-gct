import { useEffect, useState } from 'react';
import { fetchEventBySlug, fetchEvents } from '@/lib/eventsApi';
import type { EventItem } from '@/data/types';

type EventsState = {
  events: EventItem[];
  loading: boolean;
  error: string | null;
};

/** Fetches the full finalized event list from the database once on mount. */
export function useEvents() {
  const [state, setState] = useState<EventsState>({ events: [], loading: true, error: null });

  useEffect(() => {
    let cancelled = false;
    fetchEvents()
      .then((events) => {
        if (!cancelled) setState({ events, loading: false, error: null });
      })
      .catch(() => {
        if (!cancelled) setState({ events: [], loading: false, error: 'Could not load events right now.' });
      });
    return () => {
      cancelled = true;
    };
  }, []);

  return state;
}

type EventState = {
  event: EventItem | null;
  loading: boolean;
};

/** Fetches a single event by slug from the database. `event` stays null on a 404 or while loading. */
export function useEvent(slug: string | undefined) {
  const [state, setState] = useState<EventState>({ event: null, loading: true });

  useEffect(() => {
    if (!slug) {
      setState({ event: null, loading: false });
      return;
    }
    let cancelled = false;
    setState({ event: null, loading: true });
    fetchEventBySlug(slug).then((event) => {
      if (!cancelled) setState({ event, loading: false });
    });
    return () => {
      cancelled = true;
    };
  }, [slug]);

  return state;
}
