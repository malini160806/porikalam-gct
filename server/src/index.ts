import { env } from "./config/env.js";
import { connectToDatabase } from "./db/connection.js";
import { ensureCollections } from "./models/index.js";
import { createApp } from "./app.js";
import { pollSocialFeeds } from "./services/socialFeed.js";

const SOCIAL_POLL_INTERVAL_MS = 15 * 60 * 1000;

async function main(): Promise<void> {
  await connectToDatabase();
  await ensureCollections();

  const app = createApp();

  app.listen(env.port, () => {
    console.log(`[server] listening on http://localhost:${env.port}`);
  });

  if (env.metaAccessToken) {
    console.log("[social-feed] auto-pull enabled — polling Instagram/Facebook every 15 minutes");
    void pollSocialFeeds();
    setInterval(() => void pollSocialFeeds(), SOCIAL_POLL_INTERVAL_MS);
  }
}

main().catch((error) => {
  console.error("[server] failed to start:", error);
  process.exit(1);
});
