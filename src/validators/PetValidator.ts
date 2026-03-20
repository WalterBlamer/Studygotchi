import { z } from 'zod';

export const CreatePetSchema = z.object({
  petName: z.string().min(1).max(30),
  outfitId: z.number().int().positive().optional(),
  colorSchemeId: z.number().int().positive().optional(),
  speciesId: z.number().int().positive(),
});

export type PetBody = z.infer<typeof CreatePetSchema>;
