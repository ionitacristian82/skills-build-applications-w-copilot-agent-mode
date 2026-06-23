import { Router } from 'express';
import UserModel from '../models/user';

const usersRouter = Router();

usersRouter.get('/', async (_req, res) => {
  try {
    const items = await UserModel.find().sort({ createdAt: -1 }).lean();
    res.json({ resource: 'users', count: items.length, items });
  } catch (error) {
    res.status(500).json({ message: 'Failed to load users', error: String(error) });
  }
});

export default usersRouter;