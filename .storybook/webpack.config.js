const path = require('path');
const _ = require('lodash');
const webpack = require('webpack');
const pkgJson = require('../package.json');
const config = require('../tools/config');

const ExtractTextPlugin = require('extract-text-webpack-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin-hash');
const HtmlWebpackIncludeAssetsPlugin = require('html-webpack-include-assets-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');


const tsImportPluginFactory = require('ts-import-plugin')
const isDist = false
const extractAntd = new ExtractTextPlugin({
  filename: `bundle/antd.css`,
});

const extractApp = new ExtractTextPlugin({
  filename: `bundle/iot.css`,
  allChunks: true
});

const postcssFun = (loader) => {
  let arr = [
    require('postcss-import')({ root: loader.resourcePath })
  ]
  if (isDist) {
    arr.push(require('cssnano')())
  }
  return arr
}

module.exports = {
  plugins: _.compact([
    new CopyWebpackPlugin([
      {
        from: config.webpack.path.src + '/assets/',
        to: 'assets/'
      }
    ]),
    extractAntd,
    extractApp,
  ]),
  resolve: {
    alias: {
    },
    extensions: ['.ts', '.tsx', '.js', '.jsx', '.html', '.scss', '.less', '.css']
  },
  module: {
    rules: [
      {
        test: /\.(tsx?|jsx?)$/,
        loader: 'ts-loader',
        options: {
          transpileOnly: true,
          getCustomTransformers: () => ({
            before: [tsImportPluginFactory({
              libraryName: 'antd',
              libraryDirectory: 'lib',
            })]
          }),
          compilerOptions: {
            module: 'es2015'
          }
        },
        exclude: /node_modules/
      },
      {
        test: /\.scss$/,
        use: extractApp.extract(
          {

            use: ['css-loader?modules&importLoaders=1&localIdentName=[name]_[local]_[hash:base64:5]',
              {
                loader: 'postcss-loader',
                options: {
                  plugins: postcssFun
                }
              }, `sass-loader`],
            publicPath: '../../'
          }
        )
      },
      {
        test: /\.less$/,
        use: extractApp.extract({
          use: ['css-loader?modules&importLoaders=1&localIdentName=[name]_[local]_[hash:base64:5]',
            {
              loader: 'postcss-loader',
              options: {
                plugins: postcssFun
              }
            }, `less-loader`],
          publicPath: '../../'
        })
      },
      {
        test: /\.css$/,
        use: extractApp.extract({
          use: ['css-loader?modules&importLoaders=1&localIdentName=[name]_[local]_[hash:base64:5]', {
            loader: 'postcss-loader',
            options: {
              plugins: postcssFun
            }
          }], publicPath: '../../'
        })
      },
      {
        test: /\.aless$/,
        use: extractAntd.extract({
          // __[local]--[hash:base64:5]
          use: ['css-loader?modules&importLoaders=1&localIdentName=[local]',
            {
              loader: 'postcss-loader',
              options: {
                plugins: postcssFun
              }
            }, `less-loader`],
          publicPath: '../../'
        })
      },
      {
        test: /\.(jpe?g|png|gif|svg)$/i,
        loaders: [
          'url-loader?limit=1&name=img/[name].[ext]',
        ],
        include: path.resolve(config.webpack.path.src)
      },
      {
        test: /\.(eot|ttf|woff)$/i,
        loaders: [
          'url-loader?name=font/[name].[ext]',
        ]
      }
    ]
  }
};