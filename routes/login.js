const express = require('express')
const router = express.Router()

const login_controller = require('../controllers/loginController')

router.get('/', login_controller.login_get)

module.exports = router
