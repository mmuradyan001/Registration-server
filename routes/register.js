var express = require('express')
var router = express.Router()
const RegisterController = require('../controllers/RegisterController')
const controller = new RegisterController

/* GET Register listing. */

router.post('/', controller.registerUser)

module.exports = router
