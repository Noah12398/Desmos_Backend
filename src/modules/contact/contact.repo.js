import { db } from '../../config/db.js';
import { contacts, familyMembers, users } from '../../db/schema.js';
import { dbAction } from '../../utils/helpers.js';
import { sql, eq, inArray, and } from 'drizzle-orm'; 

export const syncContacts = dbAction(
  async ({ userId, contacts: contactsToSync }) => {
    const now = new Date();
    const rows = contactsToSync.map(contact => ({
      ownerUserId: userId,
      phoneHash: contact.phoneHash,
      displayName: contact.displayName,
      updatedAt: now,
    }));

    const inserted = await db
      .insert(contacts)
      .values(rows)
      .onConflictDoUpdate({
        target: [contacts.ownerUserId, contacts.phoneHash],
        set: {
          displayName: sql`excluded.display_name`,
          updatedAt: now,
        },
      });

    return inserted;
  }
);


export const lookupContacts = dbAction(
  async ({ contact_hash, userId }) => {

    const familyIdsSubquery = db
      .select({ groupId: familyMembers.groupId })
      .from(familyMembers)
      .where(eq(familyMembers.userId, userId));

    const result = await db
      .select({
        id: contacts.id,
        displayName: contacts.displayName,
        ownerUserId: contacts.ownerUserId,
        ownerName: users.name,
      })
      .from(contacts)
      .innerJoin(
        users,
        eq(users.id, contacts.ownerUserId)
      )
      .innerJoin(
        familyMembers,
        eq(familyMembers.userId, contacts.ownerUserId)
      )
      .where(
        and(
          eq(contacts.phoneHash, contact_hash),
          inArray(
            familyMembers.groupId,
            familyIdsSubquery
          )
        )
      );

    return result;
  }
);
