import { NextFunction, Request, Response } from 'express';
import { NewUserSchema, UserCredentialsSchema } from '../schemas/userSchema';

export const newUserParser = (
  req: Request,
  _res: Response,
  next: NextFunction,
) => {
  try {
    NewUserSchema.parse(req.body);
    next();
  } catch (error) {
    next(error);
  }
};

export const userCredentialsParser = (
  req: Request,
  _res: Response,
  next: NextFunction,
) => {
  try {
    UserCredentialsSchema.parse(req.body);
    next();
  } catch (error) {
    next(error);
  }
};
