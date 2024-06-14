const Blogs = require('../models/blogs.models');
const User = require('../models/user.models');

const createBlog = async (req, res) => {
    try {
        const { title, content, createdBy } = req.body
        if (!title || !content || !createdBy) {
            return res.json({ message: "Please fill in all fields" })
        }
        const userExists = await User.findById(createdBy)
        if (!userExists) {
            return res.json({ message: "User does not exist" })
        }
        const newBlog = await Blogs.create({ title, content, createdBy })
        res.status(201).json({ message: "New blog created" })
    } catch (error) {
        console.log(error)
    }
}

const updateBlog = async (req, res) => {
    try {
        const { id } = req.params
        const { title, content } = req.body
        if(!title || !content) {
            return res.json({ message: "Please enter all fields" })
        }
        const blog = await Blogs.findById(id)
        if(!blog) {
            return res.json({ message: "Blog does not exist" })
        }
        blog.title = title
        blog.content = content
        const updatedBlog = await blog.save()
        return res.json({ message: "Blog updated" })
    } catch (error) {
        console.log(error)
    }
}

const deleteBlog = async (req, res) => {
    try {
        const { id } = req.params
        const blog = await Blogs.findById(id)
        if (!blog) {
            return res.json({ message: "Blog does not exist" })
        }
        await blog.remove()
        return res.json({ message: "Blog deleted" })
    } catch (error) {
        console.log(error)
    }
}

const viewAllBlogs = async (req, res) => {
    try {
        const blogs = await Blogs.find().populate('createdBy', 'name email'); // Populate createdBy with user details
        res.status(200).json(blogs);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Server error. Please try again later." });
    }
};

const viewUserBlogs = async (req, res) => {
    try {
        const { userId } = req.params;

        const userExists = await User.findById(userId);
        if (!userExists) {
            return res.status(404).json({ message: "User not found" });
        }

        const blogs = await Blogs.find({ createdBy: userId }).populate('createdBy', 'name email');
        res.status(200).json(blogs);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Server error. Please try again later." });
    }
};

module.exports = { createBlog, updateBlog, deleteBlog, viewAllBlogs, viewUserBlogs }