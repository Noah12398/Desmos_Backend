import { createUserSchema } from '../user/user.schema.js';
import { ok } from '../../utils/helpers.js';
import * as authService from './auth.service.js';

export async function signin(req, res, next) {
  try {
    // Validate request body and merge with verified phone
    const validated = createUserSchema.parse({
      ...req.body,
      phone: req.user.phone,
    });
    const user = await authService.signin(validated);
    return ok(res, user);
  } catch (error) {
    next(error);
  }
}

export async function me(req, res, next) {
  try {
    const user = await authService.me(req.user.phone);
    return ok(res, user);
  } catch (error) {
    next(error);
  }
}