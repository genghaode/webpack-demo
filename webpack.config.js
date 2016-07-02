var path = require('path');
var webpack = require('webpack');
var OpenBrowserPlugin = require('open-browser-webpack-plugin');
var HtmlWebpackPlugin = require("html-webpack-plugin");
var ExtractTextPlugin = require("extract-text-webpack-plugin");

var publicPath = path.resolve(__dirname, 'build');

var node_modules = path.resolve(__dirname, 'node_modules');
var pathToReact = path.resolve(node_modules, 'react');
var pathToReactDOM = path.resolve(node_modules, 'react-dom');

module.exports = {
  devServer: {
    historyApiFallback: true,
    hot: true,
    inline: true,
    contentBase: './build',
    port: 8080,
    stats: { colors: true },
    proxy: [{
      path: /^\/api\/(.*)/,
      target: 'http://localhost:8080',
      rewrite: rewriteUrl('/$1\.json'),
      changeOrigin: true
    }]
  },
  devtool: 'source-map',
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
    new webpack.HotModuleReplacementPlugin(),
    new webpack.NoErrorsPlugin(),
    new webpack.optimize.CommonsChunkPlugin('vendor', 'vendor.[hash:8].js'),
    new HtmlWebpackPlugin({
      title: 'react-demo',
      template: './app/index.html',
      chunks: ['index', 'vendor'],
      inject: 'body'
    }),
    new OpenBrowserPlugin({ url: 'http://localhost:8080' }),
    new ExtractTextPlugin('[name].[hash:8].css', {
      allChunks: true,
      disable: false
    })
  ]
};

function rewriteUrl(replacePath) {
  return function(req, opt) {
    var queryIndex = req.url.indexOf('?');
    var query = queryIndex >= 0 ? req.url.substr(queryIndex) : '';
    req.url = req.path.replace(opt.path, replacePath) + query;
  }
}
