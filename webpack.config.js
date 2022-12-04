'use strict';

const path = require('path');
const { merge } = require('webpack-merge');
const Html = require('html-webpack-plugin');
const MiniCssExtract = require('mini-css-extract-plugin');
const Brotli = require('brotli-webpack-plugin');

// const BASE_PROXY_URL = 'http://localhost:3000';

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
      compress: false,
      historyApiFallback: true,
      proxy: [
        {
          context: [
            '/api',
            '/graphql',
          ],
          target: 'http://localhost:3000',
        },
      ],
    },
  },

  production: {
    mode: 'production',
    output: {
      path: path.resolve('./dist'),
      filename: 'app.[contenthash].js',
    },
    plugins: [
      new Brotli(),
    ],
  },
};

module.exports = function webpackConfig() {
  return merge(base, environments[process.env.NODE_ENV] || environments.production);
};
