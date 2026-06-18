import { db } from '../../config/db.js';
import { familyGroups } from '../../db/schema.js';
import { dbAction } from '../../utils/helpers.js';

// Create a new family group (wrapped in dbAction for error handling)
export const createFamily = dbAction(async ({ name, owner_id }) => {
  const [newFamily] = await db
    .insert(familyGroups)
    .values({
      name,
      ownerId: owner_id,
    })
    .returning();
  return newFamily;
});
