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
  await AppDataSource.query('TRUNCATE TABLE "note" RESTART IDENTITY CASCADE');
});

describe('POST /api/notes', (): void => {
  it('returns 400 with a missing title', async (): Promise<void> => {
    const res = await request(app).post('/api/notes').send({
      text: 'missing title',
    });

    expect(res.status).toBe(400);
  });
});

describe('GET /api/notes', (): void => {
  it('returns 200 when getting notes', async (): Promise<void> => {
    const res = await request(app).get('/api/notes');
    expect(res.status).toBe(200);
  });
});
