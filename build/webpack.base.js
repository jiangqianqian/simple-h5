var path = require('path');
var fs = require('fs');
var webpack = require('webpack');
var HtmlWebpackPlugin = require('html-webpack-plugin');
var ExtractTextPlugin = require('extract-text-webpack-plugin');
var CopyWebpackPlugin = require('copy-webpack-plugin');

var config = {
  entry: {
    app: [
      // 'webpack/hot/dev-server',
      path.resolve('./src/app.js')
    ],
    test: [
      // 'webpack/hot/dev-server',
      path.resolve('./src/test.js')
    ]
  },
  output: {
    path: path.resolve(__dirname, '../my2017'),
    filename: 'assets/js/[name]-[hash:8].js',
    // publicPath: './'
  },
  module: {
    rules: [
    {
      test: /\.html$/,
      use: ['coala-dot-loader']
    },
    {
      test: /\.css$/,
      // use: ['style-loader', 'css-loader']
      use: ExtractTextPlugin.extract({
        fallback: 'style-loader',
        use: 'css-loader',
        publicPath: '../../'
      })
    },
    {
      test: /\.(png|jpg|gif)$/,
      use: 'file-loader?name=assets/img/[name]-[hash:8].[ext]'
    },
    {
      test: /\.ttf\??.*$/,
      use: 'file-loader?name=assets/font/[name]-[hash:8].[ext]&minetype=application/octet-stream'
    },
    {
      test: /\.eot\??.*$/,
      use: 'file-loader?name=assets/font/[name]-[hash:8].[ext]'
    },
    {
      test: /\.svg\??.*$/,
      use: 'file-loader?name=assets/font/[name]-[hash:8].[ext]&minetype=image/svg+xml'
    },
    {
      test: /\.(woff|woff2)\??.*$/,
      use: 'file-loader?name=assets/font/[name]-[hash:8].[ext]&minetype=application/font-woff'
    }]
  }
  ,plugins: [
    new ExtractTextPlugin({
      filename: 'assets/css/[name]-[hash:8].css'
    }),
    new CopyWebpackPlugin([
      { from: 'src/assets/img', to: 'assets/img' }
    ]),
    new webpack.optimize.CommonsChunkPlugin({
      name: 'common',
      minChunks: 2
    }),
    new HtmlWebpackPlugin({
      filename: 'index.html',
      template: 'src/template.html',
      minify: {
        removeComments: true,
        collapseWhitespace: true
      }
    })
  ]
};

module.exports = config;
