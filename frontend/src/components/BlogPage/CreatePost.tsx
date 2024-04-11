import React, { useState, ChangeEvent, FormEvent } from "react";
import "react-quill/dist/quill.snow.css";
import { useNavigate } from "react-router-dom";
import { jwtDecode, JwtPayload } from 'jwt-decode';

// Define props for CreatePost component
interface CreatePostProps {}

// CreatePost component definition
const CreatePost: React.FC<CreatePostProps> = () => {
  // State hooks for managing title and content of the post
  const [title, setTitle] = useState<string>("");
  const [content, setContent] = useState<string>("");
  const navigate = useNavigate();

  // Quill editor modules and formats configuration
  const modules = {
    toolbar: [
      [{ 'header': [1, 2, false] }],
      ['bold', 'italic', 'underline', 'strike', 'blockquote'],
      [{'list': 'ordered'}, {'list': 'bullet'}, {'indent': '-1'}, {'indent': '+1'}],
      ['link', 'image'],
      ['clean']
    ],
  };

  const formats = [
    'header',
    'bold', 'italic', 'underline', 'strike', 'blockquote',
    'list', 'bullet', 'indent',
    'link', 'image'
  ];

  // Decode user ID from JWT token
  interface JwtPayloadWithUserId extends JwtPayload {
    userId: string;
  }

  let userId = 'string';
  const token = localStorage.getItem('token');
  if (token) {
    const decoded: JwtPayloadWithUserId = jwtDecode(token) as JwtPayloadWithUserId;
    userId = decoded.userId;
  }

  // Function to handle the creation of a new blog post
  async function createNewPost(ev: FormEvent) {
    ev.preventDefault();
    const data = {
      title: title,
      description: content,
      userId: userId,
    };

    try {
      // Make a POST request to create a new blog post
      const response = await fetch("http://localhost:3000/blogs", {
        method: "POST",
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(data),
      });

      // If the request is successful, navigate to the blogs page
      if (response.status === 200) {
        navigate("/blogs");
      }
    } catch (error) {
      console.log(error);
    }
  }

  // Render the create post form
  return (
    <form className="createpost" onSubmit={createNewPost}>
      <br />
      {/* Input field for the title of the blog post */}
      <input
        type="text"
        className="title"
        placeholder={"Title"}
        value={title}
        onChange={(ev: ChangeEvent<HTMLInputElement>) => setTitle(ev.target.value)}
        required
      /> 
      {/* Textarea for the content of the blog post */}
      <textarea
        placeholder="Content"
        value={content}
        onChange={(ev: ChangeEvent<HTMLTextAreaElement>) => setContent(ev.target.value)}
        required
        rows={4} // Adjust the number of rows as needed 
        cols={100} // Adjust the number of columns as needed
      ></textarea>

      {/* Button to submit the form and create the post */}
      <button className="submit" type="submit">Create Post</button>
    </form>
  );
};

// Export the CreatePost component
export default CreatePost;
