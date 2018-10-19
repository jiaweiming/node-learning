var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var ObjectId = Schema.Types.ObjectId; //默认的id中间件

//定义评价基本的模型，评论的主体、来自谁、发送给谁、内容四个板块
var CategorySchema = new Schema({
    name: {
        type: String
    },
    movies: [
        {type: ObjectId, ref: "Movie"}
    ],
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
CategorySchema.pre('save', function (next) {
    if (this.isNew) { //如果是新加的，将新的时间赋值
        this.meta.createAt = this.meta.updateAt = Date.now()
    } else {
        this.meta.updateAt = Date.now()
    }
    next()
});

//添加静态方法，查询数据
CategorySchema.statics = {
    fetch: function (callback) {
        return this.find({}).sort('meta-updateAt').exec(callback)
    },
    findById: function (id, callback) {
        return this.findOne({"_id": id}).exec(callback)
    }
};

module.exports = CategorySchema;
