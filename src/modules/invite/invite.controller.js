import { ok } from '../../utils/helpers.js';
import * as inviteService from './invite.service.js';

export async function getInvites(req, res, next) {
  try {
    const userId = req.user.id;
    const invites = await inviteService.getInvites({ userId });
    return ok(res, invites);
  } catch (error) {
    next(error);
  }
}
