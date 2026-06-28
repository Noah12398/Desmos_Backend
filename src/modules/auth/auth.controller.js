import { signinSchema, registerSchema } from '../user/user.schema.js';
import { ok } from '../../utils/helpers.js';
import * as authService from './auth.service.js';

export async function signin(req, res, next) {
  try {
    const validated = signinSchema.parse(req.body);
    const result = await authService.signin({ ...validated, email: req.user.email, userId: req.user.id });
    return ok(res, result);
  } catch (error) {
    next(error);
  }
}

export async function register(req, res, next) {
  try {
    const validated = registerSchema.parse(req.body);
    const user = await authService.register({ ...validated, email: req.user.email, userId: req.user.id });
    return ok(res, user, 201);
  } catch (error) {
    next(error);
  }
}

export async function me(req, res, next) {
  try {
    const user = await authService.me(req.user.id);
    return ok(res, user);
  } catch (error) {
    next(error);
  }
}