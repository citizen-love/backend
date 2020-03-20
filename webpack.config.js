
const nodeExternals = require('webpack-node-externals');
const webpack = require('webpack');
const Dotenv = require('dotenv-webpack');
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
  plugins: [
    new Dotenv({ path: './.env' }),
    new webpack.DefinePlugin({
      'process.env.SENDGRID_KEY': JSON.stringify(process.env.SENDGRID_KEY)
    })
  ],
  externals: [nodeExternals()]
};
