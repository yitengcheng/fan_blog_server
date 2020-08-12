#!/usr/bin/env node

var schedule = require('node-schedule');
var mongoose = require('mongoose');
mongoose.connect('mongodb://127.0.0.1:27017/spider', { useNewUrlParser: true });
let moment = require('moment');
var https = require('https');
var qs = require('querystring');
var fs = require('fs');
var getJson = require('./utils/getJson.js');

let Weath = mongoose.model('weath',
    new mongoose.Schema({
        "day": String,
        "weather": String,
        "minTemp": String,
        "maxTemp": String,
    })
);

const weathMap = {
    'CLEAR_DAY': '晴（白天）',
    'CLEAR_NIGHT': '晴（夜间）',
    'PARTLY_CLOUDY_DAY': '多云（白天）',
    'PARTLY_CLOUDY_NIGHT': '多云（夜间）',
    'CLOUDY': '阴',
    'WIND': '大风',
    'HAZE': '雾霾',
    'RAIN': '雨',
    'SNOW': '雪',
}
function scheduleCronstyle() {
    schedule.scheduleJob('10 59 * * * *', () => {
        getJson('https://api.caiyunapp.com/v2/dKtU9oM9cf9VxecG/106.6301,26.6476/daily.json?dailysteps=1').then((data) => {
            let { result } = data;
            let { daily } = result;
            let { temperature, skycon } = daily;
            temperature.forEach((item, index) => {
                Weath.findOne({ day: moment(item.date).format('MM-DD') }, (err, doc) => {
                    if (err) {
                        console.log(err.message);
                    } else {
                        if (doc) {
                            doc.maxTemp = item.max;
                            doc.minTemp = item.min;
                            doc.weather = weathMap[skycon[index]['value']];
                            doc.save((err1, doc) => {
                                if (err1) {
                                    console.log(err1.message);
                                }
                            });
                        } else {
                            new Weath({
                                day: moment(item.date).format('MM-DD'),
                                maxTemp: item.max,
                                minTemp: item.min,
                                weather: weathMap[skycon[index]['value']]
                            }).save((err1, doc) => {
                                if (err1) {
                                    console.log(err1.message);
                                }
                            });
                        }
                    }
                });
            });
        });
        const param = qs.stringify({
            'grant_type': 'client_credentials',
            'client_id': 'Viaqd5VoNYD0FzLPCXH5Au6Y',
            'client_secret': 'MK0xtYGFAuKuBF1cQKXkP4TFwW18yH2k'
        });

        https.get(
            {
                hostname: 'aip.baidubce.com',
                path: '/oauth/2.0/token?' + param,
                agent: false
            },
            (res) => {
                res.pipe(fs.createWriteStream('./baidu-token.json'));
            }
        );
    });
}

scheduleCronstyle();