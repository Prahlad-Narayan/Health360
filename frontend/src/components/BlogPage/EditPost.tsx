import React, { useState, useEffect } from "react";
import "react-quill/dist/quill.snow.css";
import { useParams,useNavigate } from "react-router-dom";
import { jwtDecode, JwtPayload } from 'jwt-decode';
import axios from 'axios';

const EditPost = () => {
    let { id } = useParams();
    const [title, setTitle] = useState("");
    const [description, setDescription] = useState("");
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const navigate = useNavigate();


  
    useEffect(() => {
      const fetchPostData = async () => {
        try {
          const response = await fetch(`http://localhost:3000/blogs/${id}`);
          const data = await response.json();
          setTitle(data.title);
          // setDescription(stripHtmlTags(data.description));
          setDescription(data.description);
          // setAuthor(data.author);
          
          setLoading(false);
        } catch (error: any) {
            setLoading(false);
            setError(error.message);
        }
      };
  
      fetchPostData();
    }, [id]);

    interface JwtPayloadWithUserId extends JwtPayload {
      userId: string;
    }

    let userId = 'string';
    const token = localStorage.getItem('token');
    if (token) {
        const decoded: JwtPayloadWithUserId = jwtDecode(token) as JwtPayloadWithUserId;
        userId = decoded.userId;
    }
  
    const updatePost = async (ev: React.FormEvent<HTMLFormElement>) => {
      ev.preventDefault();
      const data = {
        title,
        description: description,
        userId: userId
      };

      try {
          const response = await axios.put(`http://localhost:3000/blogs/${id}`, data, {
            headers: {
                'Content-Type': 'application/json',
            },
        });

  
        if (response && response.status !== 200) {
          throw new Error(`Error updating post: ${response.statusText}`);
        }
  
        console.log("Post updated successfully!");
        // Redirect or navigate to the blog details page
        navigate('/blogs');
    } catch (error: any) {
        console.error("Error updating post:", error);
        setError(error.message);
    }
    };
  
    if (loading) {
      return <p>Loading post...</p>;
    }
  
    return (
        <div className="editpost-container">
        {error && <p className="error">{error}</p>}
        <form className="editpost-form" onSubmit={updatePost}>
      <input
        type="text"
        className="title"
        placeholder={"Title"}
        value={title}
        onChange={(ev: React.ChangeEvent<HTMLInputElement>) => setTitle(ev.target.value)}
        required
      /> 
      <textarea
        placeholder="description"
        value={description}
        onChange={(ev: React.ChangeEvent<HTMLTextAreaElement>) => setDescription(ev.target.value)}
        required
        rows={4} // Adjust the number of rows as needed 
        cols={100} // Adjust the number of columns as needed
        ></textarea>
      <button type="submit">Update Post</button>
      </form>
    </div>
  );
};

export default EditPost;
