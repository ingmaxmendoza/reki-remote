jest.mock('../lib/input');
const express = require('express');
const request = require('supertest');
const { mediaAction } = require('../lib/input');
const mediaRouter = require('../routes/media');

function buildApp() {
  const app = express();
  app.use('/media', mediaRouter);
  return app;
}

describe('POST /media/:action', () => {
  beforeEach(() => jest.clearAllMocks());

  test('calls mediaAction with the action param and returns 200', async () => {
    mediaAction.mockResolvedValue(undefined);
    const app = buildApp();

    const res = await request(app).post('/media/play-pause');

    expect(mediaAction).toHaveBeenCalledWith('play-pause');
    expect(res.status).toBe(200);
  });

  test('returns 500 with error message when mediaAction throws', async () => {
    mediaAction.mockRejectedValue(new Error('Unknown media action: bogus'));
    const app = buildApp();

    const res = await request(app).post('/media/bogus');

    expect(res.status).toBe(500);
    expect(res.body.error).toBe('Unknown media action: bogus');
  });
});
