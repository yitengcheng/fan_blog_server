var https = require('https');

function getJson(url) {
    var pm = new Promise((resolve, reject) => {
        https.get(url, function (res) {
            var jsonData = '';
            res.on("data", function (data) {
                jsonData += data.toString();
            })
            res.on("end", function () {
                jsonData = JSON.parse(jsonData);
                resolve(jsonData);
            }).on('error', function (e) {
                reject(e)
            });
        });
    });
    return pm;
}

module.exports = getJson