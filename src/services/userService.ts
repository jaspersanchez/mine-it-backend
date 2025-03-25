import prisma from '../prismaClient';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import { NewUser } from '../types/userTypes';

export const createUser = async (user: NewUser) => {
  const { username, email, password } = user;

  // Check if user already exists
  const existingUser = await prisma.user.findUnique({ where: { email } });
  if (existingUser) throw new Error('USER_ALREADY_EXISTS');

  // Hash password
  const saltRounds = 10;
  const hashedPassword = await bcrypt.hash(password, saltRounds);

  // Store user in DB
  return prisma.user.create({
    data: { username, email, passwordHash: hashedPassword },
  });
};

export const checkUserExists = async (email: string) => {
  const user = await prisma.user.findUnique({ where: { email } });

  if (!user) throw new Error('INVALID_CREDENTIALS');

  return user;
};

export const isPasswordMatch = async (
  password: string,
  userPasswordHash: string,
): Promise<true> => {
  const isMatch = await bcrypt.compare(password, userPasswordHash);

  if (!isMatch) {
    throw new Error('INVALID_CREDENTIALS');
  }

  return true;
};

export const generateToken = (userId: string): string => {
  if (!process.env.JWT_SECRET) {
    throw new Error('JWT_SECRET_NOT_DEFINED');
  }

  return jwt.sign({ userId }, process.env.JWT_SECRET, { expiresIn: '1h' });
};
