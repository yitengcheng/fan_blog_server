var express = require('express');
var router = express.Router();
let User = require('../../models/user.js')

router.post('/', function (req, res, next) {
    let name = req.body.name,
        password = req.body.password;
    User.findOne({ name }, (err, user) => {
        if (err) {
            res.json({
                success: false,
                msg: err.message
            });
        } else {
            if (user && password === user.password) {
                res.json({
                    success: true,
                    user
                });
            } else {
                res.json({
                    success: false,
                    msg: '用户名或者密码有误'
                });
            }
        }
    })

});

module.exports = router;