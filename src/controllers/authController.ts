import { NextFunction, Request, Response } from 'express';
import { AuthUser, NewUser, UserCredentials } from '../types/userTypes';
import {
  checkUserExists,
  createUser,
  generateToken,
  isPasswordMatch,
} from '../services/userService';

export const registerUser = async (
  req: Request<unknown, unknown, NewUser>,
  res: Response<AuthUser>,
  next: NextFunction,
) => {
  try {
    const { id, username, email, createdAt } = await createUser(req.body);
    const user = { id, username, email, createdAt };

    // Generate JWT token
    const token = generateToken(user.id);

    res.status(201).json({
      user,
      token,
    });
  } catch (error) {
    next(error);
  }
};

export const loginUser = async (
  req: Request<unknown, unknown, UserCredentials>,
  res: Response<AuthUser>,
  next: NextFunction,
) => {
  try {
    const { email, password } = req.body;

    const { passwordHash, ...user } = await checkUserExists(email);

    await isPasswordMatch(password, passwordHash);

    const token = generateToken(user.id);

    res.status(200).json({
      user,
      token,
    });
  } catch (error) {
    next(error);
  }
};
