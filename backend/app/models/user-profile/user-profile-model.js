import mongoose from "mongoose";

const Schema = mongoose.Schema;

const userProfileSchema = new Schema({
    // Age of the user.
    age: {
        type: Number,
        required: true
    },
    // Height of the user.
    height: {
        type: Number,
        required: true
    },
    // Weight of the user.
    weight: {
        type: Number,
        required: true
    },
    // Sex assigned at birth (Male/Female).
    sexAtBirth: {
        type: String,
        enum: ["Male", "Female"],
        required: true
    },
    // Dietary preference (Vegan/Vegetarian/Non-Vegetarian).
    foodPreference: {
        type: String,
        enum: ["Vegan", "Vegetarian", "Non-Vegetarian"],
        required: true
    },
    // Fitness goal (Weight-Loss/Weight-Gain).
    fitnessGoal: {
        type: String,
        enum: ["Weight-Loss", "Weight-Gain", "Maintain-Weight"],
        required: true
    },
    // Maintenance calorie based on weight
    maintenanceCalorie: {
        type: Number,
        required: false 
      },
    calorieDeficit: {
        type: Number,
        required: false
    },
    calorieSurplus: {
        type: Number,
        required: false
    },
    created_at: {
        type: Date,
        default: Date.now
    },
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true,
    }
});

// Mongoose Model for UserProfile
const UserProfileModel = mongoose.model('userProfile', userProfileSchema);

export default UserProfileModel;