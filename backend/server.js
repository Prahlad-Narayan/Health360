// Import required modules and initialize Express app
import express from 'express';
import initialize from './app/app.js';

// Create an Express application
const app = express();
// Set the port number for the server
const port = 3000;
// Initialize the Express app by passing it to the initialize function
initialize(app);
// Start the server to listen on the specified port
app.listen(3000, () => console.log(`Server is listening at port ${port}`));