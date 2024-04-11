// Importing styles and dependencies
import "./Landing.scss"
import { useNavigate } from 'react-router-dom';

// Main component representing the landing page
const Main = () => {
    // Initializing the navigate function from the router
    let navigate = useNavigate();

    // Function to navigate to the signup page
    const routeChange = () => {
        let path = `signup`;
        navigate(path);
    }

    return (
        // Main area container
        <div className="main-area">
            {/* Health image */}
            <img src={process.env.PUBLIC_URL + "/mainpagepic.png"} alt="healthpic" className="healthpic"></img>
            {/* Health360 logo */}
            <img className="logo-inside" src={process.env.PUBLIC_URL + "/Health360LOGO.png"} alt="Logo"></img>
            <div className="img-item">
                {/* Favorite fitness app text */}
                <p className="fav">Your favourite fitness app</p>
                {/* Goals text */}
                <p className="goal">Reach your Goals with</p>
                {/* Health360 text */}
                <p className="goalA">Health360</p>
                {/* About text */}
                <p className="about">Build healthy habits with the all-in-one food, exercise, and calorie tracker.</p>
            </div>
            {/* Start Your Journey Now button */}
            <button className="sign-up" onClick={routeChange}>
                Start Your Journey Now
            </button>
        </div>
    )
}

// Exporting the Main component
export default Main;
