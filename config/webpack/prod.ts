import { merge } from 'webpack-merge';
import webpack from 'webpack';

const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const TerserPlugin = require('terser-webpack-plugin');

import configBase from './base';

const configProd: webpack.Configuration = {
  mode: 'production',
  devtool: false,
  plugins: [
    new MiniCssExtractPlugin({
      filename: 'style.[fullhash].css',
    }),
  ],
  module: {
    rules: [
      {
        test: /\.(ts|tsx)$/,
        exclude: /node_modules/,
        use: ['babel-loader', 'ts-loader'],
      },
    ]
  },
  optimization: {
    minimize: true,
    minimizer: [
      new TerserPlugin({
        terserOptions: {
          output: { comments: false },
        },
      }),
    ],
    moduleIds: 'deterministic',
    splitChunks: {
      minChunks: 1,
      cacheGroups: {
        vendor: {
          test: /\/node_modules\//,
          name: 'vendors',
          chunks: 'all',
          minChunks: 1,
        },
      },
    },
  },
};

module.exports = merge([configBase, configProd]);
