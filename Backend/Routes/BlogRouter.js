const express = require('express');
const BlogsController = require('../Controller/Blog-Controller');
const { requireSignIn, isAdmin } = require('../middleware/authMiddleware');




const blogsRouter= express.Router();




blogsRouter.post('/create-blog', requireSignIn, BlogsController.createBlogs)
blogsRouter.post('/update-blog/:id', requireSignIn, BlogsController.updateBlogs)
blogsRouter.get('/getall-blogs', requireSignIn, BlogsController.getAllBlogs)
blogsRouter.get('/blogs/:id', requireSignIn, BlogsController.getBlogById)

// forgot password
blogsRouter.post('/delete-blogs/:id', requireSignIn, BlogsController.deleteBlogs)
blogsRouter.put('/:id/like', requireSignIn, BlogsController.like)
blogsRouter.put('/:id/dislike', requireSignIn, BlogsController.dislike)
blogsRouter.put('/comment/post', requireSignIn, BlogsController.comment)
blogsRouter.get('/following/:id', requireSignIn, BlogsController.following)
blogsRouter.get('/followers/:id', requireSignIn, BlogsController.followers)



  module.exports = blogsRouter;