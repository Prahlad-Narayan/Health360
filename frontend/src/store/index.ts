// Import necessary functions and modules from Redux Toolkit
import { combineReducers, configureStore } from '@reduxjs/toolkit';

// Import the authReducer from the authSlice
import authReducer from './slices/authSlice';

// Combine reducers into a rootReducer
const rootReducer = combineReducers({
  auth: authReducer, // The auth slice reducer
});

// Configure the Redux store with the rootReducer
const store = configureStore({
  reducer: rootReducer,
});

// Define types for RootState and AppDispatch based on the store
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

// Export the configured Redux store
export default store;
