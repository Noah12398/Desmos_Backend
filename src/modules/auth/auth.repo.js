import { db } from '../../config/db.js';
import { users } from '../../db/schema.js';
import { eq } from 'drizzle-orm';
import { dbAction } from '../../utils/helpers.js';

export const findUserByEmail = dbAction(async (email) => {
  const [user]=await db.select({
    id: users.id,
    fcm_token: users.fcm_token
  })
  .from(users)
  .where(eq(users.email, email))
  .limit(1);
  return user;
});

export const findUserDetailsById = dbAction(async (id) => {
  const [user] = await db
    .select()
    .from(users)
    .where(eq(users.id, id))
    .limit(1);
  return user;
});