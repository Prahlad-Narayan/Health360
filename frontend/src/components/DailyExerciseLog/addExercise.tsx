import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import Header from '../LandingPage/Header';
import './addExercise.scss';
import { jwtDecode, JwtPayload } from 'jwt-decode';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCalendarAlt, faChevronLeft, faChevronRight } from '@fortawesome/free-solid-svg-icons';
import { FaTrash } from 'react-icons/fa';

// Define the structure of the exercise data
interface ExerciseData {
  _id:string;
  caloriesBurned: number;
  minutes: number;
  exerciseName: string;
  date: string;
  userId: string;
}

// Extend the JwtPayload interface to include userId
interface JwtPayloadWithUserId extends JwtPayload {
  userId: string;
}

let userId: string; // Global variable to store userId

// React Functional Component: AddExercise
const AddExercise: React.FC = () => {
  // State variables
  const [selectedDate, setSelectedDate] = useState<Date | null>(new Date());
  const [exerciseData, setExerciseData] = useState<ExerciseData[]>([]);
  const [totalCaloriesBurned, setTotalCaloriesBurned] = useState<number>(0);
  const [totalMinutes, setTotalMinutes] = useState<number>(0);

  // Get userId from JWT token stored in localStorage
  const token = localStorage.getItem('token');
  if (token) {
    const decoded: JwtPayloadWithUserId = jwtDecode(token) as JwtPayloadWithUserId;
    userId = decoded.userId;
  }

  let navigate = useNavigate(); // Hook for navigation

  // Function to navigate to searchExercise page with the selected date
  const routeChange = () => {
    let formattedDate = '';
    if (selectedDate) {
      const timezoneOffset = selectedDate.getTimezoneOffset();
      const adjustedDate = new Date(selectedDate.getTime() - timezoneOffset * 60000);
      formattedDate = adjustedDate.toISOString().split('T')[0];
    }
    let path = `/searchExercise/${formattedDate}`;
    navigate(path);
  };

  // Function to handle moving to the previous day
  const handlePreviousDay = () => {
    if (selectedDate) {
      const previousDay = new Date(selectedDate);
      previousDay.setDate(selectedDate.getDate() - 1);
      setSelectedDate(previousDay);
    }
  };

  // Function to handle moving to the next day
  const handleNextDay = () => {
    if (selectedDate) {
      const nextDay = new Date(selectedDate);
      nextDay.setDate(selectedDate.getDate() + 1);
      setSelectedDate(nextDay);
    }
  };

  // Custom Input component for DatePicker
  const CustomDatePickerInput = ({ value, onClick }: any) => (
    <div className="custom-datepicker-input">
      <input type="text" value={value} readOnly={true} onClick={onClick} />
      <FontAwesomeIcon icon={faCalendarAlt} className="calendar-icon" />
    </div>
  );

  // Function to delete an exercise
  const handleDeleteExercise = async (exerciseId: string) => {
    // Delete exercise by ID using Axios
    try {
      const response = await axios.delete(`http://localhost:3000/exercise/${exerciseId}`);
      if (response.status === 200) {
        fetchExerciseData(); // Fetch updated exercise data after deletion
      } else {
        console.error('Failed to delete exercise');
      }
    } catch (error) {
      console.error('Error deleting exercise:', error);
    }
  };

  // Function to fetch exercise data for the selected date
  const fetchExerciseData = async () => {
    if (!selectedDate) return;

    try {
      const timezoneOffset = selectedDate.getTimezoneOffset();
      const adjustedDate = new Date(selectedDate.getTime() - timezoneOffset * 60000);
      const formattedDate = adjustedDate.toISOString().split('T')[0];

      let exerciseData: ExerciseData[] = [];
      try {
        // Fetch exercise data using Axios GET request
        const response = await axios.get<ExerciseData[]>(`http://localhost:3000/exercise/${userId}/${formattedDate}`);
        exerciseData = response.data.map((exercise) => ({ ...exercise, userId }));
      } catch (error) {
        console.error(`Error fetching data:`, error);
      }

      // Calculate total calories burned and total minutes
      let totalCaloriesBurned = 0;
      let totalMinutes = 0;
      if (exerciseData.length > 0) {
        for (let i = 0; i < exerciseData.length; i++) {
          totalCaloriesBurned += exerciseData[i].caloriesBurned;
          totalMinutes += exerciseData[i].minutes;
        }
      }

      // Update state variables with fetched exercise data and totals
      setTotalCaloriesBurned(Math.round(totalCaloriesBurned * 100) / 100);
      setTotalMinutes(totalMinutes);
      setExerciseData(exerciseData);
    } catch (error) {
      console.error('Error fetching exercise data:', error);
      setExerciseData([]); // Set exercise data to an empty array in case of an error
    }
  };

  useEffect(() => {
    fetchExerciseData(); // Fetch exercise data when the selectedDate changes
  }, [selectedDate]);

  // Return the TSX content
  return (
    <div className="exercise-page">
      {/* Header component */}
      <Header />
      {/* Background image container */}
      <div className="bg-img-exercise">
        {/* Date selection bar */}
        <div className="date-bar">
          {/* Display selected date and navigation buttons */}
          <h3 className="select-date">Your exercise log for:</h3>
          <div className="arrow-icon" onClick={handlePreviousDay}>
            <FontAwesomeIcon icon={faChevronLeft} />
          </div>

          {/* DatePicker component for selecting date */}
          <div className="datepicker-container">
            <DatePicker
              selected={selectedDate}
              onChange={(date: Date | null) => setSelectedDate(date)}
              dateFormat="yyyy-MM-dd"
              customInput={<CustomDatePickerInput />}
            />
          </div>

          <div className="arrow-icon" onClick={handleNextDay}>
            <FontAwesomeIcon icon={faChevronRight} />
          </div>
        </div>

        {/* Exercise data container */}
        <div className="exercise-container">
          {/* Table headings */}
          <div className="exercise-name-heading">Exercise name</div>
          <div className="calories-burned-heading">Calories Burned</div>
          <div className="minutes-heading">Minutes</div>

          {/* Exercise details */}
          <div className="exercise-heading row-heading">
            <h3>Exercise</h3>
            <button onClick={() => routeChange()}>+</button>
          </div>

          {/* Display exercise names */}
          <div className={`exercise-name`}>
            {exerciseData.length > 0 ? (
              exerciseData.map((exercise, exerciseIndex) => (
                <div key={exerciseIndex}>{exercise ? <div className="item-name">{exercise.exerciseName}</div> : <div className="item-name">-</div>}</div>
              ))
            ) : (
              <div className="item-name">-</div>
            )}
          </div>

          {/* Display calories burned */}
          <div className={`exercise-calories-burned`}>
            {exerciseData.length > 0 ? (
              exerciseData.map((exercise, exerciseIndex) => (
                <div key={exerciseIndex}>{exercise ? <div className="item-calories-burned">{exercise.caloriesBurned}</div> : <div className="item-calories-burned">-</div>}</div>
              ))
            ) : (
              <div className="item-calories-burned">-</div>
            )}
          </div>

          {/* Display minutes */}
          <div className={`exercise-minutes`}>
            {exerciseData.length > 0 ? (
              exerciseData.map((exercise, exerciseIndex) => (
                <div key={exerciseIndex}>{exercise ? <div className="item-minutes">{exercise.minutes}</div> : <div className="item-minutes">-</div>}</div>
              ))
            ) : (
              <div className="item-minutes">-</div>
            )}
          </div>

          {/* Display delete button for each exercise */}
          <div className={`exercise-delete`}>
            {exerciseData.length > 0 ? (
              exerciseData.map((exercise, exerciseIndex) => (
                <div key={exerciseIndex}>
                  {exercise ? (
                    <FaTrash className="item-delete" onClick={() => handleDeleteExercise(exercise._id)} />
                  ) : (
                    <div className="item-delete">-</div>
                  )}
                </div>
              ))
            ) : (
              <div className="item-delete">-</div>
            )}
          </div>

          {/* Total section */}
          <div className="total-heading">
            <h3>Total</h3>
          </div>
          <div className="total-calories-burned">{totalCaloriesBurned !== 0 ? totalCaloriesBurned : ''}</div>
          <div className="total-minutes">{totalMinutes !== 0 ? totalMinutes : ''}</div>
        </div>
      </div>
    </div>
  );
};

export default AddExercise; // Export the AddExercise component