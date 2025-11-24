import { z } from 'zod';

export const sendMessageSchema = z.object({
  project_name: z.string().min(1),
  type: z.enum(['error', 'info', 'warn']),
  payload: z.record(z.unknown()).optional(),
  datetime: z.string().datetime().optional().default(new Date().toISOString()),
});

export type SendMessagePayload = z.infer<typeof sendMessageSchema>;

