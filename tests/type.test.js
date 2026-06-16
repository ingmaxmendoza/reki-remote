jest.mock('../lib/input');
const express = require('express');
const request = require('supertest');
const { typeText } = require('../lib/input');
const typeRouter = require('../routes/type');

function buildApp() {
  const app = express();
  app.use(express.json());
  app.use('/type', typeRouter);
  return app;
}

describe('POST /type', () => {
  beforeEach(() => jest.clearAllMocks());

  test('calls typeText with body.text and returns 200', async () => {
    typeText.mockResolvedValue(undefined);
    const app = buildApp();

    const res = await request(app).post('/type').send({ text: 'hello' });

    expect(typeText).toHaveBeenCalledWith('hello');
    expect(res.status).toBe(200);
  });

  test('returns 400 when text is missing', async () => {
    const app = buildApp();

    const res = await request(app).post('/type').send({});

    expect(res.status).toBe(400);
    expect(typeText).not.toHaveBeenCalled();
  });

  test('returns 500 with error message when typeText throws', async () => {
    typeText.mockRejectedValue(new Error('boom'));
    const app = buildApp();

    const res = await request(app).post('/type').send({ text: 'hello' });

    expect(res.status).toBe(500);
    expect(res.body.error).toBe('boom');
  });
});
