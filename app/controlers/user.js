var User = require('../modals/user.js');
exports.signUp =  function (req, res) {
    var _user = req.body.user;
    User.findOne({name: _user.name}, function (err, user) {
        if (user) {
            res.json({message: 0, text: "Name Exist，Try A New One！"});
        } else {
            var newUser = new User(_user);
            newUser.save(function (err, user) {
                if (err) {
                    console.log(err)
                } else {
                    res.json({message: 1, text: "SignUp Successfully！"});
                }
            })
        }
    });
};

exports.signIn =  function (req, res) {
    var _user = req.body.user;
    var name = _user.name;
    var password = _user.password;
    User.findOne({name: name}, function (err, user) {
        if (!user) {
            res.json({message: 2, text: "Name Is Not Exist ，Please Register First！"});
        } else {
            user.comparePassWord(password, function (err, isMatch) {
                if (isMatch) {
                    req.session.user = user;
                    res.json({message: 1, text: "SignIn Successfully！"});
                } else {
                    res.json({message: 0, text: "Password Is Not Correct！"});
                }
            })
        }
    })
};
