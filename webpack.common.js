const path = require('path')

const rules = [
  {
    test: /\.(js|jsx)$/,
    exclude: /(node_modules)/,
    loader: 'babel-loader',
    options: { presets: ['@babel/env'] },
  },
]

module.exports = {
  module: { rules },
}
