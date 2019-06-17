const express = require("express");
const router = express.Router();

const register = require("./api/register.js");
const login = require("./api/login.js");
const userUpdate = require("./api/userUpdate.js");
const modifyPassword = require("./api/modifyPassword.js");

router.use("/register", register);
router.use("/login", login);
router.use("/userUpdate", userUpdate);
router.use("/modifyPassword", modifyPassword);


module.exports = router;
