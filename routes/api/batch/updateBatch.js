var express = require('express');
var router = express.Router();
let Batch = require('../../../models/batch.js')

router.post('/', (req, res, next) => {
    let { batch } = req.body;
    let { batchId } = batch;
    Batch.findOneAndUpdate({ batchId },
        { $set: batch },
        { 'new': true }).exec((err, doc) => {
            if (err) {
                res.json({
                    success: false,
                    msg: err.message
                })
            } else {
                res.json({
                    success: true
                })
            }
        })

});

module.exports = router;