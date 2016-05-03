"use strict";
var path = require('path');

module.exports = {
    entry: './src/js/main.js',

    output: {
        path: path.join(__dirname,'dist'),
        filename: 'bundle.js' // 输出文件的名称
    },
    module: {
        loaders: [
            {
                test: /\.jsx?$/,
                exclude: /(node_modules|bower_components)/,
                loader: 'babel', // 'babel-loader' is also a legal name to reference
                query: {
                    presets: ['es2015']
                }
            },
            {
                test: /\.scss$/,
                loaders: ["style", "css", "sass"]
            },
            {
                test: /\.css$/,
                loader: 'css-loader!autoprefixer-loader?browsers=last 2 versions'
            }
        ]
    }
};