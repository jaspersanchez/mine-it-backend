import request from 'supertest';
import app from '../src/app'; // Adjust path based on your project
import prisma from '../src/prismaClient';

beforeAll(async () => {
  console.log('Setting up test environment...');
  await prisma.user.deleteMany(); // Clear users before running tests
});

afterAll(async () => {
  console.log('Disconnecting Prisma...');
  await prisma.$disconnect();
});

describe('User Registration', () => {
  it('should register a user successfully', async () => {
    console.log('Testing user registration...');
    const res = await request(app).post('/api/auth/register').send({
      username: 'testuser',
      email: 'test@example.com',
      password: 'password123',
    });

    console.log('Response received:', res.body);
    expect(res.statusCode).toBe(201);
    expect(res.body).toHaveProperty('username');
  }, 30000); // Set a reasonable timeout (30s)

  it('should not allow duplicate registration', async () => {
    console.log('Testing duplicate registration...');
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

    console.log('Response received:', res.body);
    expect(res.statusCode).toBe(409);
    expect(res.body).toEqual(
      expect.objectContaining({
        message: 'User already exists',
      }),
    );
  }, 30000);
});
