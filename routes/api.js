const express = require('express')
const router = express.Router()
const middleware = require('../utils/middleware')

const api_controller = require('../controllers/apiController')

router.get('/blogs', api_controller.api_blogs_get)

router.get('/blogs/:id', api_controller.api_singleblog_get)

router.post(
  '/blogs/create',
  middleware.verifyTokenPresent,
  api_controller.api_blog_create_post
)

// router.post(
//   '/blogs/delete/:id',
//   middleware.verifyTokenPresent,
//   api_controller.api_blog_delete_post
// )

router.post(
  '/blogs/comment/create',
  api_controller.api_blogs_create_comment_post
)

module.exports = router
