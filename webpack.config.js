var path = require('path');

module.exports = {
  entry: './app.js',
  output: {
    filename: 'voila.js',
    publicPath: '/assets/',
    path: path.resolve(__dirname, 'dist')
  }
};
