import { useNavigate } from "react-router-dom";
import "./BlogPage.scss";

// Header component definition
const Header = () => {
  // Hook for programmatic navigation
  const navigate = useNavigate();

  // Function to handle navigation to create blog page
  const handleCreateBlog = () => {
    // Navigate to the create blog page
    navigate("/blogs/create");
  };

  // Render header with a title
  return (
    <div className="blogTitle">
      <div>
        <h1 className="typing-animation">Create your Blog</h1>
      </div>
    </div>
  );
};

// Exporting the Header component
export default Header;
