import User from '../models/user/user.js';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';

//createUser method for creating a new user only when there is no existing user with the same email provided in the newUser object
export const createUser = async (newUser) => {
    const {firstName, lastName, userName, email, password, created_at} = newUser;
    //creating password hash for securely storing the password to the database
    const passwordHash = await bcrypt.hash(password, 10);
    const existingUser = await User.findOne({email});
    if(existingUser) {
        throw new Error(
            "User already Exists!"
        );
    }

    //saving the newly created user after confirming that the provided email does not exists already
    const user = new User({
        firstName,
        lastName,
        userName,
        email,
        password: passwordHash,
        created_at
      });

      const createdUser = await user.save();
      

      const token = jwt.sign({ userId: createdUser._id }, 'your-secret-key', {
        expiresIn: '1h',
      });

      return token;
}

export const loginUser = async (email, password) => {
    const user = await User.findOne({ email });

    if (!user) {
      throw new Error('Invalid credentials');
    }
  
    const isPasswordValid = await bcrypt.compare(password, user.password);
  
    if (!isPasswordValid) {
      throw new Error('Invalid credentials');
    }
  
    const token = jwt.sign({ userId: user._id }, 'your-secret-key', {
      expiresIn: '1h',
    });
  
    return token;
}

//find a user by id that is provided from the controller, and return the user object as response
export const find = async (id) => {
    const user = await User.findById(id).exec();
    return user;
}