import fs from "node:fs";
import path from "node:path";
import crypto from "node:crypto";
import multer from "multer";

export const UPLOADS_ROOT = path.resolve(process.cwd(), "uploads");
export const PHOTOS_DIR = path.join(UPLOADS_ROOT, "photos");

for (const dir of [PHOTOS_DIR]) {
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
