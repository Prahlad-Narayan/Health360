import Diet from '../models/diet-model/diet.js';

// Search for all Diets 
export const findDiet = async (params = {}) => {
        const diet = await Diet.find(params).exec();
        return diet;
}

