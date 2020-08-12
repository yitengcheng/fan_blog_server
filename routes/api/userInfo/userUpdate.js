var express = require('express');
var router = express.Router();
let User = require('../../../models/user.js')

router.post('/', (req, res, next) => {
    let user = req.body.user;
    User.findOne({ name: user.name }, (err, doc) => {
        if (err) {
            res.json({
                success: false,
                msg: err.message
            })
        } else {
            if (doc && doc._id != user._id) {
                res.json({
                    success: false,
                    msg: '此用户名已被注册'
                })
            } else {
                User.findOneAndUpdate(
                    { _id: user._id },
                    { $set: user },
                    { 'new': true })
                    .exec((err, doc) => {
                        if (err) {
                            res.json({
                                success: false,
                                msg: err.message
                            })
                        } else {
                            let user = doc.toObject();
                            delete user['password'];
                            res.json({
                                success: true,
                                user
                            })
                        }
                    })
            }
        }
    });

});

module.exports = router;