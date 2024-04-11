import Exercise from '../models/exercise-log/exercise.js';

export const getExercise =  async (userId, type, date) => {
    const exercise = await Exercise.find({ userId, mealType: type, date });
    return exercise;
}

export const save = async (exerciseList) => {
    const savedExercises = [];

    console.log(exerciseList);
  
    try {
      for (const exerciseKey of Object.keys(exerciseList)) {
        const exercise = new Exercise(exerciseList[exerciseKey]);
        const savedExercise = await exercise.save();
        savedExercises.push(savedExercise);
      }
  
      return savedExercises;
    } catch (error) {
      console.error('Error occurred while saving exercises:', error);
      throw new Error('Failed to save exercises. Please check the server logs for more details.');
    }
};

export const getTotalCaloriesByDate =  async (userId, date) => {
  const exerciseList = await Exercise.find({ userId, date });
  const totalCalories = exerciseList.reduce((total, exercise) => {
      return total + exercise.caloriesBurned;
    }, 0);
  return totalCalories;
}

  export const deleteExercise = async (id) => {
    const exercise = await Exercise.findByIdAndDelete(id).exec();       
    return exercise;
}