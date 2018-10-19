var mongoose = require('mongoose');
var CategorySchema = require('../schemas/category.js');
var Category = mongoose.model('Comment',CategorySchema);
module.exports = Category;