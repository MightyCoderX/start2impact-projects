const path = require('path');
const Dotenv = require('dotenv-webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
    mode: 'development',
    entry: './src/app.js',
    devServer: {
        static: {
            directory: './dist/' 
        }
    },
    module: {
        rules: [
            {
                test: /\.html$/i,
                loader: 'html-loader',
            },
            {
                test: /\.file.js$/i,
                type: 'asset/resource',
            },
            {
                test: /\.file.css$/i,
                type: "asset/resource",
            }
        ],
    },
    plugins: [
        new Dotenv({
            ignoreStub: true
        }),
        new HtmlWebpackPlugin({
            template: 'src/index.html'
        })
    ],
    output: {
        filename: 'bundle.js',
        path: path.resolve(__dirname, 'dist')
    }
}