import React from "react";
import "./WorkoutPlanDashboard.scss";
import Header from "../LandingPage/Header";
import { useNavigate } from 'react-router-dom';

const WorkoutPlanDashboard = () => {
    let navigate = useNavigate();

    // Function to navigate to a specific route
    const routeChange = (path: any) => {
        navigate(path);
    }

    return (
        <div>
            <Header />
            <div className="img" />
            <div className="workoutplan-container">
                <p className="workoutplan">Workout Plan</p>
                <div>
                    {/* Buttons to navigate to different workout plan options */}
                    <button className="options" onClick={() => routeChange('weightloss')}>Weight Loss</button>
                    <button className="options" onClick={() => routeChange('weightgain')}>Weight Gain</button>
                    <button className="options" onClick={() => routeChange('maintainweight')}>Maintain Weight</button>
                </div>
            </div>
        </div>
    );
}

export default WorkoutPlanDashboard;
