var mongoose = require('mongoose');
var bcript = require('bcrypt-nodejs');
var SALT_WORK_FACTORY = 10;

//定义用户名和密码----模型
var UserSchema = new mongoose.Schema({
    name: {
        type: String,
        unique: true
    },
    password: {
        type: String,
        unique: true
    },
    meta: {
        createAt: {
            type: Date,
            default: Date.now()
        },
        updateAt: {
            type: Date,
            default: Date.now()
        }
    }
});

UserSchema.pre('save', function (next) {//添加登录注册，密码加盐加密
    var user = this;
    if (this.isNew) {
        this.meta.createAt = this.meta.updateAt = Date.now()
    } else {
        this.meta.updateAt = Date.now()
    }
    bcript.genSalt(SALT_WORK_FACTORY, function (err, salt) {
        if (err) {
            return next(err)
        } else {
            bcript.hash(user.password, salt, null, function (err, hash) {
                if (err) {
                    return next(err)
                } else {
                    user.password = hash;
                    next()
                }
            })
        }
    });
});

UserSchema.methods = {//实例方法
    comparePassWord: function (_password, callback) {
        bcript.compare(_password, this.password, function (err, isMatch) {
            if (err) {
                callback(err)
            } else {
                callback(null, isMatch)
            }
        })
    }
};

//模型方法---添加查询用户和密码
UserSchema.statics = {
    fetch: function (callback) {
        return this.find({}).sort('meta-updateAt').exec(callback)
    },
    findById: function (id, callback) {
        return this.findOne({"_id": id}).exec(callback)
    }
};
module.exports = UserSchema;