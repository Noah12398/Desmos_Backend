import * as familyRepo from './family.repo.js';
import { sendPushNotification } from '../notification/notification.service.js';
import * as authRepo from '../auth/auth.repo.js';
import { ForbiddenError, NotFoundError } from '../../utils/errors.js';


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


export async function inviteUser(validated) {
  const groupInfo = await familyRepo.getGroupOwnerDetails({ 
    userId: validated.inviterId, 
    groupId: validated.groupId 
  });
  if (!groupInfo) throw new ForbiddenError('Only owner can invite');

  const [user] = await authRepo.findUserByPhone(validated.phone);
  if (!user) throw new NotFoundError('User not found');
  const invite = await familyRepo.inviteUser({ ...validated, userId: user.id });
  
  const message = `You have been invited to join a ${groupInfo.groupName} family`;
  
  if (user.fcm_token) {
    await sendPushNotification(user.fcm_token, 'Family Invitation', message);
  }

  return invite;
}
