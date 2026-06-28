// src/__tests__/health.test.js
const request = require('supertest');
const app = require('../../src/app');

describe('GET /health', () => {
  it('should return status ok and database connected', async () => {
    const response = await request(app).get('/health');
    expect(response.status).toBe(200);
    expect(response.body).toMatchObject({ status: 'ok', database: 'connected' });
  });
});
