// Handles game start/end logic and snippet fetching

import Game from '../models/game.model.js';
import Result from '../models/result.model.js';

export async function getSnippets(req, res) {
  const snippets = [
    "The quick brown fox jumps over the lazy dog.",
    "Typing games are fun and improve your focus.",
    "Speed comes with consistency."
  ];
  res.json(snippets);
}

export async function startGame(req, res) {
  try {
    const { snippet, mode, players } = req.body;
    const newGame = new Game({ snippet, mode, players });
    await newGame.save();
    res.status(201).json({ message: 'Game started', gameId: newGame._id });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
}

export async function endGame(req, res) {
  try {
    const { gameId, userId, wpm, accuracy } = req.body;

    const game = await Game.findById(gameId);
    if (!game) return res.status(404).json({ message: 'Game not found' });

    const result = new Result({ user: userId, game: gameId, wpm, accuracy });
    await result.save();

    game.endTime = new Date();
    await game.save();

    res.json({ message: 'Game ended', resultId: result._id });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
}
