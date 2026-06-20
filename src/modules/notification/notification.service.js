import admin from 'firebase-admin';

// Make sure firebase-admin is initialized. 
// If it has not been initialized elsewhere, initialize it here.
if (admin.apps.length === 0) {
  admin.initializeApp();
}

/**
 * Send a push notification using Firebase Cloud Messaging (FCM)
 * @param {string} fcmToken - The target device token
 * @param {string} title - The notification title
 * @param {string} body - The notification message body
 */
export async function sendPushNotification(fcmToken, title, body) {
  try {
    await admin.messaging().send({
      token: fcmToken,
      notification: {
        title,
        body
      }
    });
  } catch (error) {
    console.error('Error sending push notification via Firebase:', error);
    // Do not throw the error, so that it does not crash the calling request (e.g. family invitation creation)
  }
}
