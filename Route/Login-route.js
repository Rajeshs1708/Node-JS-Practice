const express = require("express");
const router = express.Router();
const { user_register,verify_user,user_login } = require("../Controller/Login-controller")

router.post("/user/register", user_register);
router.post("/user/verify", verify_user);
router.post("/user/login", user_login);

module.exports = router;
