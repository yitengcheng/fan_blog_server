const express = require("express");
const router = express.Router();

const register = require("./api/register.js");

router.use("/register", register);


module.exports = router;
