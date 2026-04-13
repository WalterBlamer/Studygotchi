import { z } from 'zod';

export const CreateNoteSchema = z.object({
  title: z.string().min(1).max(30),
  text: z.string().min(1).max(160),
});

export type NoteBody = z.infer<typeof CreateNoteSchema>;
