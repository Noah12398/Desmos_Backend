import {z} from 'zod';

export const contactSyncSchema = z.object({
  contacts: z.array(
    z.object({
      phoneHash: z.string({required_error:"Phone hash is required"}).min(1,"Phone hash cannot be empty").trim(),
      displayName: z.string({required_error:"Display name is required"}).min(1,"Display name cannot be empty").trim(),
    })
  ),
}).strict();