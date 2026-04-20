import { z } from 'zod';

export const RegistrationSchema = z.object({
  email: z.email(),
  // Enforce minimum complexity before hashing
  password: z.string().min(8).max(64),
  displayName: z.string().min(4).max(15),
});

export type UserBody = z.infer<typeof RegistrationSchema>;
