// const webpack = require('webpack');
// const path = require('path');
// const Dotenv = require('dotenv-webpack');

// const common = {
//   context: path.resolve(__dirname, 'client'),
//   module: {
//     loaders: [
//       {
//         test: /\.jsx?$/,
//         exclude: /node_modules/,
//         loader: 'babel-loader',
//       },
//       {
//         test: /\.css$/,
//         use: ['style-loader', 'css-loader'],
//       },
//     ],
//   },
//   plugins: [
//     new Dotenv(),
//   ],
// };

// const client = {
//   entry: path.resolve(__dirname, './client/src/index.jsx'),
//   output: {
//     path: path.resolve(__dirname, 'client/dist'),
//     filename: 'about-prod-bundle.js',
//   },
// };

// const server = {
//   entry: path.resolve(__dirname, 'client/src/productionView.js'),
//   target: 'node',
//   output: {
//     path: path.resolve(__dirname, 'client/dist'),
//     filename: 'server-about-prod-bundle.js',
//     libraryTarget: 'commonjs-module',
//   },
// };

// module.exports = [
//   Object.assign({}, common, client),
//   Object.assign({}, common, server),
// ];
