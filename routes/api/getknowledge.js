var express = require('express');
var router = express.Router();
var fs = require('fs');
var https = require('https');

router.post('/', (req, res, next) => {
    let searchText = req.body.searchText;
    let result = res;
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
            let httpsPost = https.request(options, function (res) {
                res.setEncoding('utf8');
                res.on('data', function (chunk) {
                    result.json({
                        success: true,
                        data: chunk
                    })
                });
            });
            httpsPost.write(content)
            httpsPost.end();
        }
    });
});


module.exports = router