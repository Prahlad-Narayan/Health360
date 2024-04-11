import * as DietService from '../services/diet-service.js';
import { setResponse, setErrorResponse } from './response-handler.js';

// This function handles the HTTP GET request to fetch a specific diet plan by ID.
export const getDiet = async (request, response) => {
    try {
        const diet = await DietService.findDiet({});
        setResponse(diet, response);
    } catch (err) {
        setErrorResponse(err, response);
    }
}