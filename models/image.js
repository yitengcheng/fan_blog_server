let mongoose = require('mongoose');

module.exports = mongoose.model('Image',
    new mongoose.Schema({
        "img_url": Array,
        "title": String,
        "file_path": Array
    }), 'meizi'
);