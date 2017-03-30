const path = require('path');
module.exports = {
  watch: true,
  entry: {
    index: './client/index.js'
  },
  output: {
    path: path.resolve(__dirname, './client/public/js/'),
    filename: 'bundle.js'
  },
  resolve: {
    extensions: ['.js', '.jsx']
  },
  module:{
    rules: [
      {
        test: /\.jsx?$/,
        loader: 'babel-loader',
        exclude: ['node_modules'],
        options: {'presets' : ['es2015', 'react']}
      }
    ]
  }
};