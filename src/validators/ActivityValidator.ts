import { z } from 'zod';

export const CreateActivitySchema = z.object({
  title: z.string().min(1).max(30),
  text: z.string().min(1).max(160),
  hours: z.number(),
});

export const EditActivitySchema = z.object({
  title: z.string().min(1).max(30).optional(),
  text: z.string().min(1).max(160).optional(),
  hours: z.number().optional(),
});

export type ActivityBody = z.infer<typeof CreateActivitySchema>;
