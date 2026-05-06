import { z } from 'zod';

export const CreateEventSchema = z.object({
  text: z.string().min(1).max(160),
  eventDate: z.iso.datetime(),
});

export const EditEventSchema = z.object({
  text: z.string().min(1).max(160).optional(),
  eventDate: z.iso.datetime().optional(),
});

export type EventBody = z.infer<typeof CreateEventSchema>;
