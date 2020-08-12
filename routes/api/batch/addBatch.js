var express = require('express');
var router = express.Router();
let Batch = require('../../../models/batch.js')
let monent = require('moment')

router.post('/', (req, res, next) => {
    let { name, phone, plate, arriveDate, carInfo, remark } = req.body.batch;
    let batchId = 'PW' + monent().format('YYYYMMDDhhmmss');
    let createTime = monent().format('YYYY-MM-DD hh:mm:ss')
    new Batch({ name, phone, plate, arriveDate, carInfo, remark, batchId, createTime }).save((err, doc) => {
        if (err) {
            res.json({
                success: false,
                msg: err.message
            })
        } else {
            res.json({
                success: true,
                batchId: doc.batchId
            })
        }
    });
});

module.exports = router;