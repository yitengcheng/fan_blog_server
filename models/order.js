let mongoose = require('mongoose');

module.exports = mongoose.model('Order',
    new mongoose.Schema({
        "batchId": { batchId: { type: Schema.Types.String, ref: "Batch" } },
        'createTime': String,
        'modifyTime': String,
        'remark': String,
        'deliveryName': String,
        'deliveryNamePhone': String,
        'receiveName': String,
        'receiveNamePhone': String,
        'startPoint': String,
        'endPoint': String,
        'sendDoorPoint': String,
        'name': String,
        'weight': Number,
        'volume': Number,
        'number': Number,
        'payMode': Number,
        'transferMode': Number,
        'deliveryMode': Number,
        'isValuation': Number,
        'receiptNO': String,
        'receiptNums': Number,
        'imageList': Array
    })
);