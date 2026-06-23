import mongoose, { Schema, type InferSchemaType } from 'mongoose';

const leaderboardEntrySchema = new Schema(
  {
    user: { type: Schema.Types.ObjectId, ref: 'User', required: true },
    points: { type: Number, min: 0, required: true },
    rank: { type: Number, min: 1, required: true },
  },
  { _id: false },
);

const leaderboardSchema = new Schema(
  {
    period: { type: String, required: true, unique: true, trim: true },
    entries: { type: [leaderboardEntrySchema], default: [] },
    updatedAt: { type: Date, default: Date.now },
  },
  {
    timestamps: true,
  },
);

export type LeaderboardDocument = InferSchemaType<typeof leaderboardSchema>;

const LeaderboardModel =
  mongoose.models.Leaderboard || mongoose.model('Leaderboard', leaderboardSchema);

export default LeaderboardModel;