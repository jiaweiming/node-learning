var express = require('express');
var mongoose = require('mongoose');
var cookieParser = require('cookie-parser');
var session = require('express-session');
var mongoStore = require('connect-mongo')(session);
var bodyParser = require("body-parser");
var port = process.env.PORT || 8000;
var app = express();
var dbUrl = "mongodb://localhost:27017/study";

mongoose.connect(dbUrl, {useNewUrlParser: true}, function (err) {
    if (err) {
        console.log('Connection Error:' + err)
    } else {
        console.log('Connect successfully!')
    }
});

app.set('views', './views/pages');
app.set('view engine', 'pug');
mongoose.set('useCreateIndex', true);//去除warning
app.use(bodyParser.json());
app.use(cookieParser());//session依赖cookie中间件，两个需要单独安装
app.use(session({
    secret: 'study',
    store: new mongoStore({
        url: dbUrl,
        collection: 'sessions'
    }),
    resave: false,
    saveUninitialized: false
}));
app.use(bodyParser.urlencoded({extended: true}));
app.use('/admin', express.static(__dirname + '/public'));//下面三个对应的是三个主页面，调用静态资源的配置
app.use('/movie', express.static(__dirname + '/public'));
app.use('/', express.static(__dirname + '/public'));
app.use('/admin/update', express.static(__dirname + '/public'));
app.locals.moment = require('moment');
app.listen(port);

console.log('Http is running at localhost:8000');

require('./config/router.js')(app); //将路由和请求配置的文件抽离到config里




