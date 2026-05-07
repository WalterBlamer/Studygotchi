import { jest } from '@jest/globals';
import { Request, Response } from 'express';

export function mockResponse(): Response {
  return {
    status: jest.fn().mockReturnThis(),
    json: jest.fn().mockReturnThis(),
    sendStatus: jest.fn().mockReturnThis(),
    send: jest.fn().mockReturnThis(),
  } as unknown as Response;
}

export function mockRequest(overrides: Partial<Request> = {}): Request {
  return { params: {}, body: {}, query: {}, session: {}, ...overrides } as unknown as Request;
}
