import * as familyRepo from './family.repo.js';

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