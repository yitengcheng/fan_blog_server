let express = require('express');
let router = express.Router();
let User = require('../../../models/user.js');
let File = require('../../../models/file.js');

router.post('/', async (req, res, next) => {
    let { userId } = req.body;
    if (userId) {
        User.findOne({ '_id': userId }, (err, doc) => {
            if (err) {
                res.json({
                    success: false,
                    msg: '账号有误，请重新登录'
                })
            } else {
                File.find({ 'toUserId': doc._id }).sort({ "createTime": -1 }).limit(1).exec((err, docs) => {
                    if (err) {
                        res.json({
                            success: false,
                            msg: err.message
                        })
                    } else {
                        docs.forEach(doc => {
                            res.json({
                                success: true,
                                filePaths: doc.filePaths
                            });
                        })
                    }
                })
            }
        });
    } else {
        res.json({
            success: false
        })
    }

});

module.exports = router