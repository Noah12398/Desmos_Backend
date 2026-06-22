import { z } from 'zod';

export const inviteAcceptSchema = z.object({
  inviteId: z.uuid(),
  userId: z.uuid()
}).strict();

