const path = require('path');
const uglify = require('uglifyjs-webpack-plugin');
const htmlWebpackPlugin = require("html-webpack-plugin");
const extractTextPlugin = require("extract-text-webpack-plugin");

module.exports = {
    mode: "development",
    entry: {
        main: "./index.js"
    },
    output: {
        path: path.resolve(__dirname, "../dist"),
        filename: "bundle.js",
        publicPath: "http://localhost:8000/"
    },
    module: {
        rules: [
            {test: /\.css$/,use:[{loader:"style-loader"},{loader: "css-loader"}]},
            {test: /\.(png|jpg|gif|jpeg|ico|svg)/, use: [{loader: "url-loader", options: {limit: 8192,outputPath: 'images/', publicPath : '/images'}}]},
            {test: /\.pug$/, use: ["pug-loader"]},
            {test: /\.(js|jsx)$/,use:{loader: "babel-loader"}, exclude:/node_modules/}]
    },
    plugins: [
        new uglify(),  //gzip压缩
        new htmlWebpackPlugin({   //HTML模板
            minify: {removeAttributeQuotes: true},
            hash: true,
            template: "./layout.pug" //使用一个loader，把HTML模板图片也加入打包
        }),
        new extractTextPlugin("main.css")   //单独分离到css文件夹下
    ],
    devServer: {   //开发模式启动本地服务器
        contentBase: path.resolve(__dirname, "../dist"),
        host: "localhost",
        port: 8888,
        compress: true,
        open:true
    }
};