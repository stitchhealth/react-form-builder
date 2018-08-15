const webpack = require('webpack');

module.exports = {
  entry: () => ['webpack/hot/dev-server', './app.js'],

  output: {
    filename: 'app.js',
    path: __dirname + '/build',
  },

  module: {
    loaders: [
      {
        test: /\.(js|jsx)$/,
        loader: 'babel-loader',
        exclude: /node_modules/,
        query: {
          plugins: ['transform-decorators-legacy'],
          presets: ['env', 'react', 'stage-2'],
        },
      },
      {
        test: /\.(scss|css)$/,
        exclude: /node_modules/,
        loader: 'style-loader!css-loader!sass-loader',
      },
    ],
  },

  resolve: {
    extensions: ['.js', '.json', '.jsx', '.css', '.scss'],
  },
};
