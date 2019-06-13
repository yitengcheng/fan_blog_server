const express = require("express");
const router = express.Router();

const register = require("./api/register.js");
const login = require("./api/login.js");

router.use("/register", register);
router.use("/login", login);


module.exports = router;
