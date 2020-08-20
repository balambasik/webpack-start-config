const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const {CleanWebpackPlugin} = require('clean-webpack-plugin');
const webpack = require("webpack");

module.exports = {
    entry: './src/index.js',
    module: {
        rules: [
            {
                test: /\.(css|less)$/,
                use: [(process.env.NODE_ENV === "production" ? 'style-loader' : MiniCssExtractPlugin.loader), 'css-loader', 'less-loader']
            },
            {
                test: /\.m?js$/,
                exclude: /(node_modules|bower_components)/,
                use: {
                    loader: 'babel-loader',
                    options: {
                        presets: ['@babel/preset-env']
                    }
                }
            }
        ]
    },
    output: {
        path: path.resolve(__dirname, 'dist'),
        filename: '[name].[contenthash].js',
        publicPath:'/'
    },
    plugins: [
        new HtmlWebpackPlugin({
            filename: 'index.html',
            template: 'src/index.html'
        }),
        new MiniCssExtractPlugin({
            filename: '[name].[contenthash].css'
        }),
        new CleanWebpackPlugin(),
        // new webpack.ProvidePlugin({
        //     $: "jquery/dist/jquery.min.js",
        //     jQuery: "jquery/dist/jquery.min.js",
        //     "window.jQuery": "jquery/dist/jquery.min.js"
        // })
    ],
    mode: process.env.NODE_ENV !== "development" ? "production" : "development",
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