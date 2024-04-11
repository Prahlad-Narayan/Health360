import Workout from '../models/workout-model/workout.js';


// Search for all Workout Plans
export const search = async (params = {}) => {
    const workouts = await Workout.find(params).exec();
    return workouts;
}
