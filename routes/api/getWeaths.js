var express = require('express');
var router = express.Router();
let Weath = require('../../models/weath.js');

router.post('/', (req, res, next) => {
    Weath.find((err, doc) => {
        if (err) {
            res.json({
                success: false,
                msg: err.message
            })
        } else {
            res.json({
                success: true,
                data: doc
            })
        }
    })
});

module.exports = router;
