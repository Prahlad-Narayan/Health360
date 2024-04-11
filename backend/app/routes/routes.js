import express from 'express';
import * as userController from "../controllers/user-controller.js";
import * as userProfileController from '../controllers/user-profile-controller.js';
import * as BlogController from '../controllers/blog-controller.js';
import * as WorkoutController from '../controllers/workout-controller.js';
import * as DietController from '../controllers/diet-controller.js';
import * as FoodController from '../controllers/food-controller.js';
import * as ExerciseController from '../controllers/exercise-controller.js';

// Create an Express router instance
const router = express.Router();
// Route to handle user sign-up
router.route('/user/sign-up')
    .post(userController.post);
router.route('/user/sign-in')
    .post(userController.signin);
// Route to get user details by ID
router.route('/user/:id')
    .get(userController.get);
// Route to create a new user profile
router.route('/user-profile')   
    .post(userProfileController.post)
// Routes to get and update user profile by ID
router.route('/user-profile/:id')
    .get(userProfileController.get)
    .put(userProfileController.put)
router.route('/user-profile-by-id/:userId')
    .get(userProfileController.getByUserId)
// Routes to get all blogs and create a new blog
router.route('/blogs')
    .get(BlogController.get)
    .post(BlogController.post);
// Routes to update and delete a blog by ID
router.route('/blogs/:id')
    .get(BlogController.getById)
    .put(BlogController.put)
    .delete(BlogController.remove);
// Routes to get the workout plans
router.route('/workouts')
    .get(WorkoutController.getWorkout);
// Routes to get the diet plans
router.route('/diets') 
    .get(DietController.getDiet)
router.route('/food/:userId/:type/:date')
    .get(FoodController.getFoodData)
router.route('/food/:userId/:date')
    .get(FoodController.getTotalCaloriesByDate)
router.route('/addfood')
    .post(FoodController.post)
router.route('/food/:id')
    .delete(FoodController.remove)
router.route('/exercise/:userId/:date')
    .get(ExerciseController.getExercise)
router.route('/totalExerciseCalories/:userId/:date')
    .get(ExerciseController.getTotalCaloriesByDate)
router.route('/addExercises')
    .post(ExerciseController.post)
router.route('/exercise/:id')
    .delete(ExerciseController.remove)
export default router;