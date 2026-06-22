import { ok } from '../../utils/helpers.js';
import * as contactService from './contact.service.js';
import {contactSyncSchema} from './contact.schema.js';

export async function syncContacts(req, res, next) {
  try {
    const validated = contactSyncSchema.parse({
      userId: req.user.id,
      contacts: req.body.contacts,
    });

    const result = await contactService.syncContacts(validated);

    return ok(res, result);
  } catch (error) {
    next(error);
  }
}