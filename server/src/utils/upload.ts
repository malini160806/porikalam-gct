import fs from "node:fs";
import os from "node:os";
import path from "node:path";
import crypto from "node:crypto";
import multer from "multer";

// Vercel's serverless filesystem is read-only outside /tmp, and /tmp itself is wiped
// between invocations — uploads written there won't persist. This keeps the app from
// crashing on cold start there; durable uploads need real object storage (e.g. S3).
export const UPLOADS_ROOT = process.env.VERCEL
  ? path.join(os.tmpdir(), "uploads")
  : path.resolve(process.cwd(), "uploads");
export const PHOTOS_DIR = path.join(UPLOADS_ROOT, "photos");
export const PPTS_DIR = path.join(UPLOADS_ROOT, "ppts");
export const PAYMENT_SCREENSHOTS_DIR = path.join(UPLOADS_ROOT, "payment-screenshots");

for (const dir of [PHOTOS_DIR, PPTS_DIR, PAYMENT_SCREENSHOTS_DIR]) {
  fs.mkdirSync(dir, { recursive: true });
}

function makeStorage(destination: string) {
  return multer.diskStorage({
    destination,
    filename: (_req, file, callback) => {
      const ext = path.extname(file.originalname).toLowerCase();
      callback(null, `${crypto.randomUUID()}${ext}`);
    },
  });
}

export const uploadPhoto = multer({
  storage: makeStorage(PHOTOS_DIR),
  limits: { fileSize: 3 * 1024 * 1024 },
  fileFilter: (_req, file, callback) => {
    callback(null, /^image\/(png|jpe?g|webp)$/.test(file.mimetype));
  },
});

export const uploadPpt = multer({
  storage: makeStorage(PPTS_DIR),
  limits: { fileSize: 25 * 1024 * 1024 },
  fileFilter: (_req, file, callback) => {
    const isPpt =
      /^application\/vnd\.(ms-powerpoint|openxmlformats-officedocument\.presentationml\.presentation)$/.test(
        file.mimetype,
      ) || /\.pptx?$/i.test(file.originalname);
    callback(null, isPpt);
  },
});

export const uploadPaymentScreenshot = multer({
  storage: makeStorage(PAYMENT_SCREENSHOTS_DIR),
  limits: { fileSize: 200 * 1024 },
  fileFilter: (_req, file, callback) => {
    callback(null, /^image\/(png|jpe?g|webp)$/.test(file.mimetype));
  },
});
