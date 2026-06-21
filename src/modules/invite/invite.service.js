import * as inviteRepo from './invite.repo.js';

export async function getInvites(validated) {
  return await inviteRepo.getInvites(validated);
}
