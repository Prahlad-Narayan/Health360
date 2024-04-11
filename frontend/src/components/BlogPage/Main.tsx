// Importing components for the blog page
import BlogHeading from './BlogHeading';
import Body from './Body';

// Importing styles for the blog page
import "./BlogPage.scss";

// Main component definition
const Main = () => {
  // Render the main section of the blog page, including the heading and body
  return (
    <div className='Main'>
      {/* Render the blog heading component */}
      <BlogHeading />

      {/* Render the blog body component */}
      <Body />
    </div>
  );
};

// Export the Main component
export default Main;
