const path = require('path');

module.exports = {
  entry: {
    'bundle': './src/index.js'
  },
  output: {
    path: __dirname + "/dist",
    filename: "[name].js"
  },
  mode: 'development'
};