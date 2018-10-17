var Comment = require('../modals/comment');
exports.save = function (req, res) {
    var _comment = req.body.comment;
    var movieId = _comment.product;
    if (_comment.id) {
        Comment.findById(_comment.id, function (err, comment) {
            var reply = {
                from: _comment.from,
                to: _comment.Toid,
                content: _comment.content
            };
            comment.reply.push(reply);
            comment.save(function (err, comment) {
                if (err) {
                    console.log(err)
                }
                console.log(comment);
                res.redirect('/movie/' + movieId);
            })
        })
    }else{
        var comment = new Comment(_comment);
        comment.save(function (err, comment) {
            if (err) {
                console.log(err)
            }
            console.log(comment);
            res.redirect('/movie/' + movieId);
        })
    }
};