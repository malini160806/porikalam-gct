import dotenv from "dotenv";
import path from "node:path";

dotenv.config({ path: path.resolve(process.cwd(), ".env") });

function required(name: string): string {
  const value = process.env[name];
  if (!value) {
    throw new Error(`Missing required environment variable: ${name}`);
  }
  return value;
}

export const env = {
  mongoUri: required("MONGODB_URI"),
  jwtSecret: required("JWT_SECRET"),
  adminJwtSecret: required("ADMIN_JWT_SECRET"),
  port: Number(process.env.PORT ?? 5000),
  superAdminEmail: (process.env.SUPER_ADMIN_EMAIL ?? "").toLowerCase(),
  smtpUser: process.env.SMTP_USER ?? "",
  smtpPass: process.env.SMTP_PASS ?? "",
  clientUrl: process.env.CLIENT_URL ?? "http://localhost:5173",
  adminSignupCode: process.env.ADMIN_SIGNUP_CODE ?? "",
  adminSeedEmail: process.env.ADMIN_SEED_EMAIL ?? "",
  adminSeedUsername: process.env.ADMIN_SEED_USERNAME ?? "",
  adminSeedPassword: process.env.ADMIN_SEED_PASSWORD ?? "",
  // Optional — Meta Graph API credentials for auto-pulling Instagram/Facebook posts into
  // Announcements. Leave blank to keep the feature disabled entirely.
  metaAccessToken: process.env.META_ACCESS_TOKEN ?? "",
  instagramBusinessAccountId: process.env.INSTAGRAM_BUSINESS_ACCOUNT_ID ?? "",
  facebookPageId: process.env.FACEBOOK_PAGE_ID ?? "",
};
