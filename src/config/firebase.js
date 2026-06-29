import { initializeApp, cert, getApps } from "firebase-admin/app";
import { readFileSync } from "fs";
import { fileURLToPath } from "url";
import { dirname, join } from "path";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
const projectRoot = join(__dirname, "..", "..");

let app = null;

// --- Try 1: Parse from FIREBASE_SERVICE_ACCOUNT env var ---
let serviceAccount = null;
if (process.env.FIREBASE_SERVICE_ACCOUNT) {
  try {
    serviceAccount = JSON.parse(process.env.FIREBASE_SERVICE_ACCOUNT);
  } catch (err) {
    console.error("Firebase env var JSON parse error:", err.message);
    console.error(
      process.env.FIREBASE_SERVICE_ACCOUNT.substring(1500, 1600)
    );
  }
}

// --- Try 2: Fall back to firebaseServiceAccount.json ---
if (!serviceAccount) {
  try {
    const filePath = join(projectRoot, "firebaseServiceAccount.json");
    serviceAccount = JSON.parse(readFileSync(filePath, "utf8"));
    console.info("Loaded Firebase service account from firebaseServiceAccount.json");
  } catch {
    // file doesn't exist or is invalid — that's fine
  }
}

// --- Initialise Firebase ---
if (serviceAccount) {
  if (getApps().length === 0) {
    app = initializeApp({ credential: cert(serviceAccount) });
  } else {
    app = getApps()[0];
  }
} else {
  console.warn(
    "Firebase not initialized: no valid service account from env var or JSON file."
  );
}

export default app;