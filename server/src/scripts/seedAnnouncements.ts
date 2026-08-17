import mongoose from "mongoose";
import { connectToDatabase } from "../db/connection.js";
import { Announcement, type AnnouncementDoc } from "../models/Announcement.js";

type SeedAnnouncement = Pick<AnnouncementDoc, "title" | "content" | "date" | "category" | "pinned">;

/** The 5 announcements that previously lived as static frontend data — migrated once so the
 * Announcements page can move to being fully database-driven. */
const announcements: SeedAnnouncement[] = [
  {
    title: "Registrations for Porikkalam 2026 are now open",
    date: new Date("2026-08-01"),
    category: "registration",
    content:
      "Create your participant account and reserve your PKM26#### username. Early registration closes soon — head to the Register page to get started.",
    pinned: true,
  },
  {
    title: "Full 2-day schedule published",
    date: new Date("2026-08-02"),
    category: "schedule",
    content:
      "The Day 1 / Day 2 event timeline is now live on the Schedule page, including the Inaugural Ceremony and Valedictory & Prize Distribution slots.",
    pinned: false,
  },
  {
    title: "AI Workshop seats are limited",
    date: new Date("2026-08-02"),
    category: "workshop",
    content: "The AI Workshop has a capped seat count. Participants are encouraged to register early to secure a spot.",
    pinned: false,
  },
  {
    title: "Accommodation requests open for outstation participants",
    date: new Date("2026-08-05"),
    category: "general",
    content:
      "On-campus accommodation can now be requested by outstation participants, subject to availability. See the Accommodation page for details.",
    pinned: false,
  },
  {
    title: "Online prequalifier round scheduled for Mid-August 2026",
    date: new Date("2026-08-06"),
    category: "schedule",
    content:
      'Events marked "Prequalifier Required" will hold their online round in Mid-August 2026. Only participants who qualify will be selected to compete in person at the 2-day mega event on 25–26 September 2026. Check the Events page to see which events require a prequalifier.',
    pinned: true,
  },
];

async function seed(): Promise<void> {
  await connectToDatabase();

  for (const announcement of announcements) {
    await Announcement.updateOne(
      { source: "manual", title: announcement.title },
      { $set: { ...announcement, source: "manual" } },
      { upsert: true },
    );
    console.log(`[seed:announcements] upserted "${announcement.title}"`);
  }

  console.log(`[seed:announcements] done — ${announcements.length} manual announcements in the database`);
  await mongoose.disconnect();
  process.exit(0);
}

seed().catch((error) => {
  console.error("[seed:announcements] failed:", error);
  process.exit(1);
});
