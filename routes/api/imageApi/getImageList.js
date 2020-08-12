let express = require('express');
let router = express.Router();
let User = require('../../../models/user.js');
let Image = require('../../../models/image.js');
let _ = require('lodash');

router.post('/', async (req, res, next) => {
    let { userId, pageNo, pageSize } = req.body;
    User.findOne({ '_id': userId }, (err, doc) => {
        if (err) {
            res.json({
                success: false,
                msg: '账号有误，请重新登录'
            })
        } else {
            let user = doc.toObject();
            if (_.findIndex(user.permissions, o => {
                return o === 'watchImage';
            }) !== -1) {
                Image.countDocuments({}, (err1, num) => {
                    if (err1) {
                        res.json({
                            success: false,
                            msg: err1.message
                        })
                    } else {
                        Image.find().skip(pageNo * pageSize)
                            .limit(pageSize).exec((err2, docs) => {
                                let data = [];
                                docs.forEach(doc => {
                                    data.push(doc);
                                })
                                res.json({
                                    success: true,
                                    count: num,
                                    data
                                })
                            })
                    }
                });
            } else {
                res.json({
                    success: false,
                    msg: '账号权限不足，请联系管理员'
                })
            }
        }
    });
});

module.exports = router