import { z } from 'zod';

export const createUserSchema = z.object({
  name: z.string({ required_error: "Name is required" })
    .trim()
    .min(1, "Name cannot be empty")
    .max(15, "Name cannot exceed 15 characters"),
  fcm_token: z.string().optional(),
}).strict();
