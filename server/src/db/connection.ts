import mongoose from "mongoose";
import { env } from "../config/env.js";

const MAX_ATTEMPTS = 5;
const RETRY_DELAY_MS = 2000;

function sleep(ms: number): Promise<void> {
  return new Promise((resolve) => setTimeout(resolve, ms));
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
