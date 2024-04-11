import * as userService from '../services/user-service.js';
import {setResponse, setUserExistsErrorResponse, setInternalServerErrorResponse} from "./response-handler.js";

//post request for creating user, calling the createUser method from userService with the request body containing user
export const post = async (request, response) => {
    try {
        const newUser = {...request.body};
        const token = await userService.createUser(newUser);
        //setting response with the created user upon successful creation of user
        response.status(200).json({ token });
    } catch(err) {
        if(err.message === "User already Exists!") {
            //setting response with Error as user already exists, if a user with same email id exists
            setUserExistsErrorResponse(err, response);
        } else {
            //setting internal server error as response, if there is a runtime error
            setInternalServerErrorResponse(err, response);
        } 
    }
}

export const signin = async (request, response, next) => {
    const { email, password } = request.body;
  
    try {
      const token = await userService.loginUser(email, password);
      response.status(200).json({ token });
    } catch (error) {
      next(error);
    }
  }

//get request for retrieving a user with id provided in the request parameter
export const get = async (request,response) => {
    try{
        const id = request.params.id;
        //calling find method from userService and returing response if successfully retrieved the user with the provided id
        const user = await userService.find(id);
        setResponse(user, response);
    } catch(err) {
        //setting internal server error as response, if there is a runtime error
        setInternalServerErrorResponse(err, response);
    }
}