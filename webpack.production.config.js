const webpack = require('webpack');
const ExtractTextPlugin = require('extract-text-webpack-plugin');

module.exports = [{
  entry: {
    app: ['./src/index.jsx'],
  },

  output: {
    path: __dirname + '/lib',
    filename: 'app.js',
    library: 'ReactFormBuilder',
    libraryTarget: 'umd',
  },

  externals: {
    //don't bundle the 'react' npm package with our bundle.js
    //but get it from a global 'React' variable
    'react': 'react',
    'react-dom': 'react-dom',
    'react-quill': 'react-quill',
    'classnames': 'classnames',
    'jquery': 'jquery',
    'bootstrap': 'bootstrap',
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
    ],
  },
  plugins: [
    new webpack.optimize.UglifyJsPlugin({
      output: { comments: false },
    }),
  ],

  resolve: {
    extensions: ['.js', '.json', '.jsx'],
  },
}, {
  entry: {
    app: ['./css/application.css.scss'],
  },

  output: {
    path: __dirname + '/lib',
    filename: 'app.css',
  },

  module: {
    loaders: [
      {
        test: /\.(scss|css)$/,
        exclude: /node_modules/,
        use: ExtractTextPlugin.extract({
          fallback: 'style-loader',
          use: ['css-loader', 'sass-loader'],
        }),
      },
    ],
  },

  plugins: [
    new ExtractTextPlugin('app.css'),
  ],

  resolve: {
    extensions: ['.js', '.json', '.jsx', '.css', '.scss'],
  },
}];
