import { getApps } from "firebase-admin/app";
import { getMessaging } from "firebase-admin/messaging";

export async function sendPushNotification(fcmToken, title, body) {
  try {
    if (getApps().length === 0) {
      console.warn("Firebase not initialized.");
      return;
    }

    await getMessaging().send({
      token: fcmToken,
      notification: {
        title,
        body,
      },
    });
  } catch (error) {
    console.error("Error sending notification:", error);
  }
}