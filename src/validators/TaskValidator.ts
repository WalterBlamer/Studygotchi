import { z } from 'zod';

export const CreateTaskSchema = z.object({
  title: z.string().min(1).max(30),
  text: z.string().min(1).max(160),
});

export const EditTaskSchema = z.object({
  title: z.string().min(1).max(30).optional(),
  text: z.string().min(1).max(160).optional(),
  completed: z.boolean().optional(),
});

export type TaskBody = z.infer<typeof CreateTaskSchema>;
