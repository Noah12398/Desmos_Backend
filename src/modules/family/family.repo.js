import { db } from '../../config/db.js';
import { familyGroups,familyMembers,users,familyInvites} from '../../db/schema.js';
import { dbAction } from '../../utils/helpers.js';
import { eq ,and} from 'drizzle-orm';

export const createFamilyWithMember = dbAction(async ({ name, owner_id }) => {
  return await db.transaction(async (tx) => {
    const [newFamily] = await tx
      .insert(familyGroups)
      .values({
        name,
        ownerId: owner_id,
      })
      .returning();

    await tx
      .insert(familyMembers)
      .values({
        groupId: newFamily.id,
        userId: owner_id,
        role: 'OWNER',
      });

    return newFamily;
  });
});


export const addFamilyMember = dbAction(async ({groupId,userId,role}) => {
  const [member] = await db
    .insert(familyMembers)
    .values({
      groupId,
      userId,
      role
    })
    .returning();
  return member;
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

export const getFamilies = dbAction(async ({ userId }) => {
  const families = await db
    .select({
      id: familyGroups.id,
      name: familyGroups.name,
      role: familyMembers.role,
    })
    .from(familyGroups)
    .innerJoin(
      familyMembers,
      eq(familyGroups.id, familyMembers.groupId)
    )
    .where(eq(familyMembers.userId, userId));

  return families;
});

export const isOwner=dbAction(async ({userId,groupId})=>{
  const [owner]=await db.select()
    .from(familyMembers)
    .where(and(eq(familyMembers.userId,userId),eq(familyMembers.groupId,groupId),eq(familyMembers.role,'OWNER')));
  return owner;
})

export const getGroupName=dbAction(async ({groupId})=>{
  const [group]=await db.select({name:familyGroups.name})
    .from(familyGroups)
    .where(eq(familyGroups.id,groupId));
  return group;
})

export const inviteUser = dbAction(async ({ groupId, inviterId, userId }) => {
  const [invite] = await db
    .insert(familyInvites)
    .values({
      groupId,
      invitedBy: inviterId,
      invitedUserId: userId,
      status: 'PENDING'
    })
    .returning();

  return invite;
});
