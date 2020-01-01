const jwt = require('jsonwebtoken')

const Blog = require('../models/blog')

exports.api_blogs_get = async (req, res, next) => {
  const blogs = await Blog.find()
  res.json({ blogs })
}

exports.api_singleblog_get = async (req, res, next) => {
  Blog.findById(req.params.id)
    .populate('comment')
    .populate('user')
    .exec((err, blogList) => {
      if (err) {
        return res.status(400).send('Blog not found')
      }

      return res.json(blogList.toJSON())
    })
}

exports.api_blog_create_post = async (req, res, next) => {
  const body = req.body

  try {
    const decodedToken = jwt.verify(req.token, process.env.SECRET)

    const blog = new Blog({
      title: body.title,
      content: body.content,
      user: decodedToken.id
    })

    const savedBlog = await blog.save()

    res.json(savedBlog.toJSON())
  } catch {
    res.status(401).json({ error: 'token invalid' })
  }
}
// exports.api_blog_delete_post
// exports.api_blogs_create_comment
