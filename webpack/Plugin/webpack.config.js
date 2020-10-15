const path = require('path');
// const SyncDonePlugin = require('./plugins/SyncDonePlugin.js');
// const AsyncDonePlugin = require('./plugins/AsyncDonePlugin.js');
// const AssetsPlugin = require('./plugins/AssetsPlugin.js');
const ZipPlugin = require('./plugins/ZipPlugin.js');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const AutoExternalPlugin = require('./plugins/AutoExternalPlugin.js');
const HashPlugin = require('./plugins/HashPlugin.js');

module.exports = {
  mode: 'development',
  devtool: false,
  entry: {
    page1: './src/page1.js',
    page2: './src/page2.js',
  },
  output: {
    hashSalt: 'rskmin',
    path: path.resolve(__dirname, 'dist'),
    filename: '[name].[contenthash]js',
  },
  // 外部引入
  // externals: {
  //   // key 是模块名称 值是 window 上的全局变量
  //   'jquery': '$',
  // },
  plugins: [
    // new SyncDonePlugin(),
    // new AsyncDonePlugin(),
    // new AssetsPlugin(),
    // new ZipPlugin({
    //   filename: 'assets.zip',
    // }),
    new HtmlWebpackPlugin({
      template: './public/index.html',
    }),
    // new AutoExternalPlugin({
    //   jquery: {
    //     variable: '$',
    //     url: 'https://lib.baomitu.com/jquery/3.1.0/jquery.js'
    //   },
    //   lodash: {
    //     variable: '_',
    //     u
    //     rl: 'https://lib.baomitu.com/lodash.js/4.17.19/lodash.js',
    //   },
    // }),
    // new HashPlugin(),
  ],
}