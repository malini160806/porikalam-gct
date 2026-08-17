import { apiFetch } from '@/lib/apiClient';
import type { AnnouncementDto } from '@/types/api';
import type { AnnouncementItem } from '@/data/types';

function toAnnouncementItem(dto: AnnouncementDto): AnnouncementItem {
  return {
    id: dto.id,
    title: dto.title,
    date: dto.date,
    category: dto.category,
    content: dto.content,
    pinned: dto.pinned,
    source: dto.source,
    sourceUrl: dto.source_url ?? undefined,
    mediaUrl: dto.media_url ?? undefined,
  };
}

/** Fetches all announcements — manual posts plus any auto-pulled Instagram/Facebook updates,
 * already sorted pinned-first then newest-first by the server. */
export async function fetchAnnouncements(): Promise<AnnouncementItem[]> {
  const { announcements } = await apiFetch<{ announcements: AnnouncementDto[] }>('/announcements', { auth: false });
  return announcements.map(toAnnouncementItem);
}
