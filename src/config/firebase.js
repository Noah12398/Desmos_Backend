import { initializeApp, cert, getApps } from "firebase-admin/app";

let app = null;

if (!process.env.FIREBASE_SERVICE_ACCOUNT) {
  console.warn(
    "WARNING: FIREBASE_SERVICE_ACCOUNT environment variable is not set."
  );
} else {
  try {
    const serviceAccount = JSON.parse(process.env.FIREBASE_SERVICE_ACCOUNT);

    if (getApps().length === 0) {
      app = initializeApp({
        credential: cert(serviceAccount),
      });
    } else {
      app = getApps()[0];
    }
  } catch (err) {
    console.error("Firebase initialization failed:", err);
  }
}

export default app;