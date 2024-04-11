import mongoose from 'mongoose';

const foodSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true,
  },
  mealType: {
    type: String,
    enum: ['breakfast', 'lunch', 'dinner', 'snack'],
    required: true,
  },
  date: {
    type: String,
    required: true,
  },
  foodName: {
    type: String,
    required: true,
  },
  servingSize: {
    type: Number,
    required: true,
  },
  calories: {
    type: Number,
    required: true,
  },
  carbs: {
    type: Number,
    required: true,
  },
  fat: {
    type: Number,
    required: true,
  },
  protein: {
    type: Number,
    requied: true,
  },
  sodium: {
    type: Number,
    required: true,
  },
  sugar: {
    type: Number,
    required: true,
  }
});

const FoodModel = mongoose.model('Food', foodSchema);

export default FoodModel;
