import request from 'supertest';
import app from '../src/app'; // Adjust the import path based on your project
import prisma from '../src/prismaClient';

beforeAll(async (): Promise<void> => {
  await prisma.user.deleteMany(); // Clear users before running tests
});

afterAll(async () => {
  await prisma.$disconnect();
});

describe('User Registration', () => {
  it('should register a user successfully', async (): Promise<void> => {
    const res = await request(app).post('/api/auth/register').send({
      username: 'testuser',
      email: 'test@example.com',
      password: 'password123',
    });

    expect(res.statusCode).toBe(201);
    expect(res.body).toHaveProperty('username');
  });

  it('should not allow duplicate registration', async () => {
    await request(app).post('/api/auth/register').send({
      username: 'testuser',
      email: 'test@example.com',
      password: 'password123',
    });

    const res = await request(app).post('/api/auth/register').send({
      username: 'testuser',
      email: 'test@example.com',
      password: 'password123',
    });

    expect(res.statusCode).toBe(409);
    expect(res.body).toEqual(
      expect.objectContaining({
        message: 'User already exists',
      }),
    );
  });
});
