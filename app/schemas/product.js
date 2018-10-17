var mongoose = require('mongoose');

//定义一个基本的模型，对象类型
var ProductSchema = new mongoose.Schema({
    title: {
        type: String
    },
    price: {
        type: String
    },
    country: {
        type: String
    },
    photo: {
        type: String
    },
    description: {
       type: String
    },
    actors: {
        type: String
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

//每次在存储之前调用，记录创建时间
ProductSchema.pre('save', function (next) {
    if (this.isNew) { //如果是新加的，将新的时间赋值
        this.meta.createAt = this.meta.updateAt = Date.now()
    } else {
        this.meta.updateAt = Date.now()
    }
    next()
});

//添加静态方法，查询数据
ProductSchema.statics = {
    fetch: function (callback) {
        return this.find({}).sort('meta-updateAt').exec(callback)
    },
    findById: function (id, callback) {
        return this.findOne({"_id": id}).exec(callback)
    }
};

module.exports = ProductSchema;
