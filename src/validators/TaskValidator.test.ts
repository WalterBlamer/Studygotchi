import { CreateTaskSchema } from './TaskValidator.js';

describe('CreateTaskSchema', (): void => {
  it('accepts valid task input with all optional fields', (): void => {
    const result = CreateTaskSchema.safeParse({
      title: 'Finish project',
      text: 'Last section of the project',
      completed: false,
    });
    expect(result.success).toBe(true);
  });

  it('rejects an empty title', (): void => {
    const result = CreateTaskSchema.safeParse({
      title: '',
      text: 'task with no title',
    });
    expect(result.success).toBe(false);
  });

  it('rejects a missing text input', (): void => {
    const result = CreateTaskSchema.safeParse({
      title: 'Bad task',
      text: '',
    });
    expect(result.success).toBe(false);
  });
});
