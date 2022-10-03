'use strict';

const path = require('path');
const { merge } = require('webpack-merge');
const Html = require('html-webpack-plugin');

const base = {
  context: path.resolve('src'),
  entry: [
    'bootstrap/dist/css/bootstrap.css',
    './index.tsx',
  ],
  module: {
    strictExportPresence: true,
    rules: [
      {
        test: /\.tsx?$/,
        exclude: /node_modules/,
        loader: 'babel-loader',
        options: {
          sourceMap: true,
        },
      },
      {
        test: /\.css$/,
        loader: 'css-loader',
      },
      {
        test: /\.(png|jpe?g)$/,
        type: 'asset/resource',
      },
      {
        test: /.svg$/,
        type: 'asset/inline',
      },
    ],
  },
  plugins: [
    new Html({
      template: path.resolve('src/template.html'),
      inject: 'head',
    }),
  ],
};

const environments = {
  development: {
    mode: 'development',
  },

  production: {
    mode: 'production',
    output: {
      path: path.resolve('./dist'),
      filename: 'app.[contenthash].js',
    },
  },
};

module.exports = function webpackConfig() {
  return merge(base, environments[process.env.NODE_ENV] || environments.production);
};
