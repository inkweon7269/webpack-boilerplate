const path = require('path');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
    entry: {
        'hello-world': './src/hello-world.js',
        'kiwi': './src/kiwi.js',
    },
    output: {
        filename: "[name].[contenthash].js",
        path: path.resolve(__dirname, './dist'),
        publicPath: ""
    },
    mode: 'production',
    optimization: {
        splitChunks: {
            chunks: "all",
            minSize: 300,
        }
    },
    module: {
        rules: [
            {
                test: /\.(png|jpg)$/,
                type: 'asset',
                parser: {
                    dataUrlCondition: {
                        maxSize: 3 * 1024
                    }
                }
            },
            {
                test: /\.txt/,
                type: 'asset/source'
            },
            {
                test: /\.css$/,
                use: [
                    MiniCssExtractPlugin.loader, 'css-loader',
                ]
            },
            {
                test: /\.scss$/,
                use: [
                    MiniCssExtractPlugin.loader, 'css-loader', 'sass-loader',
                ]
            },
            {
                test: /\.js$/,
                exclude: /node_modules/,
                use: {
                    loader: 'babel-loader',
                    options: {
                        presets: ['@babel/env'],
                    }
                }
            },
            {
                test: /\.hbs$/,
                use: [
                    'handlebars-loader'
                ]
            }
        ]
    },
    plugins: [

        new MiniCssExtractPlugin({
            filename: '[name].[contenthash].css'
        }),
        new CleanWebpackPlugin(),
        new HtmlWebpackPlugin({
            // filename: 'subfolder/custom_filename.html',
            template: "src/page-template.hbs",
            chunks: ['hello-world'],
            filename: 'hello-world.html',
            title: 'hello-world',
            description: 'hello-world',
            minify: false,
        }),
        new HtmlWebpackPlugin({
            // filename: 'subfolder/custom_filename.html',
            template: "src/page-template.hbs",
            chunks: ['kiwi'],
            filename: 'kiwi.html',
            title: 'Kiwi',
            description: 'Kiwi',
            minify: false,
        }),
    ]
}