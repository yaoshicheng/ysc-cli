const path = require('path');
const webpack = require('webpack');

module.exports = {
  target: 'web',
  entry: {
    'template-web': path.resolve(__dirname, 'lib', 'index')
  },
  output: {
    path: path.resolve(__dirname, 'lib'),
    filename: '[name].js',
    library: 'template',
    libraryTarget: 'umd'
  },
  node: {
    fs: 'empty',
    path: 'empty',
    process: false
  },
  resolve: {
    alias: {
      'html-minifier': 'node-noop'
    }
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        use: [
          {
            loader: 'eslint-loader'
          }
        ]
      }
    ]
  },
  devtool: 'source-map',
  plugins: [
    new webpack.optimize.ModuleConcatenationPlugin(),
  ]
};