#!/usr/bin/env node

var schedule = require('node-schedule');
var http = require('http');
var mongoose = require('mongoose');
mongoose.connect('mongodb://127.0.0.1:27017/spider', { useNewUrlParser: true });
let moment = require('moment');

let Weath = mongoose.model('weath',
    new mongoose.Schema({
        "day": String,
        "weather": String,
        "minTemp": String,
        "maxTemp": String,
    })
);

function scheduleCronstyle() {
    schedule.scheduleJob('1 1 1 * * *', () => {
        getCityData('http://www.weather.com.cn/data/cityinfo/101260101.html').then((data) => {
            new Weath({
                day: moment().format('MM-DD'),
                weather: data.weatherinfo.weather,
                minTemp: data.weatherinfo.temp1,
                maxTemp: data.weatherinfo.temp2,
            }).save((err, doc) => {
                if (err) {
                    console.log(err.message);
                }
            });
        });
    });
}

function getCityData(url) {
    var pm = new Promise((resolve, reject) => {
        http.get(url, function (res) {//通过上面传过来的url来获取该天气信息的数据
            var jsonData = '';

            res.on("data", function (data) {
                jsonData += data.toString('utf8');//保存天气信息的数据
            })
            res.on("end", function () {
                jsonData = JSON.parse(jsonData);//因为获取到的天气信息数据是JSON格式的，通过JSON.parse函数进行解析，得到一个对象
                resolve(jsonData);
            }).on('error', function (e) {
                reject(e)
            });
        });
    });

    return pm;
}

scheduleCronstyle();