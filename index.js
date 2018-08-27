var express = require('express');
var port = process.env.PORT || 8000;
var app = express();

app.set('views', './views/pages');
app.set('view engine', 'pug');
app.listen(port);

console.log('Http is running at localhost:3000');

app.get('/', function (req, res) {
    res.render('index', {
        title: "首页"
    })
});

app.get('/movie/:id', function (req, res) {
    res.render('detail', {
        title: '详情页'
    })
});

app.get('/admin/movie', function (req, res) {
    res.render('admin', {
        title: '后台'
    })
});

app.get('/admin/list', function (req, res) {
    res.render('list', {
        title: '列表页'
    })
});




