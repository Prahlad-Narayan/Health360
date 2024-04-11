// models/workout.js
import mongoose from 'mongoose';

const Schema = mongoose.Schema;

const WorkoutSchema = new Schema({
    day: String,
    exercise: String,
    details: Schema.Types.Mixed, // Can be a string or an array of strings
    duration_for_cardio: String,
    focus: String,
    strength_training_details: [String],
    reps: String,
    weights: String,
    calories_burned: Number,
    rest_day: { type: Boolean, default: false }, // Added rest_day attribute
  });
  
  // Define the WorkoutPlan schema
  const WorkoutPlanSchema = new Schema({
    goal: String,
    plan_name: String,
    workouts: [WorkoutSchema],
  });
  
  // Define the overall schema for the workout plans
  const WorkoutPlansSchema = new Schema({
    workout_plans: [WorkoutPlanSchema],
  });
  

const WorkoutModel = mongoose.model('workout', WorkoutPlansSchema);

export default WorkoutModel;
