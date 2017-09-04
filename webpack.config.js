const path = require('path')
const webpack = require('webpack')
const HTMLWebpackPlugin = require('html-webpack-plugin')
const CopyWebpackPlugin = require('copy-webpack-plugin')

const root = path.resolve(__dirname)
const src = path.join(root, 'src')
const dist = path.join(root, 'dist')

module.exports = {
  entry: path.join(src, 'index.tsx'),
  output: {
    filename: '[name].js',
    path: dist,
  },
  resolve: {
    alias: {
      'copyemote': src,
    },
    extensions: ['.ts', '.tsx', '.d.ts', '.js', '.json'],
  },
  plugins: [
    new HTMLWebpackPlugin({
      template: path.resolve(root, 'htdocs/index.ejs'),
    }),
    new webpack.DefinePlugin({
      'process.env.AUTH_TOKEN': JSON.stringify(process.env.AUTH_TOKEN),
    }),
  ],
  module: {
    rules: [
      { test: /\.tsx?$/, loader: 'awesome-typescript-loader' },
      { test: /\.s?css$/, use: [ { loader: 'style-loader' }, { loader: 'css-loader' }, { loader: 'sass-loader' }]},
      { test: /\.woff(2)?(\?v=[0-9]\.[0-9]\.[0-9])?$/, loader: 'url-loader?limit=10000&mimetype=application/font-woff' },
      { test: /\.(ttf|eot|svg)(\?v=[0-9]\.[0-9]\.[0-9])?$/, loader: 'file-loader' },
      { test: /\.js$/, use: ['source-map-loader'], enforce: 'pre' },
    ]
  }
}
