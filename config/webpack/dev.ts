import { merge } from 'webpack-merge';
import webpack from 'webpack';
import 'webpack-dev-server';

import configBase from './base';
import { PATHS, PORT } from './variables';

const configDev: webpack.Configuration = {
  mode: 'development',
  devtool: 'inline-source-map',
  module: {
    rules: [
      {
        test: /\.(ts|tsx)$/,
        exclude: /node_modules/,
        use: 'ts-loader',
      },
    ]
  },
  devServer: {
    static: PATHS.build,
    compress: true,
    port: PORT,
    hot: true,
    historyApiFallback: true,
    headers: {
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Methods': 'GET, POST, PUT, DELETE, PATCH, OPTIONS',
      'Access-Control-Allow-Headers': 'X-Requested-With, content-type, Authorization',
    },
  },
};

export default merge([configBase, configDev]);
