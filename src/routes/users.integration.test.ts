import request from 'supertest';
import { createApp } from '../app.js';
import { AppDataSource } from '../dataSource.js';

const app = createApp();

beforeAll(async (): Promise<void> => {
  await AppDataSource.initialize();
});

afterAll(async (): Promise<void> => {
  await AppDataSource.destroy();
});

beforeEach(async (): Promise<void> => {
  await AppDataSource.query('TRUNCATE TABLE "user" RESTART IDENTITY CASCADE');
});

describe('POST /api/users — register', (): void => {
  it('returns 400 with an invalid email', async (): Promise<void> => {
    const res = await request(app).post('/api/users').send({
      email: 'not-an-email',
      password: 'password123',
      displayName: 'Tester',
    });

    expect(res.status).toBe(400);
  });

  it('returns 400 with a password that is too short', async (): Promise<void> => {
    const res = await request(app).post('/api/users').send({
      email: 'test@test.com',
      password: 'short',
      displayName: 'Tester',
    });

    expect(res.status).toBe(400);
  });
});

describe('GET /api/me', (): void => {
  it('returns 401 when not logged in', async (): Promise<void> => {
    const res = await request(app).get('/api/me');
    expect(res.status).toBe(401);
  });
});
