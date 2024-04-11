// Importing styles for the blog page
import "./BlogPage.scss";

// Importing components for editing a blog post
import EditPost from './EditPost';
import EditBlogHeading from './EditBlogHeading';

// MainEdit component definition
const MainEdit = () => {
  // Render the main section for editing a blog post
  return (
    <div className='Main'>
      <div className='CreatePost'>
        {/* Render the heading for editing a blog */}
        <EditBlogHeading />

        {/* Render the component for editing a blog post */}
        <EditPost />
      </div>
    </div>
  );
};

// Export the MainEdit component
export default MainEdit;
