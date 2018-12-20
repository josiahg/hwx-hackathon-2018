// Common Webpack configuration used by webpack.config.development and webpack.config.production

const path = require('path');
const webpack = require('webpack');
const autoprefixer = require('autoprefixer');
const HtmlWebpackPlugin = require('html-webpack-plugin');

const isProd = process.env.NODE_ENV == 'production';

module.exports = {
  // target: 'node',
  node: {
    fs: "empty"
  },
  output: {
    filename: 'js/[name].js',
    path: path.resolve(__dirname, '../public/assets'),
    publicPath: '/'
  },
  resolve: {
    modules: [
      path.join(__dirname, '../app/scripts'),
      'node_modules'
    ],
    alias: {
      //models: path.join(__dirname, '../src/client/assets/javascripts/models')
    },
    extensions: ['.js', '.jsx', '.json', '.scss']
  },
  plugins: [
    /*new webpack.ProvidePlugin({
      'fetch': 'imports?this=>global!exports?global.fetch!whatwg-fetch'  // fetch API
    }),*/
    // Shared code
    new HtmlWebpackPlugin({
      title: 'STREAMS MESSAGING MANAGER',
      baseHref: isProd ? '/smm/' : './',
      template: path.join(__dirname, '../index.ejs'),
      inject: false,
      filename: 'index.html'
    }),
    new webpack.LoaderOptionsPlugin({
      options: {
        postcss: function() {
          return [
            autoprefixer({
              browsers: ['last 2 versions']
            })
          ];
        },
        eslint: {
          failOnWarning: false,
          failOnError: true
        }
      }
    })
    /*new webpack.optimize.CommonsChunkPlugin({
      name: 'vendor',
      filename: 'js/vendor.bundle.js',
      minChunks: Infinity
    })*/
  ],
  module: {
    rules: [
      { test: /\.(js|jsx)$/, use: 'babel-loader' }
    ]
    /*preLoaders: [
            // Javascript
            { test: /\.jsx?$/,
              loader: 'eslint'
            }
        ],
    loaders: [
      // JavaScript / ES6
      {
        test: /\.jsx?$/,
        include: path.join(__dirname, '../app'),
        loader: 'babel'
      },
      // Images
      // Inline base64 URLs for <=8k images, direct URLs for the rest
      {
        test: /\.(png|jpg|jpeg|gif|svg)$/,
        loader: 'url',
        query: {
          limit: 8192,
          name: 'images/[name].[ext]?[hash]'
        }
      },
      // Fonts
      {
        test: /\.(woff|woff2|ttf|eot)(\?v=\d+\.\d+\.\d+)?$/,
        loader: 'url',
        query: {
          limit: 8192,
          name: 'fonts/[name].[ext]?[hash]'
        }
      }
    ]*/
  }/*,
  postcss: function() {
    return [
      autoprefixer({
        browsers: ['last 2 versions']
      })
    ];
  },
  eslint: {
    failOnWarning: false,
    failOnError: true
  }*/
};
