import express from 'express';
import { newUserParser } from '../middlewares/authMiddleware';
import { errorMiddleware } from '../middlewares/errorMiddleware';
import { registerUser } from '../controllers/authController';

const router = express.Router();

router.post('/register', newUserParser, registerUser);

router.use(errorMiddleware);

export default router;
