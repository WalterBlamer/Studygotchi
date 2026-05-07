import { CreateStudyRoomSchema } from './StudyRoomValidator.js';

describe('CreateStudyRoomSchema', (): void => {
  it('accepts valid room name input', (): void => {
    const result = CreateStudyRoomSchema.safeParse({ roomName: 'Study Group' });
    expect(result.success).toBe(true);
  });

  it('rejects an empty room name', (): void => {
    const result = CreateStudyRoomSchema.safeParse({ roomName: '' });
    expect(result.success).toBe(false);
  });
});
