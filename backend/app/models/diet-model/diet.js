import mongoose from 'mongoose';

const Schema = mongoose.Schema;

const MealSchema = new Schema({
    name: {
      type: String,
      required: true
    },
    description: {
      type: String,
      required: true
    },
    portion: {
      type: String
    },
    calories: {
      type: Number,
      required: true
    }
  });
  
  const DietPlanSchema = new Schema({
    goal: {
      type: String,
      required: true
    },
    plan_name: {
      type: String,
      required: true
    },
    meals: [MealSchema]
  });

const DietModel = mongoose.model('diet', DietPlanSchema);

export default DietModel;
