import express from 'express';
import { getSnippets, startGame, endGame } from '../services/game.service.js';

const router = express.Router();

router.get('/snippets', getSnippets);
router.post('/start', startGame);
router.post('/end', endGame);

export default router;
