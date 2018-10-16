var mongoose = require('mongoose');
var ProductSchema = require('../schemas/product.js');
var Product = mongoose.model('Movie',ProductSchema);
module.exports = Product;