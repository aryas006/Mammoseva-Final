const express = require('express');
const blogRouter = express.Router();
const blogControllers = require('../controllers/blog.controllers');

blogRouter.post('/createBlog', blogControllers.createBlog)
blogRouter.put('/updateBlog/:id', blogControllers.updateBlog)
blogRouter.delete('/deleteBlog/:id', blogControllers.deleteBlog)
blogRouter.get('/viewAllBlogs', blogControllers.viewAllBlogs)
blogRouter.get('/viewUserBlogs/:id', blogControllers.viewUserBlogs)

module.exports = blogRouter;