import mongoose from 'mongoose';

const gameSchema = new mongoose.Schema(
  {
    snippet: { type: String, required: true },
    mode: { type: String, enum: ['single', 'multi'], default: 'single' },
    players: [{ type: mongoose.Schema.Types.ObjectId, ref: 'User' }],
    startTime: { type: Date, default: Date.now },
    endTime: { type: Date }
  },
  { timestamps: true }
);

export default mongoose.model('Game', gameSchema);
