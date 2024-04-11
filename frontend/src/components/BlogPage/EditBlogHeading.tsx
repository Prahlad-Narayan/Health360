import { useNavigate } from "react-router-dom";
import "./BlogPage.scss";

// Header component definition
const Header = () => {
  // React hook to get navigation function
  const navigate = useNavigate();

  // Function to handle navigation to the create blog page
  const handleCreateBlog = () => {
    // Navigate to the create blog page
    navigate("/blogs/create");
  };

  // Render the header with a dynamic title
  return (
    <div className="blogTitle">
      <div>
        <h1 className="typing-animation">Edit Your Blog</h1>
      </div>
    </div>
  );
};

// Export the Header component
export default Header;
