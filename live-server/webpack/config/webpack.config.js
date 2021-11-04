const path = require('path')
const CopyWebpackPlugin = require('../plugins/CopyWebpackPlugin')

module.exports = {
  entry: './src/index.js',
  output: {
    path: path.resolve(__dirname + '/../dist'),
    filename: 'main.js'
  },
  plugins: [
    new CopyWebpackPlugin({
      from: 'public',
      // to: 'dist',
    })
  ]
}
