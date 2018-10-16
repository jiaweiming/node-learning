var Product = require('../modals/product.js');
exports.index = function (req, res) {
    Product.fetch(function (err, movies) {
        if (err) {
            console.log(err)
        }
        res.render("index", {
            title: "Home",
            movies: movies
        })
    });
};
