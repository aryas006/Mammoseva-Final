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
        rers.status(201).json({ message: "New blog created" })
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
        const { id } = request.params
        const blog = await Blogs.findById(id)
        if (!blog) {
            return res.json({ message: "Blog does not exist" })
        }
        await blog.remove()
        return res.json({ message: "Blog deleted" })
    } catch {
        console.log(error)
    }
}

module.exports = { createBlog, updateBlog, deleteBlog}