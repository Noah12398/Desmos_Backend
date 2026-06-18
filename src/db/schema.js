import { 
  pgTable, 
  uuid, 
  varchar, 
  text, 
  timestamp, 
  primaryKey,
  uniqueIndex,
  unique
} from "drizzle-orm/pg-core";

export const users = pgTable("users", {
  id: uuid("id").defaultRandom().primaryKey(),
  name: varchar("name", { length: 15 }).notNull(),
  phone: text("phone").notNull().unique(),
  createdAt: timestamp("created_at", { withTimezone: true }).defaultNow().notNull(),
  fcm_token: varchar("fcm_token", { length: 255 })
});

export const familyGroups = pgTable("family_groups", {
  id: uuid("id").defaultRandom().primaryKey(),
  name: text("name").notNull(),
  ownerId: uuid("owner_id").references(() => users.id, { onDelete: 'cascade' })
});

export const familyMembers = pgTable("family_members", {
  groupId: uuid("group_id").notNull().references(() => familyGroups.id, { onDelete: 'cascade' }),
  userId: uuid("user_id").notNull().references(() => users.id, { onDelete: 'cascade' }),
  role: text("role", { enum: ['OWNER', 'MEMBER'] }).notNull()
}, (t) => [
  primaryKey({ columns: [t.groupId, t.userId] })
]);

export const contacts = pgTable("contacts", {
  id: uuid("id").defaultRandom().primaryKey(),
  ownerUserId: uuid("owner_user_id").notNull().references(() => users.id, { onDelete: 'cascade' }),
  phoneHash: text("phone_hash").notNull(),
  displayName: text("display_name"),
  updatedAt: timestamp("updated_at", { withTimezone: true }).defaultNow()
}, (t) => [
  unique("idx_contacts_owner_phone").on(t.ownerUserId, t.phoneHash),
]);

export const familyInvites = pgTable("family_invites", {
  id: uuid("id").defaultRandom().primaryKey(),
  groupId: uuid("group_id").notNull().references(() => familyGroups.id, { onDelete: 'cascade' }),
  invitedUserId: uuid("invited_user_id").notNull().references(() => users.id, { onDelete: 'cascade' }),
  invitedBy: uuid("invited_by").notNull().references(() => users.id, { onDelete: 'cascade' }),
  status: text("status", { enum: ['PENDING', 'ACCEPTED', 'REJECTED'] }).notNull(),
  createdAt: timestamp("created_at", { withTimezone: true }).defaultNow().notNull()
});
