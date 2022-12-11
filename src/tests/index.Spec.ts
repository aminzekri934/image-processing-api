import supertest from 'supertest';
import app from '../index';
import { promises as fsPromises } from 'fs';
import fs from 'fs';
import resize from '../utilities/image_processing';
import resized from '../utilities/image_processing';
const request: supertest.SuperTest<supertest.Test> = supertest(app);
describe('testing responses from endpoints', (): void => {
  describe('/', (): void => {
    it('get/', async (): Promise<void> => {
      const response: supertest.Response = await request.get('/');

      expect(response.status).toBe(200);
    });
  });
  it('get /?name=tree&width=400&height=400 (valid args)', async (): Promise<void> => {
    const response: supertest.Response = await request.get(
      '/?name=tree&width=400&height=400'
    );

    expect(response.status).toBe(200);
  });
});
describe('endpoint: /aaa', (): void => {
  it('returns 404 for invalid endpoint', async (): Promise<void> => {
    const response: supertest.Response = await request.get('/aaa');

    expect(response.status).toBe(404);
  });
});
//image processing test
describe('Test image processing ', (): void => {
  it('the api process the image sun, width=400, height=400', async (): Promise<void> => {
    const img = await resize.resize('sun', 400, 400);
    let msg: null | string = '';
    try {
      await fsPromises.writeFile(resized.resized('sun', 400, 400), img);
      await fsPromises.access(resized.resized('sun', 400, 400));
      msg = null;
    } catch {
      msg = 'error';
    }
    expect(msg).toBeNull();
  });
});
