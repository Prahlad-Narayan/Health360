import React, { useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import Header from '../LandingPage/Header';
import { jwtDecode, JwtPayload } from 'jwt-decode';
import { useNavigate } from 'react-router-dom';
import './searchExercise.scss';

// Define the structure for an exercise item
type ExerciseItem = {
  userId: string;
  date: string;
  exerciseName: string;
  caloriesBurned: number;
  minutes: number;
};

// Define the structure for URL parameters
type Params = {
  formattedDate: string;
};

// Extend JwtPayload to include userId
interface JwtPayloadWithUserId extends JwtPayload {
  userId: string;
}

let userId: string;

const SearchExercise: React.FC = () => {
  const navigate = useNavigate();
  const { formattedDate } = useParams<Params>();
  const [searchTerm, setSearchTerm] = useState<string>('');
  const [searchResults, setSearchResults] = useState<any[]>([]);
  const [selectedExercise, setSelectedExercise] = useState<ExerciseItem | null>(null);
  const [selectedDuration, setSelectedDuration] = useState<number>(0);
  const [error, setError] = useState<string | null>(null);
  const [initialCaloriesBurned, setInitialCaloriesBurned] = useState<number>(0);
  const [initialMinutes, setInitialMinutes] = useState<number>(0);
  const date = formattedDate!;

  const token = localStorage.getItem('token');
  if (token) {
    const decoded: JwtPayloadWithUserId = jwtDecode(token) as JwtPayloadWithUserId;
    userId = decoded.userId;
  }

  // Function to handle changes in exercise duration
  const handleDurationChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const duration = parseInt(e.target.value);
    setSelectedDuration(duration);

    if (selectedExercise) {
      // Update selected exercise and search results based on duration changes
      if (duration === 0 || Number.isNaN(duration)) {
        setSelectedExercise({ ...selectedExercise, caloriesBurned: initialCaloriesBurned, minutes: initialMinutes });

        const updatedSearchResults = searchResults.map((exercise: any) =>
          exercise && exercise.name === selectedExercise?.exerciseName ? { ...exercise, duration_min: initialMinutes } : exercise
        );
        setSearchResults(updatedSearchResults);
      } else {
        const updatedCaloriesBurned = Math.round((initialCaloriesBurned * duration * 100) / (initialMinutes * 100));
        const updatedMinutes = duration;
        const updatedSelectedExercise = { ...selectedExercise, caloriesBurned: updatedCaloriesBurned, minutes: updatedMinutes };
        setSelectedExercise(updatedSelectedExercise);

        const updatedSearchResults = searchResults.map((exercise: any) =>
          exercise && exercise.name === selectedExercise?.exerciseName ? { ...exercise, duration_min: updatedMinutes } : exercise
        );
        setSearchResults(updatedSearchResults);
      }
    }
  };

  // Function to search for exercises using Nutritionix API
  const searchExercise = async () => {
    try {
      setSearchResults([]);
      setSelectedExercise(null);
      if (searchTerm !== '') {
        const response = await axios.post(
          `https://trackapi.nutritionix.com/v2/natural/exercise`,
          {
            query: searchTerm,
          },
          {
            headers: {
              'Content-type': 'application/json',
              'x-app-id': `${process.env.REACT_APP_X_APP_ID}`,
              'x-app-key': `${process.env.REACT_APP_X_APP_KEY}`,
            },
          }
        );

        if (response.data.exercises.length === 0) {
          setError('No results found!');
        }
        setSearchResults(response.data.exercises.slice(0, 5));
      } else {
        setError('Please provide a phrase to search for!');
      }
    } catch (error) {
      console.error('Error fetching search results:', error);
      setError('Error fetching search results!');
    }
  };

  // Function to handle click event on search results
  const handleClick = async (exercise: any) => {
    const selectedExerciseObj: ExerciseItem = {
      userId: userId,
      exerciseName: exercise.name,
      date: date,
      caloriesBurned: exercise.nf_calories,
      minutes: exercise.duration_min,
    };

    setSelectedExercise(selectedExerciseObj);
    setInitialCaloriesBurned(exercise.nf_calories);
    setInitialMinutes(exercise.duration_min);
  };

  // Function to save selected exercises
  const handleSave = async () => {
    if (searchResults.length > 0) {
      try {
        const exercisesToSave: ExerciseItem[] = searchResults.map((exercise: any) => ({
          userId: userId,
          exerciseName: exercise.name,
          date: date,
          caloriesBurned: exercise.nf_calories,
          minutes: exercise.duration_min,
        }));

        if (exercisesToSave.length > 0) {
          const res = await axios.post('http://localhost:3000/addExercises', exercisesToSave);
          if (res.status === 200) {
            navigate('/addExercise');
          }
        } else {
          setError('No exercises to save!');
        }
      } catch (error: any) {
        setError('Error saving the values!');
      }
    } else {
      setError('Please search and select exercises to save!');
    }
  };

  return (
    <div className="search-exercise-page">
      {/* Render the Header component */}
      <Header />

      <div className="bg-img-exercise">
        <div className="search-exercise-container-wrapper">
          <div className="search-exercise-page-container">
            {/* Input Section */}
            <div className="search-exercise-input-section">
              {/* Search Heading */}
              <h2 className="search-exercise-heading">Search Exercises</h2>
              <div>
                {/* Search Input Field */}
                <input
                  className="search-exercise-input"
                  type="text"
                  value={searchTerm}
                  onChange={(e) => {
                    setSearchTerm(e.target.value);
                    setError('');
                  }}
                  placeholder={`(e.g.) swimming 1 hour, jogging 30 mins`}
                />
                {/* Search Button */}
                <button className="search-exercise-btn" onClick={searchExercise}>
                  Search
                </button>
              </div>
              {/* Error Message Display */}
              {error && <p style={{ color: 'red' }}>{error}</p>}
            </div>

            {/* Search Results */}
            <div className="search-exercise-result">
              {/* Search Results Heading */}
              <h3>Search Results:</h3>
              {/* Instructions for selecting results */}
              {searchResults.length > 0 && (
                <div>
                  <p>Select to edit duration or view summary:</p>
                </div>
              )}
              {/* List of search results */}
              <ul className="search-exercise-list">
                {searchResults.map((item, index) => (
                  <div key={index}>
                    {/* Display each search result */}
                    <li className="search-exercise-item" onClick={() => handleClick(item)}>
                      {item.name} ({item.duration_min} minutes)
                    </li>
                  </div>
                ))}
              </ul>
            </div>

            {/* Edit Selected Exercise Section */}
            <div className="edit-exercise">
              {selectedExercise && (
                <div className="edit-exercise-container">
                  {/* Selected Exercise Details */}
                  <div className="select-exercise-and-edit">
                    {/* Selected Exercise Name */}
                    <h3 className="selected-exercise">
                      Selected Exercise: {selectedExercise.exerciseName.charAt(0).toUpperCase() + selectedExercise.exerciseName.slice(1)}
                    </h3>
                    {/* Input to modify exercise duration */}
                    <div className="select-duration-container">
                      <h3>Select Duration:</h3>
                      <input
                        className="add-duration-input"
                        name="duration"
                        value={selectedDuration}
                        type="number"
                        placeholder="Change Duration"
                        onChange={handleDurationChange}
                      />
                    </div>
                  </div>
                  {/* Summary of the selected exercise */}
                  <div className="exercise-summary">
                    <h3>Exercise Summary:</h3>
                    <p>Calories Burned: {selectedExercise.caloriesBurned}</p>
                    <p>Duration in Minutes: {selectedExercise.minutes}</p>
                  </div>
                </div>
              )}
            </div>

            {/* Save Exercises Section */}
            {searchResults.length > 0 && (
              <div className="save-exercises-container">
                {/* Display 'Save' or 'Save All' button based on search results */}
                {searchResults.length === 1 ? (
                  <button className="save-exercises-btn" onClick={handleSave}>
                    Save
                  </button>
                ) : (
                  <button className="save-exercises-btn" onClick={handleSave}>
                    Save All
                  </button>
                )}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default SearchExercise;