import express from 'express';
import {
  newUserParser,
  userCredentialsParser,
} from '../middlewares/authMiddleware';
import { errorMiddleware } from '../middlewares/errorMiddleware';
import { loginUser, registerUser } from '../controllers/authController';

const router = express.Router();

router.post('/register', newUserParser, registerUser);
router.post('/login', userCredentialsParser, loginUser);

router.use(errorMiddleware);

export default router;
