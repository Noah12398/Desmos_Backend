import { z } from 'zod';

export const inviteActionSchema = z.object({
  inviteId: z.uuid(),
  userId: z.uuid()
}).strict();

