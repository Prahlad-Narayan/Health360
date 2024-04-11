// Import required packages and modules
import cors from 'cors';
import express from 'express';
import mongoose from 'mongoose';
import registerRouter from './routes/index.js';
import models from './models/user/index.js';
import dotenv from 'dotenv';

// Load environment variables from .env file
dotenv.config();


// Function to initialize the Express app
const initialize = (app) => {
    // Apply CORS middleware to allow cross-origin requests
    app.use(cors()); 
    // Parse incoming JSON and URL-encoded requests
    app.use(express.json());
    app.use(express.urlencoded());
    // Connect to MongoDB database using Mongoose
    // mongoose.connect('mongodb+srv://Aravindsn20:Aravind123@info6150project.g7nlnej.mongodb.net/');
    mongoose.connect(`mongodb+srv://${process.env.DB_USERNAME}:${process.env.DB_PASSWORD}@info6150project.g7nlnej.mongodb.net/`);
    // Register API routes
    registerRouter(app);
}
// Export the initialization function
export default initialize;