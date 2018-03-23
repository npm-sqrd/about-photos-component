const webpack = require('webpack');
const path = require('path');

const client = {
  context: path.resolve(__dirname, 'client'),
  entry: path.resolve(__dirname, './client/src/index.jsx'),
  output: {
    path: path.resolve(__dirname, 'client/dist'),
    filename: 'about-bundle.js',
  },
  module: {
    loaders: [
      {
        test: /\.jsx?$/,
        exclude: /node_modules/,
        loader: 'babel-loader',
      },
      {
        test: /\.css$/,
        loader: ['style-loader', 'css-loader'],
      },
    ],
  },
};

const server = {
  context: path.resolve(__dirname, 'client'),
  entry: path.resolve(__dirname, 'client/src/productionView.js'),
  target: 'node',
  output: {
    path: path.resolve(__dirname, 'client/dist'),
    filename: 'about-bundle-server.js',
    libraryTarget: 'commonjs-module',
  },
  module: {
    loaders: [
      {
        test: /\.jsx?$/,
        exclude: /node_modules/,
        loader: 'babel-loader',
      },
      {
        test: /\.css$/,
        loader: 'css-loader',
      },
    ],
  },
};

module.exports = [
  client, server,
];
