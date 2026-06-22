import { db } from '../../config/db.js';
import { contacts } from '../../db/schema.js';
import { dbAction } from '../../utils/helpers.js';
import { sql } from 'drizzle-orm'; 

export const syncContacts = dbAction(
  async ({ userId, contacts: contactsToSync }) => {

    const rows = contactsToSync.map(contact => ({
      ownerUserId: userId,
      phoneHash: contact.phoneHash,
      displayName: contact.displayName,
      updatedAt: new Date(),
    }));

    const inserted = await db
      .insert(contacts)
      .values(rows)
      .onConflictDoUpdate({
        target: [contacts.ownerUserId, contacts.phoneHash],
        set: {
          displayName: sql`excluded.display_name`,
          updatedAt: new Date(),
        },
      });

    return inserted;
  }
);
