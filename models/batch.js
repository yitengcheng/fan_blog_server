let mongoose = require('mongoose');

module.exports = mongoose.model('Batch',
    new mongoose.Schema({
        "batchId": String,
        "name": String,
        'phone': String,
        'plate': String,
        'arriveDate': String,
        'createTime': String,
        'carInfo': String,
        'remark': String
    })
);