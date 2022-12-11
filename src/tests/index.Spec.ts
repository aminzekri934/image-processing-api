import supertest from 'supertest';
import app from '../index';
import { promises as fs } from 'fs';
import path from 'path';

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
