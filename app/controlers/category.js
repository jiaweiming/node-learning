var Category = require('../modals/category');

exports.typeIn = function (req, res) {  //录入页
    res.render('categoryAdmin', {
        title: 'Category Type-In',
        category:{}
    })
};


exports.save = function (req, res) {  //创建分类
    var _category = req.body.category;
    var category = new Category(_category);
    category.save(function (err, categories) {
        res.redirect('/admin/categoryList')
    })
};

exports.list = function (req, res) {
    Category.fetch(function (err, categories) {
        res.render('categoryList', {
            title: '分类页',
            categories: categories
        })
    })
};
