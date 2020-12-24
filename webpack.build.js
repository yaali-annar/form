var path = require('path')
const { merge } = require('webpack-merge')
const common = require('./webpack.common.js')

const output = {
  path: path.resolve('lib'),
  filename: 'form.js',
  libraryTarget: 'commonjs2'
}

const buildConfig = {
  mode: 'production',
  entry: './src/index.js',
  output
}

module.exports = merge(common, buildConfig)