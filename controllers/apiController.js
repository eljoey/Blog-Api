const Blog = require('../models/blog')
const Comment = require('../models/comment')

exports.api_blogs_get = async (req, res, next) => {
  const blogs = await Blog.find()
  res.json({ blogs })
}

exports.api_singleblog_get = async (req, res, next) => {
  Blog.findById(req.params.id)
    .populate('comments')
    .exec((err, blogList) => {
      if (err) {
        return res.status(400).send('Blog not found')
      }

      return res.json(blogList.toJSON())
    })
}

exports.api_blog_create_post = async (req, res, next) => {
  const body = req.body

  const blog = new Blog({
    title: body.title,
    content: body.content,
    user: req.decodedToken.id
  })

  const savedBlog = await blog.save()

  res.json(savedBlog.toJSON())
}

exports.api_blog_update_put = async (req, res, next) => {
  const body = req.body
  const blogId = req.params.id

  const currentBlog = await Blog.findById(blogId)

  const updatedBlog = {
    ...currentBlog.toObject(),
    title: body.title,
    content: body.content
  }

  await Blog.findByIdAndUpdate(blogId, updatedBlog, { new: true })
  res.json(updatedBlog)
}

exports.api_reaction_update_put = async (req, res, next) => {
  const body = req.body
  const blogId = req.params.id
  const oldBlog = await Blog.findById(blogId)

  const updatedBlog = {
    ...oldBlog.toObject(),
    likes: body.likes,
    dislikes: body.dislikes
  }

  await Blog.findByIdAndUpdate(blogId, updatedBlog, { new: true })
  res.json(updatedBlog)
}

exports.api_blog_delete_post = async (req, res, next) => {
  const blogId = req.params.id

  // Delete comments connected to blog post
  await Comment.deleteMany({ blogId: blogId }).exec()

  await Blog.findByIdAndRemove(blogId, function deleteBlog(err) {
    if (err) {
      return res.json(err)
    }

    res.json({ msg: 'Blog deleted' })
  })
}

exports.api_comment_create_post = async (req, res, next) => {
  const body = req.body

  const blog = await Blog.findById(body.blogId)

  if (!blog) {
    return res.status(401).json({ error: 'Blog post not found' })
  }

  const newComment = new Comment({
    name: body.name,
    text: body.text,
    blogId: blog._id,
    timestamp: body.timestamp
  })

  const savedComment = await newComment.save()
  blog.comments = blog.comments.concat(savedComment)
  await blog.save()

  res.json(savedComment)
}

exports.api_comment_delete_post = async (req, res, next) => {
  const commentId = req.params.id
  const comment = await Comment.findById(commentId)
  const blog = (await Blog.findById(comment.blogId)).toObject()

  if (!comment || !blog) {
    return res.status(401).json({ error: 'Comment or Blog not found' })
  }

  // Delete comment
  await Comment.findByIdAndRemove(commentId)

  // Filter out deleted comment
  const updatedComments = blog.comments.filter(
    comment => comment._id != commentId
  )

  // Update blogpost with deleted comment removed
  const updatedBlog = new Blog({
    ...blog,
    comments: updatedComments
  })

  await Blog.findByIdAndUpdate(updatedBlog._id, updatedBlog, { new: true })

  res.json({ msg: 'Comment Deleted' })
}
