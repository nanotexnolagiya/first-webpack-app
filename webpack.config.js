const path = require('path');
const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const merge = require('webpack-merge');
const devserver = require('./webpack/dev-server');
const pug = require('./webpack/pug');
const sass = require('./webpack/sass');
const css = require('./webpack/css');
const extractCSS = require('./webpack/css.extract');
const uglifyJS = require('./webpack/js.uglify');
const images = require('./webpack/images');

const PATH = {
    source: path.join(__dirname, '/source'),
    build: path.join(__dirname, 'build')
};

const common = merge([
    {
        entry: {
            'index': PATH.source + '/pages/index/index.js',
            'blog': PATH.source + '/pages/blog/blog.js'
        },
        output: {
            path: PATH.build,
            filename: 'js/[name].js'
        },
        plugins: [
            new HtmlWebpackPlugin({
                filename: 'index.html',
                chunks: ['index', 'common'],
                template: PATH.source + '/pages/index/index.pug'
            }),
            new HtmlWebpackPlugin({
                filename: 'blog.html',
                chunks: ['blog', 'common'],
                template: PATH.source + '/pages/blog/blog.pug'
            }),
            new webpack.optimize.CommonsChunkPlugin({
                name: 'common'
            }),
            new webpack.ProvidePlugin({
                $: 'jquery',
                jQuery: 'jquery'
            })
        ]
    },
    pug(),
    images()
]);

module.exports = function (env) {
    if(env === 'prod'){
        return merge([
            common,
            extractCSS(),
            uglifyJS()
        ]);
    }
    if(env === 'dev'){
        return merge([
            common,
            devserver(),
            sass(),
            css()
        ]);
    }
};