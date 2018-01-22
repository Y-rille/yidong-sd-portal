'use strict';

const path = require('path');
const _ = require('lodash');
const webpack = require('webpack');
const pkgJson = require('../package.json');
const config = require('./config');

const ExtractTextPlugin = require('extract-text-webpack-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin-hash');
const HtmlWebpackIncludeAssetsPlugin = require('html-webpack-include-assets-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const ManifestPlugin = require('webpack-manifest-plugin');
const OfflinePlugin = require('offline-plugin');

const tsImportPluginFactory = require('ts-import-plugin')


module.exports = (type) => {
    const isDev = type === 'dev';
    const isDist = type === 'dist';

    const extractAntd = new ExtractTextPlugin({
        filename: isDist ? `bundle/${pkgJson.version}/antd.[contenthash:8].css` : `bundle/${pkgJson.version}/antd.css`,
    });

    const extractApp = new ExtractTextPlugin({
        filename: isDist ? `bundle/${pkgJson.version}/${pkgJson.name}.[contenthash:8].css` : `bundle/${pkgJson.version}/${pkgJson.name}.css`,
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
    return {
        devtool: {
            dev: 'inline-source-map',
            dll: false,
            test: false,
            dist: false,
        }[type],
        resolve: {
            alias: {
            },
            extensions: ['.ts', '.tsx', '.js', '.jsx', '.html', '.scss', '.less', '.css']
        },
        entry: _.compact([
            isDev && 'react-hot-loader/patch',
            isDev && `webpack-hot-middleware/client?http://127.0.0.1:${config.port}`,
            isDev && 'webpack/hot/only-dev-server',
            './src/index',
            './src/style/index',
            './src/style/antd.aless',
        ]),
        output: {
            publicPath: '',
            filename: isDist ? `bundle/${pkgJson.version}/[name].[hash].js` : `bundle/${pkgJson.version}/[name].js`,
            chunkFilename: isDist ? `bundle/${pkgJson.version}/module.[name].[hash].js` : `bundle/${pkgJson.version}/module.[name].js`,
            path: path.join(config.webpack.path.pub)
        },
        externals: {
            'react': 'React',
            'react-dom': 'ReactDOM',
            'react-router-dom': 'ReactRouterDOM',
            'react-redux': 'ReactRedux',
            'lodash': '_',
        },
        plugins: _.compact([
            // isDist && new ManifestPlugin({
            //     fileName: 'manifest.json',
            //     seed: {
            //         name: pkgJson.name,
            //         short_name: pkgJson.name,
            //         start_url: 'index.html',
            //         display: 'standalone',
            //         theme_color: '#40a9ff',
            //         background_color: '#f0f2f5',
            //         orientation: 'landscape',
            //         icons: [{
            //             src: 'favicon.png',
            //             sizes: '144x144',
            //             type: 'image/png'
            //         }]
            //     }
            // }),
            isDev && new webpack.HotModuleReplacementPlugin(),
            isDist && new webpack.optimize.UglifyJsPlugin(),
            isDist && new webpack.optimize.AggressiveMergingPlugin(),
            new webpack.DefinePlugin({
                'process.env': {
                    NODE_ENV: JSON.stringify(type === 'dist' ? 'production' : type),
                }
            }),
            new webpack.NoEmitOnErrorsPlugin(),
            extractAntd,
            extractApp,
            new webpack.optimize.CommonsChunkPlugin({
                name: `common`,
                minChunks: function (module) {
                    return module.context && module.context.indexOf('node_modules') !== -1;
                }
            }),
            new CopyWebpackPlugin([
                {
                    from: config.webpack.path.src + '/lib/',
                    to: 'lib/'
                },
                {
                    from: config.webpack.path.src + '/config.json',
                    to: './'
                },
                {
                    from: config.webpack.path.src + '/favicon.png',
                    to: './'
                }
            ]),
            new HtmlWebpackPlugin({
                title: 'xmas',
                template: './src/templates/index.ejs',
                filename: 'index.html'
            }),
            new HtmlWebpackIncludeAssetsPlugin({
                assets: [
                    'lib/lodash.min.js',
                    'lib/react.production.min.js',
                    'lib/react-dom.production.min.js',
                    'lib/react-router-dom.min.js',
                    'lib/react-redux.min.js',
                ],
                append: false
            }),
            // new webpack.ContextReplacementPlugin(/moment[\\\/]locale$/, /^\.\/(en|zh-cn)$/),
            // isDist && new OfflinePlugin()
        ]),
        module: {
            rules: _.compact([
                // isDev && {
                //     test: /\.(tsx?|jsx?)$/,
                //     loader: 'istanbul-instrumenter-loader',
                //     options: { esModules: true },
                //     enforce: 'post',
                //     exclude: /node_modules|\.spec\.ts$/
                // },
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
            ])
        }
    }
}