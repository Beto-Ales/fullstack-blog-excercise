const blogsRouter = require('express').Router()
const Blog = require('../models/blog')

blogsRouter.get('/', (request, response) => {
    Blog
        .find({})
        .then(blogs => {
            if(blogs) {
                response.json(blogs)
            } else {
                response.status(404).end()
            }            
        })
        .catch(error => error.message)
    
})

blogsRouter.post('/', (request, response) => {
    const body = request.body

    const blog = new Blog({
        title: body.title,
        author: body.author,
        url: body.url,
        likes: body.likes
    })

    blog
        .save()
        .then(savedBlog => {
            response.json(savedBlog)
        })
        .catch(error => error.message)    
})

module.exports = blogsRouter