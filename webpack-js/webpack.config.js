const path = require('path');

module.exports = {
  entry: {
    'bundle': './src/global.js'
  },
  output: {
    path: __dirname + "/dist",
    filename: "[name].js"
  },
  mode: 'development'
};