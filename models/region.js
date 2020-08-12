let mongoose = require('mongoose');

module.exports = mongoose.model('Region',
    new mongoose.Schema({
        "PCODE": String,
        "REGIONNAME": String,
        "REGIONCODE": String,
        "leaf": Boolean
    }), 'region'
);