// Import necessary dependencies and styles
import React, { useState, useEffect } from 'react';
import "./Weight.scss";
import Header from '../LandingPage/Header';
import axios from 'axios';

// Define interfaces for workout details and workout plan
interface StrengthTrainingDetails {
  day: string;
  exercise?: string;
  details: string | string[];
  duration_for_cardio?: string;
  focus?: string;
  strength_training_details?: string[];
  reps?: string;
  weights?: string;
  calories_burned: number;
  rest_day?: boolean;
}

interface WorkoutPlan {
  goal: string;
  plan_name: string;
  workouts: StrengthTrainingDetails[];
}

// Define a functional component for rendering individual workout cards
const WorkoutCard: React.FC<{ workout: StrengthTrainingDetails }> = ({ workout }) => {
  const {
    day,
    exercise,
    details,
    duration_for_cardio,
    focus,
    strength_training_details,
    reps,
    weights,
    calories_burned,
    rest_day,
  } = workout;

  return (
    <div className="workout-card">
      <h2>{day}</h2>
      {rest_day ? (
        <p>Rest Day: {details}</p>
      ) : (
        <>
          {exercise && <p>Exercise: {exercise}</p>}
          <p>Details: {Array.isArray(details) ? details.join(', ') : details}</p>
          {duration_for_cardio && <p>Duration for Cardio: {duration_for_cardio}</p>}
          {focus && <p>Focus: {focus}</p>}
          {strength_training_details && (
            <div>
              <p>Strength Training:</p>
              <ul>
                {strength_training_details.map((exercise, index) => (
                  <li key={index}>{exercise}</li>
                ))}
              </ul>
              {reps && <p>Reps: {reps}</p>}
              {weights && <p>Weights: {weights}</p>}
            </div>
          )}
          <p>Calories Burned: {calories_burned}</p>
        </>
      )}
    </div>
  );
};

// Define a functional component for displaying the entire workout plan
const DisplayWorkoutPlan: React.FC<{ workoutPlan: WorkoutPlan }> = ({ workoutPlan }) => {
  const { workouts } = workoutPlan;

  return (
    <div className="workout-plan">
      {workouts.map((workout, index) => (
        <WorkoutCard key={index} workout={workout} />
      ))}
    </div>
  );
};

// Define the WeightlossApp functional component
const WeightlossApp: React.FC = () => {
  // State to store the weight loss plan and loading indicator
  const [weightLossPlan, setWeightLossPlan] = useState<WorkoutPlan | null>(null);
  const [loading, setLoading] = useState(true);

  // Fetch data from the server when the component mounts
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get('http://localhost:3000/workouts');
        // Find the Weight Loss Plan from the fetched data
        const fetchedWeightLossPlan = response.data[0].workout_plans.find((plan: WorkoutPlan) => plan.plan_name === "Weight Loss Plan");
        setWeightLossPlan(fetchedWeightLossPlan);
        setLoading(false);
      } catch (error) {
        console.error('Error fetching data:', error);
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  // Render loading message while data is being fetched
  if (loading) {
    return <p>Loading...</p>;
  }

  // Render error message if weight loss plan is not found
  if (!weightLossPlan) {
    return (
      <div>
        <Header />
        <p>Weight loss plan not found.</p>
      </div>
    );
  }

  // Render the Weight Loss Plan along with workout details
  return (
    <div className="workout-pic-container">
      <Header />
      <div className='weightpic'>
        <p className='planname'>Weight Loss Plan</p>
        <DisplayWorkoutPlan workoutPlan={weightLossPlan} />
      </div>
    </div>
  );
};

// Export the WeightlossApp component as the default export
export default WeightlossApp;
