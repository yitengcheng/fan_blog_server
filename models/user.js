let mongoose = require('mongoose');

module.exports = mongoose.model('User',
    new mongoose.Schema({
        "userId": String,
        "name": String,
        "password": String,
        "createTime": String,
        "birthday": String,
        "phone": String,
        "email": String,
        "permissions": Array
    })
);