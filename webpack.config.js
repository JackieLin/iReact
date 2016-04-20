/**
 * @author jackie Lin <dashi_lin@163.com>
 * webpack 主要配置
 */
'use strict';
var path = require('path');
var webpack = require('webpack');

var prop = process.argv.indexOf('--pro') >= 0;

module.exports = {
    // 上下文
    context: __dirname,
    entry: {
        iReact: './src/app'
        // test: 'mocha!./test/test'
    },
    module: {
        loaders: [{
            test: /\.js?$/,
            exclude: /node_modules/,
            loader: 'babel',
            query: {
                presets: ['react', 'es2015']
            }
        }]
    },

    resolve: {
        extensions: ['', '.js', '.jsx']
    },

    output: {
        libraryTarget: 'umd',
        path: __dirname + "/dist",
        filename: prop ? "[name].min.js": "[name].js"
    },
    
    plugins: prop ? [
        new webpack.optimize.UglifyJsPlugin({
            compress: {
                warnings: false
            }
        })
    ]: [],

    externals: {
        'react': 'react',
        'react-dom': 'react-dom',
        'mocha': 'mocha'
    }
};
