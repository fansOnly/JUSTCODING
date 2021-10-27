const path = require('path')

module.exports = {
  mode: 'development',
  entry: './src/index.js',
  output: {
    filename: 'bundle.js',
  },
  devServer: {
    contentBase: path.join(__dirname, 'public'),
    compress: false,
    open: true,
    port: 8088,
    publicPath: '/xuni/',
    proxy: {
      '/api': {
        target: 'https://test-api.k6.io/public',
        pathRewrite: {}
      }
    }
  }
}
