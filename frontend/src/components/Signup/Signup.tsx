import React, { FormEvent, useState } from "react"
import axios from "axios"
import './signup.scss'
import { useNavigate, Link } from "react-router-dom"
import { loginSuccess } from "../../store/slices/authSlice";
import { useDispatch } from "react-redux";

// Signup component to handle user registration
function Signup() {
    // React hooks for navigation and Redux dispatch
    const navigate = useNavigate();
    const dispatch = useDispatch();

    // Define interface for form data and form errors
    interface FormData {
        firstName: string;
        lastName: string;
        userName: string;
        email: string;
        password: string;
    }

    interface FormErrors {
        firstNameError: boolean;
        lastNameError: boolean;
        userNameError: boolean;
        emailError: boolean;
        passwordError: boolean;
    }

    // State to manage form data, form errors, and error message
    const [formData, setFormData] = useState<FormData>({
        firstName: "",
        lastName: "",
        userName: "",
        email: "",
        password: "",
    });

    const [formErrors, setFormErrors] = useState<FormErrors>({
        firstNameError: false,
        lastNameError: false,
        userNameError: false,
        emailError: false,
        passwordError: false,
    });

    const [errorMessage, setErrorMessage] = useState("");

    // Function to handle input changes and clear error messages
    const handleChange = (e: any) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
        setErrorMessage("");
        setFormErrors({ ...formErrors, [`${name}Error`]: false });
    };

    // Function to validate the form
    const validateForm = () => {
        let valid = true;
        const newErrors: FormErrors = { ...formErrors };

        for (const key in formData) {
            if (formData[key as keyof FormData] === "") {
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

        if (validateForm()) {
            try {
                // Make a POST request to the server for user registration
                const res = await axios.post("http://localhost:3000/user/sign-up", formData);
                
                // If registration is successful, store token, dispatch login success, and navigate to questionnaire
                if (res.status === 200) {
                    localStorage.setItem("token", res.data.token);
                    localStorage.setItem("id", formData.email);
                    dispatch(loginSuccess());
                    navigate("/questionnaire");
                }
            } catch (error: any) {
                // Handle registration errors, such as user already exists or general error
                if (error.response && error.response.status === 409) {
                    setErrorMessage("User already exists");
                } else {
                    setErrorMessage("An error occurred. Please check your details and try again.");
                }
            }
        } else {
            // Display an error message if form validation fails
            setErrorMessage("Please fill in all required fields.");
        }
    };

    // JSX structure for the signup form
    return (
        <div className="sign-up-btn">
            <div className="logo-div">
                <img className="logo-login" src={process.env.PUBLIC_URL + "/Health360LOGO.png"} alt="Logo"></img>
            </div>
            <div className="vl"></div>
            <div className="sign-up-container">
                <h2 className="app-name">Health360°</h2>
                <h1 className="sign-up-heading">Register</h1>
                <form className="sign-up-form" onSubmit={submit}>
                    {/* Input fields for user registration */}
                    <input className={formErrors.firstNameError ? "error" : ""} name="firstName" type="text" onChange={handleChange} value={formData.firstName} placeholder="First Name" />
                    <input className={formErrors.lastNameError ? "error" : ""} name="lastName" type="text" onChange={handleChange} value={formData.lastName} placeholder="Last Name" />
                    <input className={formErrors.userNameError ? "error" : ""} name="userName" type="text" onChange={handleChange} value={formData.userName} placeholder="User Name" />
                    <input className={formErrors.emailError ? "error" : ""} name="email" type="email" onChange={handleChange} value={formData.email} placeholder="Email" />
                    <input className={formErrors.passwordError ? "error" : ""} name="password" type="password" onChange={handleChange} value={formData.password} placeholder="Password" />
                    {/* Display error message, if any */}
                    {errorMessage && <p style={{ color: "red" }}>{errorMessage}</p>}
                    {/* Submit button */}
                    <input type="submit" value="Sign Up" />
                </form>
                {/* Link to login page for already registered users */}
                <div className="sign-up-para-link">
                    <p className="sign-up-para">Already registered?</p>
                    <Link className="signup-link" to="/login">Login Page</Link>
                </div>
            </div>
        </div>
    )
}

export default Signup;
