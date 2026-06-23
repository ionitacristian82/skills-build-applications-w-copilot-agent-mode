import { Router } from 'express';
import LeaderboardModel from '../models/leaderboard';

const leaderboardRouter = Router();

leaderboardRouter.get('/', async (_req, res) => {
  try {
    const items = await LeaderboardModel.find()
      .populate('entries.user', 'name email')
      .sort({ updatedAt: -1 })
      .lean();

    res.json({ resource: 'leaderboard', count: items.length, items });
  } catch (error) {
    res.status(500).json({ message: 'Failed to load leaderboard', error: String(error) });
  }
});

export default leaderboardRouter;