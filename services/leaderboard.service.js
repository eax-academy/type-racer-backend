// Handles leaderboard computation and ranking

import Result from '../models/result.model.js';
import User from '../models/user.model.js';

export async function getGlobalLeaderboard(req, res) {
  try {
    const results = await Result.find()
      .populate('user', 'email username')
      .sort({ wpm: -1 })
      .limit(10);
    res.json(results);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
}

export async function getWeeklyLeaderboard(req, res) {
  try {
    const oneWeekAgo = new Date();
    oneWeekAgo.setDate(oneWeekAgo.getDate() - 7);

    const results = await Result.find({ createdAt: { $gte: oneWeekAgo } })
      .populate('user', 'email username')
      .sort({ wpm: -1 })
      .limit(10);
    res.json(results);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
}
