var express = require('express');
var mongoose = require('mongoose');
var _ = require('underscore');
var Movie = require('./modals/movie.js');
var User = require('./modals/user.js');
var bodyParser = require("body-parser");
var urlencodedParser = bodyParser.urlencoded({extended: true});
var port = process.env.PORT || 8000;
var app = express();

mongoose.connect("mongodb://localhost:27017/study", {useNewUrlParser: true}, function (err) {
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
app.use(bodyParser.urlencoded({extended: true}));
app.use('/admin', express.static(__dirname + '/public'));//下面三个对应的是三个主页面，调用静态资源的配置
app.use('/movie', express.static(__dirname + '/public'));
app.use('/', express.static(__dirname + '/public'));
app.locals.moment = require('moment');
app.listen(port);

console.log('Http is running at localhost:8000');

//首页
app.get('/', function (req, res) {
    Movie.fetch(function (err, movies) {
        if (err) {
            console.log(err)
        }
        res.render("index", {
            title: "首页",
            movies: movies
        })
    });
});

//详情页
app.get('/movie/:id', function (req, res) {
    var id = req.params.id;
    Movie.findById(id, function (err, movie) {
        res.render("detail", {
            title: "详情页",
            movie: movie
        })
    });
});

//后台录入页
app.get('/admin/movie', function (req, res) {
    res.render('admin', {
        title: '后台录入页',
        movie: [{
            title: "",
            doctor: "",
            language: "",
            photo: "",
            description: "",
            actors: ""
        }]
    })
});

//admin更新电影
app.get('/admin/update/:id', function (req, res) {
    var id = req.params.id;
    if (id) {
        Movie.findById(id, function (err, movie) {
            res.render('admin', {
                title: '后台更新页面',
                movie: movie
            })
        })
    }
});


// admin post movie录入电影
app.post('/admin/movie/new', urlencodedParser, function (req, res) {
    var id = req.body.movie._id;
    var movieObj = req.body.movie;
    var _movie;
    if (id) {
        Movie.findById(id, function (err, movie) {
            if (err) {
                console.log(err)
            }
            _movie = new Movie(_movie); //必须new一个实例，否则save是null
            _movie = _.extend(movie, movieObj);//使用underscore模块，新的对象直接可替换旧的对象
            _movie.save(function (err, movie) {
                if (err) {
                    console.log(err)
                }
                res.redirect('/movie/' + movie._id)
            })
        })
    } else {
        _movie = new Movie({
            title: movieObj.title,
            doctor: movieObj.doctor,
            language: movieObj.language,
            photo: movieObj.photo,
            description:movieObj.description,
            actors: movieObj.actors
        });
        _movie.save(function (err, movie) {
            if (err) {
                console.log(err)
            }
            res.redirect('/movie/' + movie._id)
        })
    }
});

//列表页
app.get('/admin/list', function (req, res) {
    Movie.fetch(function (err, movies) {
        if (err) {
            console.log(err)
        }
        res.render('list', {
            title: '列表页',
            movies: movies
        })
    });
});

//列表页删除功能
app.delete('/admin/list', function (req, res) {
    var id = req.query.id;
    if (id) {
        Movie.deleteOne({_id: id}, function (err, movie) {
            if (err) {
                console.log(err)
            } else {
                res.json({success: 1})
            }
        })
    }
});

//注册处理
app.post('/user/signUp', function (req, res) {
    var _user = req.body.user;
    User.findOne({name: _user.name}, function (err, user) {
        if (user) {//如果已经有user，则该名称已经使用过了，else保存起来就好
            res.json({message: 0,text:"用户名被占用，请更换用户名！"});
        } else {
            var newUser = new User(_user);
            newUser.save(function (err, user) {
                if (err) {
                    console.log(err)
                } else {
                    res.json({message: 1,text:"注册成功！"});
                }
            })
        }
    });
});

//登录处理
app.post('/user/signIn', function (req, res) {
    var _user = req.body.user;
    var name = _user.name;
    var password = _user.password;
    User.findOne({name: name}, function (err, user) {
        if (!user) {
            res.json({message: 2, text: "账号不存在，请先注册！"});
        } else {
            user.comparePassWord(password, function (err, isMatch) {
                if (isMatch) {
                    res.json({message: 1, text: "登录成功！"});
                } else {
                    res.json({message: 0, text: "密码错误！"});
                }
            })
        }
    })
});




