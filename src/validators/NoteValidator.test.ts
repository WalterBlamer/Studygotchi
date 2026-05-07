import { CreateNoteSchema } from './NoteValidator.js';

describe('CreateNoteSchema', (): void => {
  it('accepts valid note input ', (): void => {
    const result = CreateNoteSchema.safeParse({
      title: 'Inventory',
      text: 'boxes, tape, stuff',
    });
    expect(result.success).toBe(true);
  });

  it('rejects an empty title', (): void => {
    const result = CreateNoteSchema.safeParse({ title: '' });
    expect(result.success).toBe(false);
  });

  it('rejects title over 30 characters', (): void => {
    const result = CreateNoteSchema.safeParse({
      title: 'b'.repeat(31),
      text: 'Invalid title',
    });
    expect(result.success).toBe(false);
  });
});
