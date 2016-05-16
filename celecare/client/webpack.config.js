"use strict";

module.exports = {
    entry: {
        index: './src/js/index.js',
        weather: './src/js/weather.js',
        express: ['babel-polyfill', './src/js/express.js']
    },

    output: {
        filename: './dist/[name].js' // 输出文件的名称
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
