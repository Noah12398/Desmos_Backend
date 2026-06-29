import { ok } from '../../utils/helpers.js';
import * as userService from './user.service.js';
import { z } from 'zod';

const fcmTokenSchema = z.object({
  fcm_token: z.string().min(1, 'fcm_token is required')
}).strict();

export async function updateFcmToken(req, res, next) {
  try {
    const validated = fcmTokenSchema.parse(req.body);
    const result = await userService.updateFcmToken(req.user.id, validated.fcm_token);
    return ok(res, result);
  } catch (error) {
    next(error);
  }
}
