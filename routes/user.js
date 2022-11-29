const express = require('express')
const router = express.Router()

const AuthController = require('../controllers/user')

router.post('/signup',AuthController.register)
router.post('/login', AuthController.login)
router.post('/logout', AuthController.logout)
router.post('/forgotPassword', AuthController.forgotpassword)



module.exports = router