import * as familyRepo from './family.repo.js';

export async function createFamily(validated) {
  const family = await familyRepo.createFamily(validated);
  return family;
}
