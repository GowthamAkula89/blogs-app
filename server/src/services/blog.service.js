const {Blog} = require("../models/blog.model");

exports.createBlog = async (blogData) => {
    const newBlog = new Blog(blogData);
    await newBlog.save();
    return newBlog;
};

exports.updateBlog = async (blogId, updateData) => {
    const blog = await Blog.findByIdAndUpdate(blogId, updateData, { new: true });
    return blog;
};

exports.deleteBlog = async (blogId) => {
    const blog = await Blog.findByIdAndDelete(blogId);
    return blog;
};

exports.getBlogsByRegion = async (region) => {
    const blogs = await Blog.find({ region });
    return blogs;
};

exports.getBlogsByUser = async (userId) => {
    const blogs = await Blog.find({ author: userId }).populate("author", "fullName");
    return blogs;
};
