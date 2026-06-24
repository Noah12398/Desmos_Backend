import * as authRepo from './auth.repo.js';
import * as userRepo from '../user/user.repo.js';
import { NotFoundError } from '../../utils/errors.js';

/**
 * Handle user sign-in or registration
 * @param {object} data - Raw request body
 * @returns {Promise<object>} The signed-in or created user
 */
export async function signin(data) {
  // Data is assumed to be already validated
  let user = await authRepo.findUserByPhone(data.phone);

  if (user) {
    if (data.fcm_token && user.fcm_token !== data.fcm_token) {
      user = await userRepo.updateFcmToken(user.id, data.fcm_token);
    }
    return user;
  }

  return await userRepo.createUser({
    name: data.name,
    phone: data.phone,
    fcm_token: data.fcm_token,
    userId: data.userId
  });
}

export async function me(id) {
  const user = await authRepo.findUserDetailsById(id);
  if (!user) {
    throw new NotFoundError('User not found');
  }
  return user;
}