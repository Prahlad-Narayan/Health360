// Importing the styles for the LandingPage and BlogPage components
import "../LandingPage/Landing.scss"
import "./BlogPage.scss"

// Importing components for the BlogPage
import Header from "../LandingPage/Header"
import BlogFooter from "./BlogFooter"
import Main from "./Main"

// Blog component definition
const Blog = () => {
    return (
        <div className="blogPage">
            {/* Including the Header component in the BlogPage */}
            <Header />

            {/* Including the Main component in the BlogPage */}
            <Main />

            {/* Including the BlogFooter component in the BlogPage */}
            <BlogFooter />
        </div>
    );
}

// Exporting the Blog component
export default Blog;
