const express = require("express");
const router = express.Router();

const register = require("./api/register.js");
const login = require("./api/login.js");
const userUpdate = require("./api/userUpdate.js");
const modifyPassword = require("./api/modifyPassword.js");
const getWeaths = require("./api/getWeaths.js");
const getknowledge = require("./api/getknowledge.js");
const getImageList = require("./api/getImageList.js");

router.use("/register", register);
router.use("/login", login);
router.use("/userUpdate", userUpdate);
router.use("/getWeaths", getWeaths);
router.use("/modifyPassword", modifyPassword);
router.use("/getknowledge", getknowledge);
router.use("/getImageList", getImageList);


module.exports = router;
