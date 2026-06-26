import { z } from 'zod';

export const signinSchema = z.object({
  fcm_token: z.string().optional(),
}).strict();

export const registerSchema = z.object({
  name: z.string()
    .trim()
    .min(1, 'Name is required')
    .max(15, 'Name cannot exceed 15 characters'),
  fcm_token: z.string().optional(),
}).strict();
