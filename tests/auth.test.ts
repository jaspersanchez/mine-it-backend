import request from 'supertest';
import app from '../src/app'; // Adjust path based on your project
import prisma from '../src/prismaClient';

beforeAll(async () => {
  await prisma.user.deleteMany(); // Clear users before running tests
});

afterAll(async () => {
  await prisma.$disconnect();
});

describe('Authentication', () => {
  it('should register a user successfully', async () => {
    const res = await request(app).post('/api/auth/register').send({
      username: 'testuser',
      email: 'test@example.com',
      password: 'password123',
    });

    expect(res.statusCode).toBe(201);
    expect(res.body).toHaveProperty('user');
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

  it('should log in successfully with valid credentials', async () => {
    const res = await request(app).post('/api/auth/login').send({
      email: 'test@example.com',
      password: 'password123',
    });

    expect(res.statusCode).toBe(200);
    expect(res.body).toHaveProperty('token'); // Ensure a JWT is returned
  });

  it('should not log in with incorrect password', async () => {
    const res = await request(app).post('/api/auth/login').send({
      email: 'test@example.com',
      password: 'wrongpassword',
    });

    expect(res.statusCode).toBe(401);
    expect(res.body).toEqual(
      expect.objectContaining({
        message: 'User already exists',
      }),
    );
  });

  it('should not log in with non-existent email', async () => {
    const res = await request(app).post('/api/auth/login').send({
      email: 'nonexistent@example.com',
      password: 'password123',
    });

    expect(res.statusCode).toBe(401);
    expect(res.body).toEqual(
      expect.objectContaining({
        message: 'User already exists',
      }),
    );
  });
});
