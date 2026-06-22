import { db } from '../../config/db.js';
import { familyInvites, users, familyGroups } from '../../db/schema.js';
import { dbAction } from '../../utils/helpers.js';
import { eq, and } from 'drizzle-orm';

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
    .where(
      and(
        eq(familyInvites.invitedUserId, userId),
        eq(familyInvites.status, 'PENDING')
      )
    );

  return invites;
});

export const getInviteById = dbAction(async ({ inviteId }) => {
  const [invite] = await db
    .select()
    .from(familyInvites)
    .where(eq(familyInvites.id, inviteId));
  return invite;
});

export const updateInvite = dbAction(async (inviteId, status) => {
  const [invite] = await db
    .update(familyInvites)
    .set({ status })
    .where(eq(familyInvites.id, inviteId))
    .returning();
  return invite;
});