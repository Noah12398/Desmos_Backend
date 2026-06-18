import { z } from 'zod';

export const createUserSchema = z.object({
  name: z.string({ required_error: "Name is required" })
    .trim()
    .min(1, "Name cannot be empty")
    .max(20, "Name cannot exceed 20 characters"),
  phone: z.string({ required_error: "Phone number is required" })
    .trim()
    .min(10, "Phone number is too short"),
  fcm_token: z.string().optional(),
}).strict();
