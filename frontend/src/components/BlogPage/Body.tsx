import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import "./BlogPage.scss";
import { FaEdit, FaTrash } from 'react-icons/fa';
import { jwtDecode, JwtPayload } from 'jwt-decode';

// Body component definition
function Body() {
    // State for storing blog data and loading status
    const [data, setData] = useState([]);
    const [loading, setLoading] = useState(true);
    
    // Hook for programmatic navigation
    const navigate = useNavigate();

    // Fetch blog data on component mount
    useEffect(() => {
        const fetchData = async () => {
            try {
                const result = await fetch('http://localhost:3000/blogs');
                const res = await result.json();
                setData(res);
            } catch (error) {
                console.log('Error fetching data:', error);
            } finally {
                setLoading(false);
            }
        };
        fetchData();
    }, []);

    // Loading state indicator
    if (loading) {
        return <p style={{ color: 'white' }}>Loading...</p>;
    }

    // Get current date and format it
    const currentDate = new Date();
    const options: Intl.DateTimeFormatOptions = {
        day: 'numeric',
        month: 'long',
        year: 'numeric',
    };
    const formattedDate = currentDate.toLocaleDateString('en-US', options);

    // Function to handle blog deletion
    const handleDelete = async (blogId: string) => {
        try {
            const response = await fetch(`http://localhost:3000/blogs/${blogId}`, {
                method: "DELETE",
                headers: {
                    'Content-Type': 'application/json'
                },
            });
            if (response.status === 200) {
                window.location.reload();
            }
        } catch (error) {
            console.log(error);
        }
    };

    // Decode user token and get user ID
    interface JwtPayloadWithUserId extends JwtPayload {
        userId: string;
    }
    let userId = 'string';
    const token = localStorage.getItem('token');
    if (token) {
        const decoded: JwtPayloadWithUserId = jwtDecode(token) as JwtPayloadWithUserId;
        userId = decoded.userId;
    }

    // Function to handle blog editing
    const handleEdit = async (blogId: string) => {
        navigate(`/edit/${blogId}`);
    };

    // Render blog posts
    return (
        <div className="post-container">
            {data.map((blog: any) => (
                <div key={blog._id} className="post">
                    <h1>{blog.title}</h1>
                    <div className="description">
                        {blog.description} <br /><br />
                    </div>
                    <div>
                        <p>
                            Author: <b><i>{blog.userId.firstName} {blog.userId.lastName}</i></b><br />
                            Created at: <b><i>{formattedDate}</i></b>
                        </p>
                    </div>
                    <div>
                        {/* Render edit and delete icons based on user ownership */}
                        {userId && blog.userId._id === userId ? (
                            <>
                                {console.log(userId)}
                                {console.log(blog.userId._id)}
                                <FaEdit className="edit" onClick={() => handleEdit(blog._id)} />
                                <FaTrash className="delete" onClick={() => handleDelete(blog._id)} />
                            </>
                        ) : (
                            <>
                                <FaEdit className="disabled-edit">Edit</FaEdit>
                                <FaTrash className="disabled-delete">Delete</FaTrash>
                            </>
                        )}
                    </div>
                </div>
            ))}
        </div>
    );
}

// Exporting the Body component
export default Body;
