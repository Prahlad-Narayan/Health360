import * as blogService from '../services/blog-service.js';
import { setResponse, setErrorResponse } from './response-handler.js';

export const get = async (request, response) => {
    try{
        const blogs = await blogService.search({});     // Get all blogs
        setResponse(blogs, response);
    } catch (err) {
        setErrorResponse(err, response);
    }
}

// This function handles the HTTP POST request to create a new blog.
export const post = async (request, response) => {
    try{
        const newBlog = {...request.body};
        if(newBlog){
            const blog = await blogService.save(newBlog);
            console.log('BLOG', blog)
            setResponse(blog, response);
        }
    } catch (err) {
        setErrorResponse(err, response);
    }
}

// This function handles the HTTP PUT request to update an existing blog.
export const put = async (request, response) => {
    try{
        const id = request.params.id;
        const blog = {...request.body};
        const updatedBlog = await blogService.updateBlog(id, blog);
        setResponse(updatedBlog, response);
    } catch (err) {
        setErrorResponse(err, response);
    }
}

// This function handles the HTTP DELETE request to delete an existing blog.
export const remove = async (request, response) => {
    try{
        const id = request.params.id;
        const blog = await blogService.deleteBlog(id);
        setResponse(blog, response);
    } catch (err) {
        setErrorResponse(err, response);
    }
}

export const getById = async (request, response) => {
    console.log(request.params)
    try {
        const id = request.params.id;
        const blog = await blogService.getById(id); // Assuming you have a getById function in your blog-service.js
        if (blog) {
            setResponse(blog, response);
        } else {
            setErrorResponse({ message: 'Blog not found' }, response, 404);
        }
    } catch (err) {
        setErrorResponse(err, response);
    }
};