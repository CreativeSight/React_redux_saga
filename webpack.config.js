/*
    ./webpack.config.js
*/
const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const HtmlWebpackPluginConfig = new HtmlWebpackPlugin({
  template: './client/index.html',
  filename: 'index.html',
  inject: 'body'
})
module.exports = {
  mode: 'production',
  devServer: {
    https:            false,
    disableHostCheck: true,
    historyApiFallback: true,
    port: 3000,
    proxy: {
      "/api": {
          target: "http://localhost:8080",
          pathRewrite: { '^/api': ''}
        }
  }
},
  entry: './client/index.js',
  output: {
    path: path.resolve('dist'),
    filename: 'index_bundle.js',
    publicPath: '/'
  },
  performance: {
    hints: false,
  },
  module: {
    rules: [
      { test: /\.css$/,
        use:  ['style-loader', 'css-loader']
      },
      {
        test: /\.js$/,
        exclude: /node_modules/,
        use: "babel-loader"
      }, {
        test: /\.jsx?$/,
        exclude: /node_modules/,
        use: "babel-loader"
      }
    ]
  },
  plugins: [HtmlWebpackPluginConfig]
}