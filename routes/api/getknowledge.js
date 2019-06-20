var express = require('express');
var router = express.Router();
var fs = require('fs');
var postJson = require('../../utils/postJson.js');

router.post('/', (req, res, next) => {
    let searchText = req.body.searchText;
    fs.readFile('baidu-token.json', 'utf-8', (err, token) => {
        if (err) {
            res.json({
                success: false,
                msg: err
            });
        } else {
            let content = JSON.stringify({ data: searchText });
            let options = {
                hostname: 'aip.baidubce.com',
                port: 443,
                path: '/rpc/2.0/kg/v1/cognitive/entity_annotation?access_token=' + JSON.parse(token).access_token,
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                }
            };
            postJson(options, content).then(data => {
                res.json({
                    success: true,
                    data: JSON.parse(data)
                })
            });
        }
    });
});


module.exports = router