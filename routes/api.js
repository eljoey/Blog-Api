const express = require('express')
const router = express.Router()
const middleware = require('../utils/middleware')

const api_controller = require('../controllers/apiController')

// Get all blog posts
router.get('/blogs', api_controller.api_blogs_get)

// Get single blog post
router.get('/blogs/:id', api_controller.api_singleblog_get)

// Create blog post after verifying JWT token
router.post(
  '/blogs/create',
  middleware.verifyToken,
  api_controller.api_blog_create_post
)

// Update blog post after verifying JWT Token
router.put(
  '/blogs/:id',
  middleware.verifyToken,
  api_controller.api_blog_update_put
)

// Delete blog after verifying JWT Token
router.post(
  '/blogs/delete/:id',
  middleware.verifyToken,
  api_controller.api_blog_delete_post
)

// Create comment on blog post
router.post('/blogs/comment/create', api_controller.api_comment_create_post)

// Delete comment after verifying JWT Token
router.post(
  '/blogs/comment/delete/:id',
  middleware.verifyToken,
  api_controller.api_comment_delete_post
)

module.exports = router
