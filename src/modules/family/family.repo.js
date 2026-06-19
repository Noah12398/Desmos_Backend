import { db } from '../../config/db.js';
import { familyGroups,familyMembers,users } from '../../db/schema.js';
import { dbAction } from '../../utils/helpers.js';
import { eq ,and} from 'drizzle-orm';

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

export const getFamilyMembers = dbAction(async ({ id: groupId }) => {
  const members = await db
    .select({
      id: users.id,
      name: users.name,
      phone: users.phone,
      role: familyMembers.role,
    })
    .from(familyMembers)
    .innerJoin(
      users,
      eq(users.id, familyMembers.userId)
    )
    .where(eq(familyMembers.groupId, groupId));
  return members;
});

export const removeFamilyMember = dbAction(async ({ id: groupId, userId }) => {
  const member = await db
    .delete(familyMembers)
    .where(and(eq(familyMembers.groupId, groupId),eq(familyMembers.userId, userId))).returning();
  return member;
});