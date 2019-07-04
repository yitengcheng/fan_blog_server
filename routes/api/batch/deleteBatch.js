var express = require('express');
var router = express.Router();
let Batch = require('../../../models/batch.js')

router.post('/', (req, res, next) => {
    let { batchId } = req.body;
    Batch.remove({ batchId }, (err) => {
        if (err) {
            res.json({
                success: false,
                msg: err.message
            })
        } else {
            res.json({
                success: true,
                batchId
            })
        }
    })

});

module.exports = router;