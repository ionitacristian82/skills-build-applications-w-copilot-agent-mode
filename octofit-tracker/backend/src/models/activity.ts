import mongoose, { Schema, type InferSchemaType } from 'mongoose';

const activitySchema = new Schema(
  {
    user: { type: Schema.Types.ObjectId, ref: 'User', required: true },
    type: {
      type: String,
      enum: ['run', 'cycle', 'swim', 'yoga', 'strength', 'walk'],
      required: true,
    },
    durationMinutes: { type: Number, min: 1, required: true },
    caloriesBurned: { type: Number, min: 1, required: true },
    pointsEarned: { type: Number, min: 0, required: true },
    occurredAt: { type: Date, required: true },
  },
  {
    timestamps: true,
  },
);

export type ActivityDocument = InferSchemaType<typeof activitySchema>;

const ActivityModel = mongoose.models.Activity || mongoose.model('Activity', activitySchema);

export default ActivityModel;