const path = require('path');
const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');

const isDev = process.env.NODE_ENV === 'dev';

const config = {
    entry: {
        app: path.join(__dirname, 'app/index.js')
    },

    output : {
        path: path.join(__dirname, '/dist'),
        filename : '[name].js',
        publicPath: "/public"
    },

    plugins: [
        new HtmlWebpackPlugin({
            template: './app/index.tpl.html',
            inject: 'body',
            filename: './index.html'
        }),
    ],

    module: {

        loaders: [
            {
                test: /\.js$/,
                exclude: /node_modules/,
                loader: "babel-loader",
            },
            {
                test: /\.jsx$/,
                loader: 'babel-loader',
            },
            {
                test: /\.json?$/,
                loader: 'json'
            },
            {
                test: /\.css$/,
                loader: "style-loader!css-loader"
            },
            {
                test: /\.less$/,
                loader: 'style-loader!css-loader!less-loader'
            },
            {
                test: /\.(png|jpg|gif|svg)$/,
                loader: "file-loader",
                options: {
                    name: '[name].[ext]?[hash]'
                }
             }
        ]
    }
}

if(isDev){
    config.entry = {
        app : [
            "react-hot-loader/patch",
            path.join(__dirname, 'app/index.js')
        ]
    }
    config.devServer = {
        host: '0.0.0.0',   //绑定host
        port: '8888',
        contentBase: path.join(__dirname, './dist'), //在dist目录下启动整个dev-server的服务
        hot: true,
        overlay: { //页面显示错误
            errors: true,
        },

        publicPath: '/public',
        historyApiFallback: {
            index: '/public/index.html'
        },
    }
    config.plugins.push(
        new webpack.HotModuleReplacementPlugin()
    )
}



module.exports = config;