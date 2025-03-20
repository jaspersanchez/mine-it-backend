import { NextFunction, Request, Response } from 'express';
import { AuthUser, NewUser } from '../types/userTypes';
import { createUser } from '../services/userService';
import jwt from 'jsonwebtoken';

export const registerUser = async (
  req: Request<unknown, unknown, NewUser>,
  res: Response<AuthUser>,
  next: NextFunction,
) => {
  try {
    const { id, username, email } = await createUser(req.body);

    // Generate JWT token
    const token = jwt.sign({ userId: id }, process.env.JWT_SECRET!, {
      expiresIn: '7d',
    });

    res.status(201).json({
      username,
      email,
      token,
    });
  } catch (error) {
    next(error);
  }
};
