import { Announcement } from "../models/Announcement.js";
import { env } from "../config/env.js";

const GRAPH_API_VERSION = "v21.0";
const GRAPH_API_BASE = `https://graph.facebook.com/${GRAPH_API_VERSION}`;

interface InstagramMediaItem {
  id: string;
  caption?: string;
  media_url?: string;
  permalink: string;
  timestamp: string;
}

interface FacebookPostItem {
  id: string;
  message?: string;
  full_picture?: string;
  permalink_url: string;
  created_time: string;
}

function truncateTitle(text: string, max = 80): string {
  const firstLine = text.split("\n")[0].trim();
  if (firstLine.length <= max) return firstLine;
  return `${firstLine.slice(0, max - 1).trimEnd()}…`;
}

async function pollInstagram(): Promise<void> {
  if (!env.instagramBusinessAccountId) return;

  const url = `${GRAPH_API_BASE}/${env.instagramBusinessAccountId}/media?fields=id,caption,media_url,permalink,timestamp&limit=10&access_token=${env.metaAccessToken}`;
  const response = await fetch(url);
  if (!response.ok) {
    console.error(`[social-feed] instagram poll failed: ${response.status} ${await response.text()}`);
    return;
  }
  const data = (await response.json()) as { data?: InstagramMediaItem[] };

  for (const item of data.data ?? []) {
    const caption = item.caption?.trim() || "New Instagram post from Porikkalam";
    await Announcement.updateOne(
      { source: "instagram", sourcePostId: item.id },
      {
        $set: {
          title: truncateTitle(caption),
          content: caption,
          date: new Date(item.timestamp),
          category: "social",
          sourceUrl: item.permalink,
          mediaUrl: item.media_url ?? null,
        },
        $setOnInsert: { pinned: false },
      },
      { upsert: true },
    );
  }
}

async function pollFacebook(): Promise<void> {
  if (!env.facebookPageId) return;

  const url = `${GRAPH_API_BASE}/${env.facebookPageId}/posts?fields=id,message,full_picture,permalink_url,created_time&limit=10&access_token=${env.metaAccessToken}`;
  const response = await fetch(url);
  if (!response.ok) {
    console.error(`[social-feed] facebook poll failed: ${response.status} ${await response.text()}`);
    return;
  }
  const data = (await response.json()) as { data?: FacebookPostItem[] };

  for (const item of data.data ?? []) {
    const message = item.message?.trim();
    if (!message) continue; // skip posts with no caption text — nothing to show as an announcement

    await Announcement.updateOne(
      { source: "facebook", sourcePostId: item.id },
      {
        $set: {
          title: truncateTitle(message),
          content: message,
          date: new Date(item.created_time),
          category: "social",
          sourceUrl: item.permalink_url,
          mediaUrl: item.full_picture ?? null,
        },
        $setOnInsert: { pinned: false },
      },
      { upsert: true },
    );
  }
}

/**
 * Pulls the latest Instagram + Facebook posts into Announcements so social updates show up
 * automatically. No-ops silently (no crash, no noisy logging) when META_ACCESS_TOKEN isn't
 * configured — auto-pull is opt-in once the org has a Meta developer app approved.
 */
export async function pollSocialFeeds(): Promise<void> {
  if (!env.metaAccessToken) return;
  const results = await Promise.allSettled([pollInstagram(), pollFacebook()]);
  for (const result of results) {
    if (result.status === "rejected") console.error("[social-feed] poll error:", result.reason);
  }
}
