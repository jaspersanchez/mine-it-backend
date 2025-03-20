import { z } from 'zod';
import { NewUserSchema } from '../schemas/userSchema';
import { User } from '@prisma/client';

export type NewUser = z.infer<typeof NewUserSchema>;

export type AuthUser = Pick<User, 'username' | 'email'> & { token: string };
