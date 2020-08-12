let express = require('express');
let router = express.Router();
let File = require('../../../models/file.js');

router.post('/', async (req, res, next) => {
    let { files } = req.body;
    new File({ filePaths: files, createTime: new Date() }).save((err, doc) => {
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

module.exports = router