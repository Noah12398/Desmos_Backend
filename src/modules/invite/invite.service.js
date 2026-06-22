import * as inviteRepo from './invite.repo.js';
import * as familyRepo from '../family/family.repo.js';
import { NotFoundError, ForbiddenError } from '../../utils/errors.js';

export async function getInvites(validated) {
  return await inviteRepo.getInvites(validated);
}

export async function acceptInvite(validated) {
  const invite=await inviteRepo.getInviteById(validated);
  if(!invite) throw new NotFoundError('Invite not found');

  if (invite.invitedUserId !== validated.userId) {
    throw new ForbiddenError('You are not authorized to accept this invite');
  }

  if(invite.status !== 'PENDING') throw new ForbiddenError('Invite is already accepted or rejected');

  const updatedInvite = await inviteRepo.updateInvite(invite.id, 'ACCEPTED');
  
  await familyRepo.addFamilyMember({
    groupId: invite.groupId,
    userId: invite.invitedUserId,
    role: 'MEMBER'
  });
  
  return updatedInvite;
}