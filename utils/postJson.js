var https = require('https');

function postJson(options, content) {
    var pm = new Promise((resolve, reject) => {
        let httpsPost = https.request(options, function (res) {
            var jsonData = '';
            res.on("data", function (data) {
                if (typeof data === 'string') {
                    jsonData += data
                } else {
                    jsonData += data.toString();
                }
            })
            res.on("end", function () {
                resolve(jsonData);
            }).on('error', function (e) {
                reject(e)
            });
        });
        httpsPost.write(content)
        httpsPost.end()
    });
    return pm;
}

module.exports = postJson