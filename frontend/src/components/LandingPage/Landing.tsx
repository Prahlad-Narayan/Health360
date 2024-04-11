// Importing React and styles
import React from "react"
import "./Landing.scss"

// Importing components
import Header from "./Header"
import Main from "./Main"
import Review from "./Reviews"
import Footer from "./Footer"

// Landing component representing the main landing page
const Landing = () => {
    return (
        // Main container for the landing page
        <div className="landing">
            {/* Header component */}
            <Header />
            {/* Main component */}
            <Main />
            {/* Review component */}
            <Review />
            {/* Footer component */}
            <Footer />
        </div>
    )
}

// Exporting the Landing component
export default Landing;
