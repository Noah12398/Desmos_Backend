import { db } from '../../config/db.js';
import { familyInvites, users, familyGroups } from '../../db/schema.js';
import { dbAction } from '../../utils/helpers.js';
import { eq } from 'drizzle-orm';

export const getInvites = dbAction(async ({ userId }) => {
  const invites = await db
    .select({
      id: familyInvites.id,
      invitedByName: users.name,
      groupName: familyGroups.name
    })
    .from(familyInvites)
    .innerJoin(users, eq(familyInvites.invitedBy, users.id))
    .innerJoin(familyGroups, eq(familyInvites.groupId, familyGroups.id))
    .where(eq(familyInvites.invitedUserId, userId));

  return invites;
});
