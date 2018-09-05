var path = require('path');
var HtmlWebpackPlugin = require('html-webpack-plugin');
var uglify = require('uglifyjs-webpack-plugin');
var CopyWebpackPlugin = require('copy-webpack-plugin');

// 拼接我们的工作区路径为一个绝对路径
function resolve(dir) {
    return path.join(__dirname, dir);
}

module.exports = {
    devtool: '#cheap-module-eval-source-map',
    entry: {
        'pc': './src/example/pc.js',
    },
    output: {
        // 编译输出的根路径
        path: resolve('dist/example'),
        // 编译输出的文件名
        filename: '[name].min.js',
    },
    resolve: {
        // 自动补全的扩展名
        extensions: ['.js'],
        modules: [
            resolve('src'),
            resolve('node_modules')
        ]
    },
    module: {
        rules: [{
            test: /\.js$/,
            loader: 'babel-loader',
            include: [resolve('src'), resolve('test')]
        }, {
            test: /\.css$/,
            use: ['style-loader', 'css-loader']
        }]
    },
    plugins: [
        new HtmlWebpackPlugin({
            filename: 'pc.html',
            template: resolve('src/example/pc.html'),
            chunks: ['pc'],
            inject: true 
        }),
        new CopyWebpackPlugin([{
            from: resolve('src/example/img'),
            to: resolve('dist/example/img/')
        }]),
        new uglify()
    ]
}