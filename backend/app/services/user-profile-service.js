import UserProfile from "../models/user-profile/user-profile-model.js";

// Save a new user profile to the database.
export const save = async (newUserProfile) => {
  try {
    // Calculate maintenance calorie based on weight
    if (newUserProfile.sexAtBirth === "Male") {
      newUserProfile.maintenanceCalorie = calculateMCForMen(newUserProfile.weight, newUserProfile.height, newUserProfile.age);
    } else {
      newUserProfile.maintenanceCalorie = calculateMCForWomen(newUserProfile.weight, newUserProfile.height, newUserProfile.age);
    }
    newUserProfile.calorieDeficit = newUserProfile.maintenanceCalorie - 500;
    newUserProfile.calorieSurplus = newUserProfile.maintenanceCalorie + 300;
    const userProfile = new UserProfile(newUserProfile)
    const savedUserProfile = await userProfile.save();
    return savedUserProfile;
  } catch (error) {
    console.error("Error saving user profile:", error);
    throw error;
  }
};
// Find a user profile by ID.
export const find = async (id) => {
  try {
    const userProfile = await UserProfile.findById(id).exec();
    return userProfile;
  } catch (error) {
    console.error("Error finding user profile: ", error)
    throw error;
  }

};

// Update a user profile by ID
export const update = async (updatedUserProfile, email) => {
  try {
    if (updatedUserProfile.sexAtBirth === "Male") {
      updatedUserProfile.maintenanceCalorie = calculateMCForMen(updatedUserProfile.weight, updatedUserProfile.height, updatedUserProfile.age);
    } else {
      updatedUserProfile.maintenanceCalorie = calculateMCForWomen(updatedUserProfile.weight, updatedUserProfile.height, updatedUserProfile.age);
    }
    updatedUserProfile.calorieDeficit = updatedUserProfile.maintenanceCalorie - 300;
    updatedUserProfile.calorieSurplus = updatedUserProfile.maintenanceCalorie + 300;
    const userId = updatedUserProfile.userId;
    const userProfile = await UserProfile.findOneAndUpdate(
      { userId },
      updatedUserProfile,
      { new: true, runValidators: true }
    ).exec();
    return userProfile;
  }
  catch (error) {
    console.error("Error updating user profile: ", error)
    throw error;
  }
};

export const getByUserId = async (userId) => {
  const userProfile = await UserProfile.find({ userId });
  return userProfile;
}

const calculateMCForMen = (weight, height, age) => {
  return (88.362 + (13.397 * (weight*0.4535)) + (4.799 * height) - (5.677 * age))* 1.2;
};

const calculateMCForWomen = (weight, height, age) => {
  return (447.593 + (9.247 * (weight*0.4535)) + (3.098 * height) - (4.330 * age))* 1.2;
};
