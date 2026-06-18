import { createFamilySchema } from './family.schema.js';
import { ok } from '../../utils/helpers.js';
import * as familyService from './family.service.js';

export async function createFamily(req, res, next) {
  try {
    const validated = createFamilySchema.parse({
      ...req.body,
      owner_id: req.user.id, // injected from JWT via authMiddleware
    });
    const family = await familyService.createFamily(validated);
    return ok(res, family);
  } catch (error) {
    next(error);
  }
}
