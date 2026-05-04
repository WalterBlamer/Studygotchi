import { z } from 'zod';

export const CreateEventSchema = z.object({
  text: z.string().min(1).max(160),
  date: z.iso.date().optional(),
});

export const EditEventSchema = z.object({
  text: z.string().min(1).max(160).optional(),
  date: z.iso.date().optional(),
});

export type EventBody = z.infer<typeof CreateEventSchema>;
