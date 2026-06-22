import { ok } from '../../utils/helpers.js';
import * as inviteService from './invite.service.js';
import {inviteActionSchema} from './invite.schema.js';

export async function getInvites(req, res, next) {
  try {
    const userId = req.user.id;
    const invites = await inviteService.getInvites({ userId });
    return ok(res, invites);
  } catch (error) {
    next(error);
  }
}

export async function acceptInvite(req, res, next) {
  try {
    const { inviteId } = req.params;
    const userId = req.user.id;
    const validated=inviteActionSchema.parse({inviteId,userId});
    const invite = await inviteService.acceptInvite(validated);
    return ok(res, invite);
  } catch (error) {
    next(error);
  }
}

export async function rejectInvite(req, res, next) {
  try {
    const { inviteId } = req.params;
    const userId = req.user.id;
    const validated=inviteActionSchema.parse({inviteId,userId});
    const invite = await inviteService.rejectInvite(validated);
    return ok(res, invite);
  } catch (error) {
    next(error);
  }
}
