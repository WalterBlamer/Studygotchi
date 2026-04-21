import { z } from 'zod';

export const CreatePurchaseSchema = z.object({
  itemId: z.string(),
});

export type PurchaseBody = z.infer<typeof CreatePurchaseSchema>;
