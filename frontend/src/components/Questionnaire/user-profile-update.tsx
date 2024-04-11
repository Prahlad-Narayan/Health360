import React, { FormEvent, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import Header from "../LandingPage/Header";
import "./basics.scss";
import { JwtPayload, jwtDecode } from "jwt-decode";

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

// Interface for JWT payload with user ID
interface JwtPayloadWithUserId extends JwtPayload {
  userId: string;
}

// Global variable to store user ID
let userIdVal: string;

// UserProfileUpdate component to handle updating user profile
function UserProfileUpdate() {
  // React hook for navigation
  const navigate = useNavigate();

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
      if (
        formData[key as keyof FormData] === 0 ||
        formData[key as keyof FormData] === ""
      ) {
        newErrors[`${key}Error` as keyof FormErrors] = true;
        valid = false;
      }
    }

    console.error('Form Error:', newErrors);

    setFormErrors(newErrors);
    return valid;
  };

  // Function to handle input changes and clear error messages
  const handleChange = (e: any) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
    setErrorMessage("");
    setFormErrors({ ...formErrors, [`${name}Error`]: false });
  };

  // Function to submit the form
  const submit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    console.log(e);

    // Decode JWT token to get user ID
    const token = localStorage.getItem('token');
    if (token) {
      const decoded: JwtPayloadWithUserId = jwtDecode(token) as JwtPayloadWithUserId;
      userIdVal = decoded.userId;
    }

    console.log('User ID:', userIdVal);
    console.log('Form Data:', formData);
    
    if (validateForm()) {
      try {
        const userId = localStorage.getItem("id");
        if (!userId) {
          console.error("User ID not found in localStorage");
          return;
        }

        // Make a PUT request to update user profile
        const res = await axios.put(
          `http://localhost:3000/user-profile/${userId}`,
          {...formData, userId: userIdVal}
        );

        // If update is successful, navigate to the dashboard
        if (res.status === 200) {
          navigate("/dashboard", { state: { id: userId } });
        }
      } catch (error: any) {
        // Handle update errors
        setErrorMessage(
          "An error occurred. Please check your details and try again."
        );
      }
    } else {
      // Display an error message if form validation fails
      setErrorMessage("Please fill in all required fields.");
    }
  };

  // JSX structure for the user profile update form
  return (
    <div className="update-user-profile-container">
      <Header />
      <h1 className="update-user-profile-heading">Update Your Profile</h1>
      <form className="update-user-profile-form" onSubmit={submit}>
        {/* Input fields for updating user profile */}
        <input
          className={formErrors.ageError ? "error" : ""}
          name="age"
          type="number"
          onChange={handleChange}
          placeholder="Age"
        />
        <input
          className={formErrors.heightError ? "error" : ""}
          name="height"
          type="number"
          onChange={handleChange}
          placeholder="Height (in cm)"
        />
        <input
          className={formErrors.weightError ? "error" : ""}
          name="weight"
          type="number"
          onChange={handleChange}
          placeholder="Weight (in Pounds)"
        />
        {/* Dropdowns for selecting sex at birth, food preference, and fitness goal */}
        <select
          className={formErrors.sexAtBirthError ? "error" : ""}
          name="sexAtBirth"
          onChange={handleChange}>
          <option value="" disabled selected>
            Select Sex at Birth
          </option>
          <option value="Male">Male</option>
          <option value="Female">Female</option>
        </select>
        <select
          className={formErrors.foodPreferenceError ? "error" : ""}
          name="foodPreference"
          onChange={handleChange}>
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
          onChange={handleChange}>
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

export default UserProfileUpdate;
