import admin from "firebase-admin";

if (!process.env.FIREBASE_SERVICE_ACCOUNT) {
  console.warn("WARNING: FIREBASE_SERVICE_ACCOUNT environment variable is not set. Push notifications will not function.");
} else {
  try {
    const serviceAccount = JSON.parse(process.env.FIREBASE_SERVICE_ACCOUNT);
    admin.initializeApp({
      credential: admin.credential.cert(serviceAccount),
    });
  } catch (error) {
    console.error("ERROR: Failed to initialize Firebase Admin SDK. Please check your FIREBASE_SERVICE_ACCOUNT env value.", error);
  }
}