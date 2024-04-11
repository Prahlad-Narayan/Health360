// Importing styles for the blog page header
import "./BlogPage.scss";

// Header component definition
const Header = () => {
  // Render the header with the Health360 logo and a login link
  return (
    <div>
      <header className="navbar">
        <div className="top-logo">
          <img className="logo" src={process.env.PUBLIC_URL + "/Health360LOGO.png"} alt="Logo" />
          <h2 className="name">Health360</h2>
        </div>
        <nav>
          <a href="/login">Login</a>
        </nav>
      </header>
    </div>
  );
};

// Export the Header component
export default Header;
