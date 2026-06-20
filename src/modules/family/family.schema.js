import { z } from 'zod';

export const createFamilySchema = z.object({
  name: z.string({ required_error: "Group name is required" })
    .trim()
    .min(1, "Group name cannot be empty")
    .max(20, "Group name cannot exceed 20 characters"),
  // owner_id comes from req.user.id (injected by controller), not from request body
  owner_id: z.string({ required_error: "Owner Id is required" }),
}).strict();

export const familyIdSchema = z.object({
  id: z.uuid()
}).strict();

export const removeMemberSchema = z.object({
  id: z.uuid(),
  userId: z.uuid()
}).strict();

export const inviteSchema = z.object({
  groupId:z.uuid(),
  inviterId:z.uuid(),
  phone:z.string()
    .regex(/^[0-9]{10}$/,"Invalid phone number")
    .min(10,"Phone number is too short")
    .max(10,"Phone number is too long").trim(),
}).strict();