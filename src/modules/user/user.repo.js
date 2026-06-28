import { db } from '../../config/db.js';
import { users } from '../../db/schema.js';
import { eq } from 'drizzle-orm';
import { dbAction } from '../../utils/helpers.js';


// Create a new user (wrapped in dbAction)
export const createUser = dbAction(async ({ name, email, fcm_token,userId }) => {
  const [newuser] = await db
    .insert(users)
    .values({
      id:userId,
      name,
      email,
      fcm_token
    })
    .returning();
  return newuser;
});

// Update a user's FCM token (wrapped in dbAction)
export const updateFcmToken = dbAction(async (userId, fcm_token) => {
  const [updatedUser] = await db
    .update(users)
    .set({ fcm_token })
    .where(eq(users.id, userId))
    .returning();
  return updatedUser;
});

export const getUserNameById = dbAction(async ({ userId }) => {
  const [user] = await db
    .select({ name: users.name })
    .from(users)
    .where(eq(users.id, userId));
  return user;
});
