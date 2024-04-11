// Import necessary dependencies and styles
import React, { ReactNode } from 'react';
import './App.css';
import Login from './components/Signin/login';
import Landing from './components/LandingPage/Landing';
import Signup from './components/Signup/Signup';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Dashboard from './components/Dashboard/Dashboard';
import AddFood from './components/DailyFoodLog/addfood';
import SearchFood from './components/DailyFoodLog/searchFood';
import BlogPage from "./components/BlogPage/BlogPage";
import CreateBlogPage from "./components/BlogPage/CreatePage";
import EditBlogPage from './components/BlogPage/EditBlogPage';
import DietPlanDashboard from './components/DietPlan/DietPlanDashboard';
import WorkoutPlanDashboard from './components/WorkoutPlan/WorkoutPlanDashboard';
import Questionnaire from './components/Questionnaire/Basics';
import { useSelector } from 'react-redux';
import { RootState } from './store';
import VegetarianDietApp from './components/DietPlan/Vegetarian';
import NonVegDietApp from './components/DietPlan/Non-vegetarian';
import VeganDietApp from './components/DietPlan/Vegan';
import WeightlossApp from './components/WorkoutPlan/WeightLoss';
import WeightgainApp from './components/WorkoutPlan/WeightGain';
import MaintainWeightApp from './components/WorkoutPlan/MaintainWeight';
import AddExercise from './components/DailyExerciseLog/addExercise';
import SearchExercise from './components/DailyExerciseLog/searchExercise';
import ProfileUpdateForm from './components/Questionnaire/user-profile-update';

// Define type for PrivateRouteProps
type PrivateRouteProps = {
  element: ReactNode;
};

// Main App component
function App() {

  React.useEffect(() => {
    if (window.location.pathname === '/service-worker.js') {
      window.location.href = '/service-worker.js';
    }
  }, []);
  
  return (
    <BrowserRouter>
      <Routes>
        {/* Routes for different pages */}
        <Route path="/" element={<Landing />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/dashboard" element={<PrivateRoute element={<Dashboard />} />} />
        <Route path="/dietplan" element={<PrivateRoute element={<DietPlanDashboard />} />} />
        <Route path="/blogs" element={<PrivateRoute element={<BlogPage />} />} />
        <Route path="/blogs/create" element={<PrivateRoute element={<CreateBlogPage />} />} />
        <Route path="/edit/:id" element={<PrivateRoute element={<EditBlogPage />} />} />
        <Route path="/workoutplan" element={<PrivateRoute element={<WorkoutPlanDashboard />} />} />
        <Route path="/dietplan/vegetarian" element={<PrivateRoute element={<VegetarianDietApp />} />} />
        <Route path="/dietplan/nonvegetarian" element={<PrivateRoute element={<NonVegDietApp />} />} />
        <Route path="/dietplan/vegan" element={<PrivateRoute element={<VeganDietApp />} />} />
        <Route path="/workoutplan/weightloss" element={<PrivateRoute element={<WeightlossApp />} />} />
        <Route path="/workoutplan/weightgain" element={<PrivateRoute element={<WeightgainApp />} />} />
        <Route path="/workoutplan/maintainweight" element={<PrivateRoute element={<MaintainWeightApp />} />} />
        <Route path="/addfood" element={<PrivateRoute element={<AddFood />} />} />
        <Route path="/searchfood/:mealType/:formattedDate" element={<PrivateRoute element={<SearchFood />} />} />
        <Route path="/questionnaire" element={<PrivateRoute element={<Questionnaire />} />} />
        <Route path="/addExercise" element={<PrivateRoute element={<AddExercise />} />} />
        <Route path="/searchExercise/:formattedDate" element={<PrivateRoute element={<SearchExercise />} />} />
        <Route path="/update-profile" element={<PrivateRoute element={<ProfileUpdateForm />} />} />
      </Routes>
    </BrowserRouter>
  );
}

// PrivateRoute component to protect routes that require authentication
function PrivateRoute({ element }: PrivateRouteProps) {
  const isLoggedIn = useSelector((state: RootState) => state.auth.isLoggedIn);
  return isLoggedIn ? (element as JSX.Element) : <Login />;
}

// Export the main App component
export default App;
