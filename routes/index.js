const express = require("express");
const router = express.Router();

const register = require("./api/userInfo/register.js");
const login = require("./api/userInfo/login.js");
const userUpdate = require("./api/userInfo/userUpdate.js");
const modifyPassword = require("./api/userInfo/modifyPassword.js");
const getWeaths = require("./api/webUtils/getWeaths.js");
const getknowledge = require("./api/webUtils/getknowledge.js");
const getImageList = require("./api/imageApi/getImageList.js");
const getFileExchanges = require("./api/imageApi/getFileExchanges.js");
const uploadFile = require("./api/imageApi/uploadFile.js");
const addBatch = require("./api/batch/addBatch.js");
const getBatchs = require("./api/batch/getBatchs.js");
const updateBatch = require("./api/batch/updateBatch.js");
const deleteBatch = require("./api/batch/deleteBatch.js");
const getRegion = require("./api/region/getRegion.js");
const orderAdd = require("./api/order/orderAdd.js");

const getSwiperImgs = require("./api/imooc-hybrid/swiper.js");

// 用户
router.use("/register", register);
router.use("/login", login);
router.use("/userUpdate", userUpdate);
router.use("/modifyPassword", modifyPassword);

// 天气
router.use("/getWeaths", getWeaths);

// 文字标注
router.use("/getknowledge", getknowledge);

// 图片
router.use("/getImageList", getImageList);
router.use("/getFileExchanges", getFileExchanges);
router.use("/uploadFile", uploadFile);

// 批次
router.use("/addBatch", addBatch);
router.use("/getBatchs", getBatchs);
router.use("/updateBatch", updateBatch);
router.use("/deleteBatch", deleteBatch);

// 地址
router.use("/getRegion", getRegion)

// 订单
router.use("/orderAdd", orderAdd)

// 混合风开发
router.use('/getSwiperImgs', getSwiperImgs)

module.exports = router;
