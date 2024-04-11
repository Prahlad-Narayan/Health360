import React, { FormEvent, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import Header from "../LandingPage/Header";
import "./basics.scss";
import { JwtPayload, jwtDecode } from "jwt-decode";

// Global variable to store user ID
let userIdVal: string;

// Interface for JWT payload with user ID
interface JwtPayloadWithUserId extends JwtPayload {
  userId: string;
}

// Basics component to handle user profile basics form
function Basics() {
  // React hook for navigation
  const navigate = useNavigate();

  // Interface for form data
  interface FormData {
    age: number;
    height: number;
    weight: number;
    sexAtBirth: string;
    foodPreference: string;
    fitnessGoal: string;
  }

  // Interface for form errors
  interface FormErrors {
    ageError: boolean;
    heightError: boolean;
    weightError: boolean;
    sexAtBirthError: boolean;
    foodPreferenceError: boolean;
    fitnessGoalError: boolean;
  }

  // State to manage form data, form errors, and error message
  const [formData, setFormData] = useState<FormData>({
    age: 0,
    height: 0,
    weight: 0,
    sexAtBirth: "",
    foodPreference: "",
    fitnessGoal: "",
  });

  const [formErrors, setFormErrors] = useState<FormErrors>({
    ageError: false,
    heightError: false,
    weightError: false,
    sexAtBirthError: false,
    foodPreferenceError: false,
    fitnessGoalError: false,
  });

  const [errorMessage, setErrorMessage] = useState("");

  // Function to validate the form
  const validateForm = () => {
    let valid = true;
    const newErrors: FormErrors = { ...formErrors };

    for (const key in formData) {
      if (formData[key as keyof FormData] === 0 || formData[key as keyof FormData] === "") {
        newErrors[`${key}Error` as keyof FormErrors] = true;
        valid = false;
      }
    }

    setFormErrors(newErrors);
    return valid;
  };

  // Function to submit the form
  const submit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    // Decode JWT token to get user ID
    const token = localStorage.getItem('token');
    if (token) {
      const decoded: JwtPayloadWithUserId = jwtDecode(token) as JwtPayloadWithUserId;
      userIdVal = decoded.userId;
    }

    if (validateForm()) {
      try {
        // Make a POST request to create user profile
        const res = await axios.post(
          "http://localhost:3000/user-profile/",
          {...formData, userId: userIdVal}
        );
        
        // If creation is successful, navigate to the dashboard
        if (res.status === 200) {
          navigate("/dashboard", { state: { id: localStorage.getItem("id") } });
        }
      } catch (error: any) {
        // Handle creation errors
        setErrorMessage(
          "An error occurred. Please check your details and try again."
        );
      }
    } else {
      // Display an error message if form validation fails
      setErrorMessage("Please fill in all required fields.");
    }
  };

  // JSX structure for the user profile basics form
  return (
    <div className="basics-container">
      <Header></Header>
      {/* Introduction message */}
      <p className="basics-heading">You have taken your first step towards a healthier lifestyle!<br/>
                    We would like to know more about you to provide a seamless fitness experience.</p>
      <form className="basics-form" onSubmit={submit}>
        {/* Input fields for age, height, weight, sex at birth, food preference, and fitness goal */}
        <input
          className={formErrors.ageError ? "error" : ""}
          name="age"
          type="number"
          onChange={(e) => setFormData({ ...formData, age: +e.target.value })}
          placeholder="Age"
        />
        <input
          className={formErrors.heightError ? "error" : ""}
          name="height"
          type="number"
          onChange={(e) =>
            setFormData({ ...formData, height: +e.target.value })
          }
          placeholder="Height (in cm)"
        />
        <input
          className={formErrors.weightError ? "error" : ""}
          name="weight"
          type="number"
          onChange={(e) =>
            setFormData({ ...formData, weight: +e.target.value })
          }
          placeholder="Weight (in Pounds)"
        />
        {/* Dropdowns for selecting sex at birth, food preference, and fitness goal */}
        <select
          className={formErrors.sexAtBirthError ? "error" : ""}
          name="sexAtBirth"
          onChange={(e) =>
            setFormData({ ...formData, sexAtBirth: e.target.value })
          }
        >
          <option value="" disabled selected>
            Select Sex at Birth
          </option>
          <option value="Male">Male</option>
          <option value="Female">Female</option>
        </select>
        <select
          className={formErrors.foodPreferenceError ? "error" : ""}
          name="foodPreference"
          onChange={(e) =>
            setFormData({ ...formData, foodPreference: e.target.value })
          }
        >
          <option value="" disabled selected>
            Select Food Preference
          </option>
          <option value="Vegetarian">Vegetarian</option>
          <option value="Non-Vegetarian">Non-Vegetarian</option>
          <option value="Vegan">Vegan</option>
        </select>
        <select
          className={formErrors.fitnessGoalError ? "error" : ""}
          name="fitnessGoal"
          onChange={(e) =>
            setFormData({ ...formData, fitnessGoal: e.target.value })
          }
        >
          <option value="" disabled selected>
            Select Fitness Goal
          </option>
          <option value="Weight-Gain">Weight Gain</option>
          <option value="Weight-Loss">Weight Loss</option>
          <option value="Maintain-Weight">Maintain Weight</option>
        </select>
        {/* Display error message, if any */}
        {errorMessage && <p style={{ color: "red" }}>{errorMessage}</p>}
        {/* Submit button */}
        <input type="submit" value="Submit" />
      </form>
    </div>
  );
}

export default Basics;
