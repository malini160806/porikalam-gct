import type { AdminRole } from "../models/Admin.js";

export const ROLE_PERMISSIONS: Record<AdminRole, string[]> = {
  super_admin: [
    "manage_events",
    "view_registrations",
    "manage_users",
    "manage_admins",
    "view_attendance",
    "manage_event_settings",
    "view_payments",
  ],
  event_admin: ["view_assigned_registrations", "view_assigned_participants", "manage_assigned_attendance", "scan_qr"],
};
