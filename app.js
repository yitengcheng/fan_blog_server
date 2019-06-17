var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var ejs = require('ejs');
var multer = require('multer');
var storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, './public/uploads');
    },
    filename: function (req, file, cb) {
        cb(null, file.originalname);
    }
});
const upload = multer({ storage: storage });


var apiRouter = require('./routes/index');

var app = express();
app.use(upload.single('image'));
let mongoose = require('mongoose');
// 连接数据库
mongoose.connect('mongodb://127.0.0.1:27017/spider', { useNewUrlParser: true });
mongoose.connection.on('connected', () => {
    console.log('MongoDB connected success');
});
mongoose.connection.on('error', () => {
    console.log('MongoDB connected fail');
});
mongoose.connection.on('disconnected', () => {
    console.log('MongoDB connected fail');
});

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.engine('.html', ejs.__express);
app.set('view engine', 'html');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
app.post('/api/upload', (req, res) => {
    res.json({
        success: true,
        url: '/uploads/' + req.file.originalname
    })
});

app.use('/api', apiRouter);

// catch 404 and forward to error handler
app.use(function (req, res, next) {
    next(createError(404));
});

// error handler
app.use(function (err, req, res, next) {
    // set locals, only providing error in development
    res.locals.message = err.message;
    res.locals.error = req.app.get('env') === 'development' ? err : {};

    // render the error page
    res.status(err.status || 500);
    res.render('error');
});

module.exports = app;
