import express, { Request, Response } from 'express';
import cors from 'cors';
import authRoutes from './routes/authRoutes';

const app = express();

// Middleware
app.use(cors());
app.use(express.json()); // Parse JSON request bodies

// Routes
app.use('/api/auth', authRoutes);

// Internal Server Error Handler (500)
app.use((error: unknown, _req: Request, res: Response) => {
  console.error('Internal Server Error:', error);

  res.status(500).json({ message: 'Internal Server Error' });
});

export default app;
