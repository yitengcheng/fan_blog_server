let mongoose = require('mongoose');

module.exports = mongoose.model('weath',
    new mongoose.Schema({
        "day": String,
        "weather": String,
        "minTemp": String,
        "maxTemp": String,
    })
);