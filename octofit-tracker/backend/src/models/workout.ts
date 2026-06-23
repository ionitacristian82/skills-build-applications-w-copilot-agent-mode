import mongoose, { Schema, type InferSchemaType } from 'mongoose';

const workoutSchema = new Schema(
  {
    title: { type: String, required: true, trim: true },
    difficulty: {
      type: String,
      enum: ['beginner', 'intermediate', 'advanced'],
      required: true,
    },
    targetMuscleGroups: { type: [String], default: [] },
    durationMinutes: { type: Number, min: 5, required: true },
    estimatedCalories: { type: Number, min: 1, required: true },
    recommendedFor: { type: [String], default: [] },
  },
  {
    timestamps: true,
  },
);

export type WorkoutDocument = InferSchemaType<typeof workoutSchema>;

const WorkoutModel = mongoose.models.Workout || mongoose.model('Workout', workoutSchema);

export default WorkoutModel;