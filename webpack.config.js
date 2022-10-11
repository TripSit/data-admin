'use strict';

const path = require('path');
const { merge } = require('webpack-merge');
const Html = require('html-webpack-plugin');
const MiniCssExtract = require('mini-css-extract-plugin');

const BASE_PROXY_URL = 'http://localhost:3000';

const base = {
  context: path.resolve('src'),
  entry: [
    'bootstrap/dist/css/bootstrap.css',
    './index.tsx',
  ],
  resolve: {
    extensions: ['.tsx', '.ts', '.jsx', '.js', '.json', '.wasm'],
  },
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
        use: [
          MiniCssExtract.loader,
          'css-loader',
        ],
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
    new MiniCssExtract(),
  ],
};

const environments = {
  development: {
    mode: 'development',
    devServer: {
      proxy: {
        '/api': `${BASE_PROXY_URL}/api`,
        '/graphql': `${BASE_PROXY_URL}/graphql`,
      },
    },
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
