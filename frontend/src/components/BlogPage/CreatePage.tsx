// Importing styles for the landing and blog pages
import "../LandingPage/Landing.scss";
import "./BlogPage.scss";

// Importing BlogFooter, Header, and MainCreate components
import BlogFooter from "./BlogFooter";
import Header from "../LandingPage/Header";
import MainCreate from "./MainCreate";

// Blog component definition
const Blog = () => {
  // Render the blog page with Header, MainCreate, and BlogFooter
  return (
    <div className="blogPage">
      <Header />
      <MainCreate />
      <BlogFooter />
    </div>
  );
}

// Exporting the Blog component
export default Blog;
