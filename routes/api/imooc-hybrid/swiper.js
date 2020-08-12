let express = require('express');
let router = express.Router();

router.post('/', async (req, res, next) => {
    res.json({
        success: true,
        swiperImgs: [
            { id: 1, icon: 'swiper-1.jpg' },
            { id: 2, icon: 'swiper-2.jpg' },
            { id: 3, icon: 'swiper-3.jpg' },
            { id: 4, icon: 'swiper-4.jpg' },
            { id: 5, icon: 'swiper-5.jpg' },
            { id: 6, icon: 'swiper-6.jpg' },
            { id: 7, icon: 'swiper-7.jpg' },
            { id: 8, icon: 'swiper-8.jpg' }
        ]
    });

});

module.exports = router