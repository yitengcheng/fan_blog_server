#!/usr/bin/env node

var mongoose = require('mongoose');
mongoose.connect('mongodb://127.0.0.1:27017/spider', { useNewUrlParser: true });

let Image = mongoose.model('Image',
    new mongoose.Schema({
        "img_url": Array,
        "title": String,
        "file_path": Array
    }), 'meizi'
);

Image.find({}, (err, docs) => {
    if (!err) {
        docs.forEach(doc => {
            let files = []
            doc.file_path.forEach((path, index) => {
                files.push(path.replace('http://localhost:3000', 'http://www.fanzehua.cn'))
            })
            doc.file_path = files
            console.log('doc:', doc)
            doc.save();
        })
    }
})