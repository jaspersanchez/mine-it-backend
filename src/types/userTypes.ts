import { z } from 'zod';
import { NewUserSchema, UserCredentialsSchema } from '../schemas/userSchema';
import { User } from '@prisma/client';
import { Omit } from '@prisma/client/runtime/library';

export type NewUser = z.infer<typeof NewUserSchema>;

export type UserCredentials = z.infer<typeof UserCredentialsSchema>;

export type AuthUser = {
  user: Omit<User, 'passwordHash'>;
  token: string;
};
