import dns from "node:dns";
import mongoose from "mongoose";
import { env } from "../config/env.js";

const MAX_ATTEMPTS = 5;
const RETRY_DELAY_MS = 2000;

function sleep(ms: number): Promise<void> {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

// mongodb+srv:// needs a DNS SRV lookup before it can connect at all. Some
// machines point Node at a local resolver stub (VPN client, router-assigned
// IPv6 DNS, etc.) that answers normal A/AAAA queries fine but refuses SRV
// queries outright ("querySrv ECONNREFUSED"), even though the same lookup
// succeeds through the OS resolver. Falling back to a public resolver just
// for this process's own lookups sidesteps that without touching system-wide
// DNS settings.
if (env.mongoUri.startsWith("mongodb+srv://")) {
  dns.setServers(["8.8.8.8", "1.1.1.1", ...dns.getServers()]);
}

// Serverless (Vercel) invocations can reuse a warm module scope between requests but
// never get a graceful shutdown, so — unlike connectToDatabase — this never retries in
// a loop or calls process.exit; it just caches the in-flight/connected promise so a warm
// function reuses the existing connection instead of opening a new one per request.
let serverlessConnection: Promise<typeof mongoose> | null = null;

export function connectToDatabaseServerless(): Promise<typeof mongoose> {
  if (!serverlessConnection) {
    serverlessConnection = mongoose.connect(env.mongoUri).catch((err) => {
      serverlessConnection = null;
      throw err;
    });
  }
  return serverlessConnection;
}

export async function connectToDatabase(): Promise<void> {
  mongoose.connection.on("error", (err) => {
    console.error("[mongo] connection error:", err.message);
  });
  mongoose.connection.on("disconnected", () => {
    console.warn("[mongo] disconnected");
  });

  for (let attempt = 1; attempt <= MAX_ATTEMPTS; attempt += 1) {
    try {
      await mongoose.connect(env.mongoUri);
      console.log("[mongo] connected");
      return;
    } catch (err) {
      const message = err instanceof Error ? err.message : String(err);
      console.error(`[mongo] connection attempt ${attempt}/${MAX_ATTEMPTS} failed: ${message}`);
      if (attempt === MAX_ATTEMPTS) {
        console.error(`[mongo] could not connect to MongoDB after ${MAX_ATTEMPTS} attempts.`);
        process.exit(1);
      }
      await sleep(RETRY_DELAY_MS);
    }
  }
}
