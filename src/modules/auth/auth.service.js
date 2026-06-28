import * as authRepo from './auth.repo.js';
import * as userRepo from '../user/user.repo.js';
import { NotFoundError, BadRequestError } from '../../utils/errors.js';

/**
 * POST /auth/signin
 * - Existing user: update fcm_token if changed, return user
 * - New user: return { isNewUser: true }
 */
export async function signin(data) {
  let user = await authRepo.findUserByEmail(data.email);

  if (user) {
    if (data.fcm_token && user.fcm_token !== data.fcm_token) {
      user = await userRepo.updateFcmToken(user.id, data.fcm_token);
    }
    return { isNewUser: false, user };
  }

  // User does not exist yet — tell the app to show CompleteProfileScreen
  return { isNewUser: true };
}

/**
 * POST /auth/register
 * - Creates a new user after the CompleteProfileScreen submits name + fcm_token
 */
export async function register(data) {
  // Guard: if user already exists, just return them
  const existing = await authRepo.findUserByEmail(data.email);
  if (existing) {
    return existing;
  }

  if (!data.name) {
    throw new BadRequestError('Name is required');
  }

  return await userRepo.createUser({
    name: data.name,
    email: data.email,
    fcm_token: data.fcm_token,
    userId: data.userId,
  });
}

/**
 * GET /auth/me
 */
export async function me(id) {
  const user = await authRepo.findUserDetailsById(id);
  if (!user) {
    throw new NotFoundError('User not found');
  }
  return user;
}