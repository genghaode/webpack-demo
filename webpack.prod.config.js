'use strict';

var path = require('path');
var webpack = require('webpack');
var HtmlWebpackPlugin = require("html-webpack-plugin");
var ExtractTextPlugin = require("extract-text-webpack-plugin");

var publicPath = path.resolve(__dirname, 'build');

var node_modules = path.resolve(__dirname, 'node_modules');
var pathToReact = path.resolve(node_modules, 'react');
var pathToReactDOM = path.resolve(node_modules, 'react-dom');

module.exports = {
  'display-error-details': true,
  entry: {
    index: [
      'babel-polyfill',
      path.resolve(__dirname, 'app/index.js')
    ],
    vendor: ['react', 'react-dom']
  },
  output: {
    path: publicPath,
    filename: "[name].[hash:8].js",
    publicPath: '/'
  },
  resolve: {
    extension: ['', '.jsx', '.js', '.json'],
    alias: {
      'react': pathToReact,
      'react-dom': pathToReactDOM
    }
  },
  module: {
    noParse: [
      path.resolve(node_modules, 'react/dist/react.min.js'),
      path.resolve(node_modules, 'react-dom/dist/react-dom.min.js')
    ],
    loaders: [{
      test: /\.js[x]?$/,
      loaders: ['react-hot', 'babel'],
      exclude: path.resolve(__dirname, 'node_modules')
    }, {
      test: /\.css$/,
      loader: ExtractTextPlugin.extract("style-loader", "css-loader")
    }, {
      test: /\.(png|jpg)$/,
      loader: 'url?limit=8192'
    }, {
      test: /\.(woff|woff2|ttf|svg|eot)(\?v=\d+\.\d+\.\d+)?$/,
      loader: "url?limit=10000"
    }]
  },
  plugins: [
    new ExtractTextPlugin("[name].[hash:8].css", {
      allChunks: true,
      disable: false
    }),
    new webpack.optimize.CommonsChunkPlugin('vendor', 'vendor.[hash:8].js'),
    new HtmlWebpackPlugin({
      title: 'react-demo',
      template: './app/index.html',
      minify: {
        removeComments: true,
        collapseWhitespace: true
      },
      chunks: ['index', 'vendor'],
      inject: 'body'
    }),
    new webpack.optimize.UglifyJsPlugin({
      minimize: true,
      compress: {
        warnings: false
      }
    }),
    new webpack.optimize.MinChunkSizePlugin({
      compress: {
        warnings: false
      }
    }),
    new webpack.optimize.DedupePlugin(),
    new webpack.optimize.OccurenceOrderPlugin(),
    new webpack.optimize.AggressiveMergingPlugin({
      minSizeReduce: 1.5,
      moveToParents: true
    }),
  ]
};
