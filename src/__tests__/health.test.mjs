// src/__tests__/health.test.js
import request from 'supertest';
import app from '../../src/app.js';

describe('GET /health', () => {
  it('should return status ok and database connected', async () => {
    const response = await request(app).get('/health');
    expect(response.status).toBe(200);
    expect(response.body).toMatchObject({ status: 'ok', database: 'connected' });
  });
});
