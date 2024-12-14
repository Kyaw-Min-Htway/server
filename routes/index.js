const express = require("express")
const registerUser = require("../controller/registerUser")
const checkEmail = require("../controller/checkEmail")
const checkPassword = require("../controller/checkPassword")
const userDetails = require("../controller/userDetails")

const router = express.Router()

router.post('/register',registerUser)
router.post('/email',checkEmail)
router.post('/password',checkPassword)
router.get('/user-details',userDetails)


module.exports = router