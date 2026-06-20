import * as familyRepo from './family.repo.js';
import { ForbiddenError } from '../../utils/errors.js';
export async function createFamily(validated) {
  const family = await familyRepo.createFamilyWithMember(validated);
  return family;
}

export async function getFamilyMembers(validated){
  const family=await familyRepo.getFamilyMembers(validated);
  return family;
}
export async function removeFamilyMember(validated){
  const member=await familyRepo.removeFamilyMember(validated);
  return member;
}
export async function getFamilies(validated){
  const families=await familyRepo.getFamilies(validated);
  return families;
}

export async function inviteUser(validated){
  const owner=await familyRepo.isOwner(validated.inviterId,validated.groupId);
  if (!owner) throw new ForbiddenError('Only owner can invite');
  const {invite,user}=await familyRepo.inviteUser(validated);
  
  const groupName = await familyRepo.getGroupName(validated.groupId);
  const message = `You have been invited to join a ${groupName.name} family`;
  if (user.fcmToken) {
    await sendPushNotification(user.fcmToken, 'Family Invitation', message);
  }

  return invite;
}