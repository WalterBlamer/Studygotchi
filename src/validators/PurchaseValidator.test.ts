import { CreatePurchaseSchema } from './PurchaseValidator.js';

describe('CreatePurchaseSchema', (): void => {
  it('accepts a valid itemId string', (): void => {
    const result = CreatePurchaseSchema.safeParse({ itemId: 'some-uuid-here' });
    expect(result.success).toBe(true);
  });

  it('rejects a missing itemId', (): void => {
    const result = CreatePurchaseSchema.safeParse({});
    expect(result.success).toBe(false);
  });

  it('rejects a non-string itemId', (): void => {
    const result = CreatePurchaseSchema.safeParse({ itemId: 123 });
    expect(result.success).toBe(false);
  });
});
