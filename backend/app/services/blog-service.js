import Blog from '../models/blog/blog.js';

// Search for all blogs
export const search = async (params = {}) => {
    const blogs = await Blog.find({}).populate('userId').exec();
    return blogs;
}

// Save a new blog entry to the database
export const save = async (newBlog) => {
    const blog = new Blog(newBlog); 
    return await blog.save();
}

// Update an existing blog entry in the database
export const updateBlog = async (id, Updateblog) => {
    const blog = await Blog.findByIdAndUpdate(id, Updateblog, { new: true }).exec();
    return blog;
}

// Delete a blog entry from the database based on its ID
export const deleteBlog = async (id) => {
    const blog = await Blog.findByIdAndDelete(id).exec();       
    return blog;
}

// Get a blog by its ID
export const getById = async (id) => {
    const blog = await Blog.findById(id).exec();
    return blog;
}