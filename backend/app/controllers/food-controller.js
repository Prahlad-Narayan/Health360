import * as FoodService from '../services/food-service.js'
import { setResponse, setErrorResponse } from './response-handler.js';

export const getFoodData = async (request, response) => {
    const { userId, type, date } = request.params;

    try {
        const foodData = await FoodService.getFood(userId, type, date);
        setResponse(foodData, response);
    } catch (error) {
        setErrorResponse(error, response);
    }
}

export const getTotalCaloriesByDate = async (request, response) => {
    const { userId, date } = request.params;

    try {
        const foodData = await FoodService.getTotalCaloriesByDate(userId, date);
        setResponse(foodData, response);
    } catch (error) {
        setErrorResponse(error, response);
    }
}

export const post = async (request, response) => {
    try{
        const newFood = {...request.body};
        const food = await FoodService.save(newFood);
        setResponse(food, response);
    } catch (err) {
        setErrorResponse(err, response);
    }
}

export const remove = async (request, response) => {
    try{
        const id = request.params.id;
        const food = await FoodService.deleteFood(id);
        setResponse(food, response);
    } catch (err) {
        setErrorResponse(err, response);
    }
}