const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');

module.exports = {
    entry: './src/index.js',
    module: {
        rules: [
            {
                test: /\.css$/,
                use: [(process.env.NODE_ENV === "production" ? 'style-loader' : MiniCssExtractPlugin.loader), 'css-loader']
            },
            {test: /\.(js)$/, use: 'babel-loader'}
        ]
    },
    output: {
        path: path.resolve(__dirname, 'dist'),
        filename: '[name].[contenthash].js'
    },
    plugins: [
        new HtmlWebpackPlugin(),
        new MiniCssExtractPlugin({
            filename: '[name].[contenthash].css'
        }),
    ],
    mode: process.env.NODE_ENV === "production" ? "production" : "development",
    devServer: {
        hot: true,
        open: true,
        compress: true,
        contentBase: '/dist/',
        disableHostCheck: true,
        historyApiFallback: true,
        watchOptions: {
            poll: 1000,
        },
    },
}