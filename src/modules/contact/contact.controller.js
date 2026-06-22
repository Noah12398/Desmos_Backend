import { ok } from '../../utils/helpers.js';
import * as contactService from './contact.service.js';
import {contactSyncSchema} from './contact.schema.js';

export async function syncContacts(req, res, next) {
  try {
    const validated = contactSyncSchema.parse(req.body);

    const result = await contactService.syncContacts({ ...validated, userId: req.user.id });

    return ok(res, result);
  } catch (error) {
    next(error);
  }
}