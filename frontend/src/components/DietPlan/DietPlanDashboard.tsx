import React from "react"
import "./DietPlanDashboard.scss"
import Header from "../LandingPage/Header"
import { useNavigate } from 'react-router-dom';

// DietPlanDashboard component definition
const DietPlanDashboard = () => {
    // Hook for navigation
    let navigate = useNavigate(); 

    // Function to handle route changes
    const routeChange = (path: any) => {  
        navigate(path);
    }

    // JSX structure for rendering the DietPlanDashboard component
    return (
        <div>
            {/* Header component for navigation */}
            <Header />

            {/* Image container for diet plan dashboard */}
            <div className="dietpic" />

            {/* Container for diet plan options */}
            <div className="dietplan-container">
                <p className="dietplan">Diet Plan</p>
                <div>
                    {/* Buttons for different diet plan options with click event handlers */}
                    <button className="options" onClick={() => routeChange('vegetarian')}>Vegetarian</button>
                    <button className="options" onClick={() => routeChange('nonvegetarian')}>Non-Vegetarian</button>
                    <button className="options" onClick={() => routeChange('vegan')}>Vegan</button>
                </div>
            </div>
        </div>
    );
}

// Exporting the DietPlanDashboard component
export default DietPlanDashboard;
