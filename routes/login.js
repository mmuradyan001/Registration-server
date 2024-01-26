var express = require('express')
var router = express.Router()
const LoginController = require('../controllers/LoginController')
const controller = new LoginController

/* GET Login listing. */


router.post('/', controller.loginUser)

module.exports = router