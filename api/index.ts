// Vercel only auto-detects Serverless Functions under a root-level `api/` directory,
// so this thin stub re-exports the real handler, which lives with the rest of the
// server code at server/api/index.ts.
export { default } from "../server/api/index.js";
