let mongoose = require('mongoose');

module.exports = mongoose.model('File',
    new mongoose.Schema({
        filePaths: Array,
        createTime: {
            type: Date,
            default: new Date()
        },
        toUserId: {
            type: String,
            default: '5d2a1bacd7e4e15142015b54'
        }
    })
);