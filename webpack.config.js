const path = require('path');
let webpack = require('webpack');

const BUILD_DIR = path.resolve(__dirname, 'client/public/js/');
const APP_DIR = path.resolve(__dirname, 'client/app/');

const config = {
  watch: true,
  devtool: 'eval',
  entry:  `${APP_DIR}/index.jsx`,
  output: {
    path: BUILD_DIR,
    filename: 'bundle.js'
  },
  resolve: {
    extensions: ['.js', '.jsx']
  },

  plugins: [
    // new webpack.HotModuleReplacementPlugin(),
    // new webpack.NoErrorsPlugin(),
    new webpack.ProvidePlugin({
      $: 'jquery',
      jQuery: 'jquery',
      'window.jQuery': 'jquery',
      Hammer: 'hammerjs/hammer'
    }),
  ],

  node: {
    dns: 'mock',
    net: 'empty'
  },

  module: {
    rules: [
      { test: /\.jsx?/, include: APP_DIR, loader: 'babel-loader' },
      { test: /(\.css)$/, loaders: ['style-loader', 'css-loader'] },
      { test: /\.eot(\?v=\d+\.\d+\.\d+)?$/, loader: 'file' },
      { test: /\.(woff)$/, loader: 'url?prefix=font/&limit=5000' },
      {
        test: /\.woff2(\?v=\d+\.\d+\.\d+)?$/,
        loader: 'url?limit=10000&mimetype=application/font-woff'
      },
      { test: /\.ttf(\?v=\d+\.\d+\.\d+)?$/, loader: 'url?limit=10000&mimetype=application/octet-stream' },
      { test: /\.svg(\?v=\d+\.\d+\.\d+)?$/, loader: 'url?limit=10000&mimetype=image/svg+xml' },
      { test: /\.(jpg|png|svg|jpeg)$/, loader: 'url-loader',
      options: { limit: 25000 },}
      ]
  }
};

module.exports = config;