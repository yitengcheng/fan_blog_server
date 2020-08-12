let express = require('express');
let router = express.Router();
let Region = require('../../../models/region.js');

router.post('/', (req, res, next) => {
    let { pcode } = req.body;
    Region.find({ PCODE: pcode || "" }).exec((err, docs) => {
        if (err) {
            res.json({
                success: false,
                msg: err.message
            })
        } else {
            let regions = [];
            docs.forEach(item => {
                regions.push({
                    value: item.REGIONCODE,
                    pcode: item.PCODE,
                    label: item.REGIONNAME,
                    leaf: item.leaf
                })
            })
            res.json({
                success: true,
                regions
            })
        }
    })
})

module.exports = router