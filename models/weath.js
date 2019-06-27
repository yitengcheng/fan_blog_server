let mongoose = require('mongoose');

module.exports = mongoose.model('Weath',
    new mongoose.Schema({
        "day": String,
        "weather": String,
        "minTemp": String,
        "maxTemp": String,
    })
);