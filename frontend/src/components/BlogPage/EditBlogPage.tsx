// Importing styles for the landing page and blog page
import "../LandingPage/Landing.scss";
import "./BlogPage.scss";

// Importing components
import Header from "../LandingPage/Header";
import BlogFooter from "./BlogFooter";
import MainEdit from "./MainEdit";

// Blog component definition
const Blog = () => {
    // Render the blog page with header, main content for editing, and footer
    return (
        <div className="blogPage">
            <Header />
            <MainEdit />
            <BlogFooter />
        </div>
    );
}

// Export the Blog component
export default Blog;
