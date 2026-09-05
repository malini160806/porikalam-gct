import { User } from "./User.js";
import { Role } from "./Role.js";
import { Counter } from "./Counter.js";
import { Event } from "./Event.js";
import { Admin } from "./Admin.js";
import { Announcement } from "./Announcement.js";
import { Registration } from "./Registration.js";
import { PrequalifierSubmission } from "./PrequalifierSubmission.js";
import { ThuliraApplication } from "./ThuliraApplication.js";
import { TechThiralApplication } from "./TechThiralApplication.js";
import { env } from "../config/env.js";

export {
  User,
  Role,
  Counter,
  Event,
  Admin,
  Announcement,
  Registration,
  PrequalifierSubmission,
  ThuliraApplication,
  TechThiralApplication,
};

const allModels = [
  User,
  Role,
  Counter,
  Event,
  Admin,
  Announcement,
  Registration,
  PrequalifierSubmission,
  ThuliraApplication,
  TechThiralApplication,
];

/**
 * Explicitly creates every collection (and its indexes) at boot so all
 * required collections exist immediately, even before any document is written.
 */
export async function ensureCollections(): Promise<void> {
  for (const collectionModel of allModels) {
    await collectionModel.createCollection().catch(() => undefined);
  }

  // Bootstrap: whoever matches SUPER_ADMIN_EMAIL always has a super_admin role.
  if (env.superAdminEmail) {
    const superAdminUser = await User.findOne({ email: env.superAdminEmail });
    if (superAdminUser) {
      await Role.updateOne(
        { userId: superAdminUser._id, role: "super_admin" },
        { $setOnInsert: { userId: superAdminUser._id, role: "super_admin" } },
        { upsert: true },
      );
    }
  }

  await Promise.all(allModels.map((collectionModel) => collectionModel.syncIndexes()));
}
