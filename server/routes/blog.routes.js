const express = require('express');
const blogRouter = express.Router();
const blogControllers = require('../controllers/blog.controllers');

blogRouter.post('/createBlog', blogControllers.createBlog)
blogRouter.put('/updateBlog/:id', blogControllers.updateBlog)
blogRouter.delete('/deleteBlog/:id', blogControllers.deleteBlog)

module.exports = blogRouter;