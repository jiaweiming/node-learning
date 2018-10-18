var Index = require('../app/controlers/index');
var Product = require('../app/controlers/product');
var User = require('../app/controlers/user');
var Comment = require('../app/controlers/comment');
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

//下面的是跟商品相关的路由
    app.get('/', Index.index);
    app.get('/movie/:id', Product.detail);
    app.get('/admin/movie', Product.typeIn);
    app.get('/admin/update/:id', Product.update);
    app.post('/admin/product/new', urlencodedParser, Product.createProduct);
    app.get('/admin/list', Product.productList);
    app.delete('/admin/list', Product.deleteList);

//下面的是user相关的路由
    app.post('/user/signUp', User.signUp);
    app.post('/user/signIn', User.signIn);
    app.get('/account', User.account);
    app.get('/logout', function (req, res) {
        delete req.session.user;
        delete app.locals.user;//此处按理是不需要删除的，session为空时，本地APP肯定也为空，两次是为了刷新当前页面而已
        return res.redirect('/')
    });

//下面是评价相关的路由
    app.post('/user/comment', Comment.save);

//下面的是搜索逻辑
    app.get('/search', Product.search)
};