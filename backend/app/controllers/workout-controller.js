import * as WorkoutService from '../services/workout-service.js';
import { setResponse, setErrorResponse } from './response-handler.js';

// This function handles the HTTP GET request to fetch a specific workout plan by ID.
export const getWorkout = async (request, response) => {
    try {
        const workout = await WorkoutService.search({});
        setResponse(workout, response);
    } catch (err) {
        setErrorResponse(err, response);
    }
}
