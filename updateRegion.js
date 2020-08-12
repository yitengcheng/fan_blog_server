#!/usr/bin/env node

var mongoose = require('mongoose');
mongoose.connect('mongodb://127.0.0.1:27017/spider', { useNewUrlParser: true });

let Region = mongoose.model('Region',
    new mongoose.Schema({
        "PCODE": String,
        "REGIONNAME": String,
        "REGIONCODE": String,
        "leaf": Boolean
    }), 'region'
);

Region.find({}, (err, docs) => {
    if (!err) {
        docs.forEach(doc => {
            doc['leaf'] = doc.REGIONCODE.substring(doc.REGIONCODE.length - 2) !== "00"
            console.log(doc)

            // console.log('doc:', doc)
            doc.save();
        })
    }
})