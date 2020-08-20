const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const {CleanWebpackPlugin} = require('clean-webpack-plugin');
const webpack = require("webpack");
const VueLoaderPlugin = require('vue-loader/lib/plugin')

const isProd = process.env.NODE_ENV || false;


module.exports = {
    entry: './src/index.js',
    optimization: {
        splitChunks: {
            cacheGroups: {
                vendors: {
                    priority: -10,
                    test: /[\\/]node_modules[\\/]/,
                    enforce: true
                },
            },
            // concatenateModules: false,
            chunks: 'all',
            minChunks: 1,
            minSize: 0,
            name: "vendor"
        }
    },
    module: {
        rules: [
            {
                test: /\.(css|less)$/,
                use: [(!isProd ? 'style-loader' : MiniCssExtractPlugin.loader), 'css-loader', 'less-loader']
            },
            {
                test: /\.js$/,
                exclude: /(node_modules|bower_components)/,
                use: {
                    loader: 'babel-loader',
                    options: {
                        presets: ['@babel/preset-env']
                    }
                }
            },
            {
                test: /\.vue$/,
                loader: 'vue-loader'
            }
        ]
    },
    output: {
        path: path.resolve(__dirname, 'dist'),
        filename: '[name].js',
        publicPath: '/'
    },
    plugins: [
        new VueLoaderPlugin(),
        new HtmlWebpackPlugin({
            filename: 'index.html',
            template: 'src/index.html'
        }),
        new MiniCssExtractPlugin({
            filename: '[name].css'
        }),
        new CleanWebpackPlugin(),
        // new webpack.ProvidePlugin({
        //     $: "jquery/dist/jquery.min.js",
        //     jQuery: "jquery/dist/jquery.min.js",
        //     "window.jQuery": "jquery/dist/jquery.min.js"
        // })
    ],
    mode: isProd ? "production" : "development",
    resolve: {
        alias: {
            vue: 'vue/dist/vue.esm.js'}
        },
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