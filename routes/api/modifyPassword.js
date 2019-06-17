var express = require('express');
var router = express.Router();
let User = require('../../models/user.js')

router.post('/', (req, res, next) => {
    let { password, userId, oldPassword } = req.body
    User.findOne({ _id: userId }, (err, doc) => {
        if (err) {
            res.json({
                success: false,
                msg: err.message
            })
        } else {
            if (doc && doc.password == oldPassword) {
                doc.password = password;
                doc.save(err1 => {
                    if (err) {
                        res.json({
                            success: false,
                            msg: err1.message
                        })
                    } else {
                        res.json({
                            success: true
                        })
                    }
                });
            } else {
                res.json({
                    success: false,
                    msg: '您输入密码有误'
                })
            }

        }
    });
});

module.exports = router;