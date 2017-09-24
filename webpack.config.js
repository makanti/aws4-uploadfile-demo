const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const HtmlWebpackPluginConfig = new HtmlWebpackPlugin({
  template: './index.html',
  filename: 'index.html',
  inject: 'body'
});
module.exports = {
  entry: './index.js',
  output: {
    path: path.resolve('dist'),
    filename: 'bundle.js',
  },
  module: {
    loaders: [
      { test: /\.js[x]?$/, loaders: 'babel-loader', exclude: /node_modules/ },
    ]
  },
  plugins: [HtmlWebpackPluginConfig],
  node: {
    querystring: true,
  },
  resolve: {
    alias: {
      querystring: 'querystring-browser'
    }
  }
}