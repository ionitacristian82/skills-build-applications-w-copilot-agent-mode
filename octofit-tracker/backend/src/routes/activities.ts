import { Router } from 'express';
import ActivityModel from '../models/activity';

const activitiesRouter = Router();

activitiesRouter.get('/', async (_req, res) => {
  try {
    const items = await ActivityModel.find()
      .populate('user', 'name email')
      .sort({ occurredAt: -1 })
      .lean();

    res.json({ resource: 'activities', count: items.length, items });
  } catch (error) {
    res.status(500).json({ message: 'Failed to load activities', error: String(error) });
  }
});

export default activitiesRouter;