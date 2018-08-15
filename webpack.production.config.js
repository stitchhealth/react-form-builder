const webpack = require('webpack');

module.exports = {
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
    'react-datepicker': 'react-datepicker',
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
