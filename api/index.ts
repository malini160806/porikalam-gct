import type { IncomingMessage, ServerResponse } from "node:http";
import { createApp } from "../server/src/app.js";
import { connectToDatabaseServerless } from "../server/src/db/connection.js";
import { ensureCollections } from "../server/src/models/index.js";

// Built once per cold start and reused across warm invocations of this function.
const app = createApp();

let collectionsReady: Promise<void> | null = null;

export default async function handler(req: IncomingMessage, res: ServerResponse): Promise<void> {
  await connectToDatabaseServerless();
  if (!collectionsReady) {
    collectionsReady = ensureCollections();
  }
  await collectionsReady;

  app(req, res);
}
