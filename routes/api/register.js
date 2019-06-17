var express = require('express');
var router = express.Router();
let User = require('../../models/user.js')
let monent = require('moment')

router.post('/', (req, res, next) => {
    let user = req.body.user;
    User.findOne({ name: user.name }, (err, doc) => {
        if (err) {
            res.json({
                success: false,
                msg: err.message
            });
        } else {
            if (doc) {
                res.json({
                    success: false,
                    msg: '该用户名已被注册'
                });
            } else {
                user['createTime'] = monent().format('YYYY-MM-DD hh:mm:ss');
                user['permissions'] = []
                new User(user).save((err1, doc1) => {
                    if (err1) {
                        res.json({
                            success: false,
                            msg: err1.message
                        });
                    } else {
                        let user = doc1.toObject;
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