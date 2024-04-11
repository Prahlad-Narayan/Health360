import * as userProfileService from '../services/user-profile-service.js';
import * as userService from '../services/user-service.js';
import { setResponse, setErrorResponse } from './response-handler.js';

//This function handles the creation of a new user profile.
export const post = async (request, response) => {
    try {
        const newUserProfile = {...request.body};
        const userProfile = await userProfileService.save(newUserProfile);
        const userId = request.body.userId; 
        const user = await userService.find(userId);

        if (user) {
            user.profile = userProfile._id; 
            await user.save();
        }
        
        setResponse(userProfile, response);
    } catch (err) {
        setErrorResponse(err, response);
    }
}

// This function handles the retrieval of a user profile by its ID.
export const get = async (request, response) => {
    try {
        const id = request.params.id;
        const userProfile = await userProfileService.find(id);
        setResponse(userProfile, response);
    } catch (err) {
        setErrorResponse(err, response);
    }
}

// This function handles the update of a user profile.
export const put = async (request, response) => {
    try {
        const email = request.params.email;
        const updatedUserProfile = {...request.body};
        const userProfile = await userProfileService.update(updatedUserProfile, email);
        setResponse(userProfile, response);
    } catch (err) {
        setErrorResponse(err, response);
    }
}

export const getByUserId = async (request, response) => {
    const { userId } = request.params;

    try {
        const userProfile = await userProfileService.getByUserId(userId);
        setResponse(userProfile, response);
    } catch (error) {
        setErrorResponse(error, response);
    }
}
