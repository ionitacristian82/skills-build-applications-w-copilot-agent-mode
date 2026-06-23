import { Router } from 'express';
import WorkoutModel from '../models/workout';

const workoutsRouter = Router();

workoutsRouter.get('/', async (_req, res) => {
  try {
    const items = await WorkoutModel.find().sort({ createdAt: -1 }).lean();
    res.json({ resource: 'workouts', count: items.length, items });
  } catch (error) {
    res.status(500).json({ message: 'Failed to load workouts', error: String(error) });
  }
});

export default workoutsRouter;