import { CreatePetSchema } from './PetValidator.js';

describe('CreatePetSchema', (): void => {
  it('accepts valid input with only required fields', (): void => {
    const result = CreatePetSchema.safeParse({ petName: 'Christopher', speciesId: 1 });
    expect(result.success).toBe(true);
  });

  it('accepts valid input with all optional fields', (): void => {
    const result = CreatePetSchema.safeParse({
      petName: 'Christopher',
      speciesId: 1,
      outfitId: 2,
      colorSchemeId: 3,
    });
    expect(result.success).toBe(true);
  });

  it('rejects an empty petName', (): void => {
    const result = CreatePetSchema.safeParse({ petName: '', speciesId: 1 });
    expect(result.success).toBe(false);
  });

  it('rejects a petName over 30 characters', (): void => {
    const result = CreatePetSchema.safeParse({
      petName: 'a'.repeat(31),
      speciesId: 1,
    });
    expect(result.success).toBe(false);
  });

  it('rejects a missing speciesId', (): void => {
    const result = CreatePetSchema.safeParse({ petName: 'Christopher' });
    expect(result.success).toBe(false);
  });

  it('rejects a non-integer speciesId', (): void => {
    const result = CreatePetSchema.safeParse({ petName: 'Christopher', speciesId: 1.5 });
    expect(result.success).toBe(false);
  });
});
