import * as contactRepo from './contact.repo.js';
import { NotFoundError, ForbiddenError } from '../../utils/errors.js';

export async function syncContacts(validated) {
  return await contactRepo.syncContacts(validated);
}

export async function lookupContacts(validated) {
  return await contactRepo.lookupContacts(validated);
}