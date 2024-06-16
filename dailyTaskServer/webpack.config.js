const path = require('path');

module.exports = {
  watch: true,
  target: 'node',
  entry: './src/server.ts',
  module: {
    rules: [
      {
        test: /\.ts?$/,
        use: 'ts-loader',
        exclude: /node_modules/,
      },
    ],
  },
  resolve: {
    extensions: ['.tsx', '.ts', '.js'],
  },
  output: {
    filename: 'server.js',
    path: path.resolve(__dirname, 'build'),
  },
  devServer: {
    static: path.join(__dirname, 'build'),
    compress: true,
    port: 4000,
  },
};
