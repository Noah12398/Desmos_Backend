import * as userRepo from './user.repo.js';

export async function updateFcmToken(userId, fcmToken) {
  return await userRepo.updateFcmToken(userId, fcmToken);
}
