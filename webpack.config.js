
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
      'process.env.APPLIED_ENV': JSON.stringify(process.env.NODE_ENV),
      'process.env.SENDGRID_KEY': JSON.stringify(process.env.SENDGRID_KEY),
      'process.env.SLACK_URL_PRODUCTION': JSON.stringify(process.env.SLACK_URL_PRODUCTION || ''),
      'process.env.SLACK_URL_STAGING': JSON.stringify(process.env.SLACK_URL_STAGING || '')
    })
  ],
  externals: [nodeExternals()]
};
