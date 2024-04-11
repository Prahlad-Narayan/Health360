import mongoose from 'mongoose';

const exerciseSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true,
  },
  date: {
    type: String,
    required: true,
  },
  exerciseName: {
    type: String,
    required: true,
  },
  caloriesBurned: {
    type: Number,
    required: true,
  },
  minutes: {
    type: Number,
    required: true
  }
});

const ExerciseModel = mongoose.model('exercise', exerciseSchema);

export default ExerciseModel;
