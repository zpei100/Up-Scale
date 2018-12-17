var path = require('path');
var SRC_DIR = path.join(__dirname, '/react-client/src');
var DIST_DIR = path.join(__dirname, '/react-client/dist');

const client = {
  entry: `${SRC_DIR}/index.jsx`,
  mode: 'production',
  output: {
    filename: 'bundle.js',
    path: DIST_DIR
  },
  module : {
    rules : [
      {
        test : /\.jsx?/,
        include : SRC_DIR,
        loader : 'babel-loader'
      },
      {
        test: /\.css?/,
        loader: 'style-loader'
      },
      {
        test: /\.css?/,
        loader: 'css-loader'
      }
    ]
  },
  optimization: {
    minimize: true
  }
};

// const server = {
//   entry: path.resolve(__dirname, './server/index.js'),
//   mode: 'development',
//   target: 'node',
//   output: {
//     path: path.resolve(__dirname, './server/build')
//   },
//   module : {
//     rules : [
//       {
//         test : /\.js?/,
//         loader : 'babel-loader'
//       },
//       {
//         test: /\.css?/,
//         loader: 'style-loader'
//       },
//       {
//         test: /\.css?/,
//         loader: 'css-loader'
//       }
//     ]
//   },
// };

module.exports = [client];