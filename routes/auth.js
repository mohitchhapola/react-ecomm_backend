const express = require("express")
const { createUser, loginUser } = require("../controllers/auth")
const router  = express.Router()


router.post("/user",createUser)
router.post("/user/login",loginUser)

module.exports = router;