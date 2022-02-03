const blogsRouter = require('express').Router()
const Blog = require('../models/blog')

blogsRouter.get('/', async (request, response) => {
    const blogs = await Blog.find({})
    response.json(blogs)
})

blogsRouter.post('/', (request, response) => {
    const body = request.body
    const likes = body.likes ? true : false

    const blog = new Blog({
        title: body.title,
        author: body.author,
        url: body.url,
        likes: likes ? body.likes : 0
    })

    blog
        .save()
        .then(savedBlog => {
            response.json(savedBlog)
        })
        .catch(error => error.message)
})

module.exports = blogsRouter