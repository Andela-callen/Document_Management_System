import webpack from 'webpack';
import path from 'path';

module.exports ={
  context: path.resolve('src'),
  entry: {
    index: './index.jsx'
  },
  output: {
    path: path.resolve('public/js'),
    filename: '[name].js'
  },
  resolve: {
    extensions: ['.js', '.jsx']
  },
  module:{
    rules:[
      {
        test: /\.jsx?$/,
        loader: 'babel-loader',
        exclude: ['node_modules'],
        options: {'presets' : ['es2015', 'react']}
      }
    ]
  }
}