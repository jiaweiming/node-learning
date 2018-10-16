var Comment = require('../modals/comment');
exports.save = function (req, res) {
    var _comment = req.body.comment;
    var movieId = req.body.content.product;
    var comment = new Comment(_comment);
    comment.save(function (err, comment) {
        if (err) {
            console.log(err)
        }
        res.redirect('/movie/' + movieId);
    })

};