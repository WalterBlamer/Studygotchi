import { RegistrationSchema, LoginSchema } from './UserValidator.js';

describe('RegistrationSchema', (): void => {
  it('accepts valid registration data', (): void => {
    const result = RegistrationSchema.safeParse({
      email: 'test@test.com',
      password: 'password123',
      displayName: 'Tester',
    });
    expect(result.success).toBe(true);
  });

  it('rejects an invalid email', (): void => {
    const result = RegistrationSchema.safeParse({
      email: 'not-an-email',
      password: 'password123',
      displayName: 'Tester',
    });
    expect(result.success).toBe(false);
  });

  it('rejects a password shorter than 8 characters', (): void => {
    const result = RegistrationSchema.safeParse({
      email: 'test@test.com',
      password: 'short',
      displayName: 'Tester',
    });
    expect(result.success).toBe(false);
  });

  it('rejects a displayName shorter than 4 characters', (): void => {
    const result = RegistrationSchema.safeParse({
      email: 'test@test.com',
      password: 'password123',
      displayName: 'ab',
    });
    expect(result.success).toBe(false);
  });

  it('rejects a missing displayName', (): void => {
    const result = RegistrationSchema.safeParse({
      email: 'test@test.com',
      password: 'password123',
    });
    expect(result.success).toBe(false);
  });
});

describe('LoginSchema', (): void => {
  it('accepts valid login data', (): void => {
    const result = LoginSchema.safeParse({
      email: 'test@test.com',
      password: 'password123',
    });
    expect(result.success).toBe(true);
  });

  it('rejects an invalid email', (): void => {
    const result = LoginSchema.safeParse({
      email: 'not-an-email',
      password: 'password123',
    });
    expect(result.success).toBe(false);
  });

  it('rejects a missing password', (): void => {
    const result = LoginSchema.safeParse({ email: 'test@test.com' });
    expect(result.success).toBe(false);
  });
});
