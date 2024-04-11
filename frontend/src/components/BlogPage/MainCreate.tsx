// Importing styles for the blog page
import "./BlogPage.scss";

// Importing components for creating a new blog post
import CreatePost from './CreatePost';
import CreateBlogHeading from './CreateBlogHeading';

// MainCreate component definition
const MainCreate = () => {
  // Render the main section for creating a new blog post
  return (
    <div className='Main'>
      <div className='CreatePost'>
        {/* Render the heading for creating a new blog */}
        <CreateBlogHeading />

        {/* Render the component for creating a new blog post */}
        <CreatePost />
      </div>
    </div>
  );
};

// Export the MainCreate component
export default MainCreate;
