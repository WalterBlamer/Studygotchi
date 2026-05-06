import { z } from 'zod';

export const CreateActivitySchema = z.object({
  title: z.string().min(1).max(30),
  text: z.string().min(1).max(160),
  hours: z.number().positive().max(120),
  activityDate: z.string().regex(/^\d{4}-\d{2}-\d{2}$/), //YYYY-MM-DD format
});

export const EditActivitySchema = z.object({
  title: z.string().min(1).max(30).optional(),
  text: z.string().min(1).max(160).optional(),
  hours: z.number().optional(),
  activityDate: z.iso.datetime().optional(),
});

export type ActivityBody = z.infer<typeof CreateActivitySchema>;
