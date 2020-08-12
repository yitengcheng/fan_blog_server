var express = require('express');
var router = express.Router();
let Batch = require('../../../models/batch.js')

router.post('/', (req, res, next) => {
    let { pageNo, pageSize, batchId, plate } = req.body;
    let searchOption = (batchId !== '' && plate !== '') ? { batchId, plate }
        : batchId !== '' ? { batchId }
            : plate !== '' ? { plate } : {}
    Batch.find(searchOption)
        .skip(pageNo * pageSize)
        .limit(pageSize)
        .exec((err, docs) => {
            if (err) {
                res.json({
                    success: false,
                    msg: err.message
                })
            } else {
                let data = []
                docs.forEach((doc) => {
                    data.push(doc)
                });
                res.json({
                    success: true,
                    data
                })
            }
        })
});

module.exports = router;