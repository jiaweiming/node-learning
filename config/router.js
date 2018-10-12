var _ = require('underscore');
var Movie = require('../modals/movie.js');
var User = require('../modals/user.js');
var bodyParser = require("body-parser");
var urlencodedParser = bodyParser.urlencoded({extended: true});

module.exports = function (app) {
    //如果有用户登录，则存入会话中---全局
    app.use(function (req, res, next) {
        var _user = req.session.user;
        if (_user) {
            app.locals.user = _user;
            next()
        } else {
            return next()
        }
    });

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
                res.render('update', {
                    title: '后台更新页',
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
                description: movieObj.description,
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
                res.json({message: 0, text: "用户名被占用，请更换用户名！"});
            } else {
                var newUser = new User(_user);
                newUser.save(function (err, user) {
                    if (err) {
                        console.log(err)
                    } else {
                        res.json({message: 1, text: "注册成功！"});
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
                        req.session.user = user;
                        res.json({message: 1, text: "登录成功！"});
                    } else {
                        res.json({message: 0, text: "密码错误！"});
                    }
                })
            }
        })
    });

    app.get('/logout', function (req, res) {
        delete req.session.user;
        delete app.locals.user;//此处按理是不需要删除的，session为空时，本地APP肯定也为空，
        return res.redirect('/')//删除两次是为了刷新当前页面而已
    });
};