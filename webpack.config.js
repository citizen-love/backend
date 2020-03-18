
const nodeExternals = require('webpack-node-externals');
const path = require('path');

module.exports = {
  entry: './functions.js',
  output: {
    filename: 'functions.js',
    path: path.resolve(__dirname, '.webpack')
  },
  target: 'node',
  module: {
    rules: [
      {
        test: /\.js$/,
        loader: 'babel-loader'
      }
    ]
  },
  resolve: {
    extensions: ['.js']
  },
  externals: [nodeExternals()]
};
