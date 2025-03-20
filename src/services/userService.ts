import prisma from '../prismaClient';
import bcrypt from 'bcryptjs';
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
