const express = require('express')
const router = express.Router()
const middleware = require('../utils/middleware')

const api_controller = require('../controllers/apiController')

router.get('/', api_controller.api_get)

module.exports = router
