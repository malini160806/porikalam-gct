import { Counter } from "../models/Counter.js";

const SEQUENCE_KEY = "participant_username_seq";
const PREFIX = "PKM26";

/**
 * findOneAndUpdate's $inc is a single atomic operation, so concurrent
 * registrations can't collide on the same username.
 */
export async function generateUsername(): Promise<string> {
  const counter = await Counter.findOneAndUpdate(
    { _id: SEQUENCE_KEY },
    { $inc: { seq: 1 } },
    { upsert: true, returnDocument: "after" },
  );
  return `${PREFIX}${String(counter.seq).padStart(4, "0")}`;
}
