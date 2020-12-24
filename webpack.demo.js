const path = require('path')
const { merge } = require('webpack-merge')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const { CleanWebpackPlugin } = require('clean-webpack-plugin')

const common = require('./webpack.common.js')

const devServer = {
  hot: true,
  host: 'localhost',
  port: 3000,
  contentBase: './dist',
  historyApiFallback: true,
}

const plugins = [
  new CleanWebpackPlugin(),
  new HtmlWebpackPlugin({
    template: __dirname + '/demo/index.html',
    title: 'Form Demo',
  }),
]

const resolve = {
  alias: {
    'react-dom': '@hot-loader/react-dom'
  }
}

const demoConfig = {
  devServer,
  plugins,
  resolve,
  entry: {
    app: './demo/index.js',
  },
  output: {
    filename: '[name].[contenthash].js',
    path: path.resolve(__dirname, 'dist'),
  },
}

module.exports = merge(common, demoConfig)