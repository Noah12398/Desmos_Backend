import { db } from '../../config/db.js';
import { users } from '../../db/schema.js';
import { eq } from 'drizzle-orm';
import { dbAction } from '../../utils/helpers.js';

export const findUserByPhone = dbAction(async (phone) => {
  const [user] = await db
    .select({
      id: users.id,
      fcm_token: users.fcm_token
    })
    .from(users)
    .where(eq(users.phone, phone))
    .limit(1);
  return user;
});

export const findUserDetailsByPhone = dbAction(async (phone) => {
  const [user] = await db
    .select()
    .from(users)
    .where(eq(users.phone, phone))
    .limit(1);
  return user;
});