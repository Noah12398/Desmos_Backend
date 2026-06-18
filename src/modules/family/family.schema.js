import { z } from 'zod';

export const createFamilySchema = z.object({
  name: z.string({ required_error: "Group name is required" })
    .trim()
    .min(1, "Group name cannot be empty")
    .max(20, "Group name cannot exceed 20 characters"),
  // owner_id comes from req.user.id (injected by controller), not from request body
  owner_id: z.string({ required_error: "Owner Id is required" }),
}).strict();
