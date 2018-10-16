var _ = require('underscore');
var Product = require('../modals/product');
var Comment = require('../modals/comment');

exports.typeIn = function (req, res) {  //录入页
    res.render('admin', {
        title: 'Admin Type-In',
        movie: [{
            title: "",
            price: "",
            language: "",
            photo: "",
            description: "",
            actors: ""
        }]
    })
};

exports.update = function (req, res) {  //更新商品
    var id = req.params.id;
    if (id) {
        Product.findById(id, function (err, movie) {
            res.render('update', {
                title: 'Admin Update',
                movie: movie
            })
        })
    }
};

exports.createProduct = function (req, res) {  //创建商品
    var id = req.body.movie._id;
    var productObj = req.body.movie;
    var product;
    if (id) {
        Product.findById(id, function (err, movie) {
            if (err) {
                console.log(err)
            }
            product = new Product(product); //必须new一个实例，否则save是null
            product = _.extend(movie, productObj);//使用underscore模块，新的对象直接可替换旧的对象
            product.save(function (err, movie) {
                if (err) {
                    console.log(err)
                }
                res.redirect('/movie/' + movie._id)
            })
        })
    } else {
        product = new Product({
            title: productObj.title,
            price: productObj.price,
            country: productObj.country,
            photo: productObj.photo,
            description: productObj.description,
            actors: productObj.actors
        });
        product.save(function (err, movie) {
            if (err) {
                console.log(err)
            }
            res.redirect('/movie/' + movie._id)
        })
    }
};

exports.productList = function (req, res) {  //列表页
    Product.fetch(function (err, movies) {
        if (err) {
            console.log(err)
        }
        res.render('list', {
            title: 'List',
            movies: movies
        })
    });
};

exports.deleteList = function (req, res) {  //列表页删除功能
    var id = req.query.id;
    if (id) {
        Product.deleteOne({_id: id}, function (err, movie) {
            if (err) {
                console.log(err)
            } else {
                res.json({success: 1})
            }
        })
    }
};

exports.detail = function (req, res) {  //详情页
    var id = req.params.id;
    Product.findById(id, function (err, movie) {
        Comment.find({movie: id}, function (err, comments) {
            console.log(comments);
            console.log(movie);
            res.render("detail", {
                title: "Product",
                movie: movie,
                comments: comments
            })
        })
    });
};