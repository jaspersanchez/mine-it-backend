import { Prisma } from '@prisma/client';
import { NextFunction, Request, Response } from 'express';
import { z } from 'zod';

export const errorMiddleware = (
  error: unknown,
  _req: Request,
  res: Response,
  next: NextFunction,
) => {
  if (error instanceof z.ZodError) {
    res.status(400).send(error.message);
  } else if (error instanceof Prisma.PrismaClientInitializationError) {
    res.status(500).send(error.name);
  } else if (error instanceof Error) {
    if (error.message === 'USER_ALREADY_EXISTS') {
      res.status(409).json({ message: 'User already exists' });
    }
  } else {
    next(error);
  }
};
