import mongoose, { Schema, type InferSchemaType } from 'mongoose';

const teamSchema = new Schema(
  {
    name: { type: String, required: true, trim: true, unique: true },
    city: { type: String, required: true, trim: true },
    motto: { type: String, required: true, trim: true },
    members: [{ type: Schema.Types.ObjectId, ref: 'User' }],
    totalPoints: { type: Number, default: 0, min: 0 },
  },
  {
    timestamps: true,
  },
);

export type TeamDocument = InferSchemaType<typeof teamSchema>;

const TeamModel = mongoose.models.Team || mongoose.model('Team', teamSchema);

export default TeamModel;