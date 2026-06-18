import { db } from '../../config/db.js';
import { users } from '../../db/schema.js';
import { eq } from 'drizzle-orm';
import { dbAction } from '../../utils/helpers.js';

// Find a user by phone number (wrapped in dbAction)
export const findUserByPhone = dbAction(async (phone) => {
  const [user] = await db
    .select()
    .from(users)
    .where(eq(users.phone, phone))
    .limit(1);
  return user;
});