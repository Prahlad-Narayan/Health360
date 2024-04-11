import Food from '../models/food-log/food.js';

export const getFood =  async (userId, type, date) => {
    const food = await Food.find({ userId, mealType: type, date });
    return food;
}

export const getTotalCaloriesByDate =  async (userId, date) => {
    const foodList = await Food.find({ userId, date });
    const totalCalories = foodList.reduce((total, food) => {
        return total + food.calories;
      }, 0);
    return totalCalories;
}

export const save = async (newFood) => {
    const food = new Food(newFood); 
    return food.save();
}

export const deleteFood = async (id) => {
    const food = await Food.findByIdAndDelete(id).exec();       
    return food;
}