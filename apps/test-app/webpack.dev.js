const { merge } = require('webpack-merge');
const common = require('./webpack.common.js');

module.exports = merge(common, {
  mode: 'development',
  devtool: 'source-map',
  devServer: {
    static: './dist',
    port: '9999',
    allowedHosts: 'all',
    historyApiFallback: {
      index: '/index.html'
    },
  },
});
