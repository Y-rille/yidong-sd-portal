'use strict';

const config = require('./config');

const path = require('path');
const http = require('http');

const express = require('express');
const fallback = require('express-history-api-fallback');
const webpack = require('webpack');

const devMiddleware = require('webpack-dev-middleware');
const hotMiddleware = require('webpack-hot-middleware');

const getConfig = require('./webpack-config');


const proxy = require('http-proxy-middleware');
var options = {
    target: 'http://47.94.4.45:8090/', // target host
    secure: false,
    changeOrigin: true,               // needed for virtual hosted sites
    ws: true,                         // proxy websockets
    ignorePath: false,
    pathRewrite: {
        '^/api': ''
    }
};

var webProxy = proxy(options);


const proxy_setting = require('http-proxy-middleware');
var options_setting = {
    target: 'http://47.94.4.45:8067/', // target host
    secure: false,
    changeOrigin: true,               // needed for virtual hosted sites
    ws: true,                         // proxy websockets
    ignorePath: false,
    pathRewrite: {
        '^/api_setting': ''
    }
};

var webProxy_setting = proxy(options_setting);

const proxy_performance = require('http-proxy-middleware');
var options_performance = {
    target: 'http://47.94.4.45:8090/', // target host
    secure: false,
    changeOrigin: true,               // needed for virtual hosted sites
    ws: true,                         // proxy websockets
    ignorePath: false,
    pathRewrite: {
        '^/api_performance': ''
    }
};

var webProxy_performance = proxy(options_performance);


// Start an express server for development using webpack dev-middleware and hot-middleware
function startDevServer() {
    const app = express();
    const devConfig = getConfig('dev');


    const compiler = webpack(devConfig);
    app.use(devMiddleware(compiler, {
        publicPath: devConfig.output.publicPath,
        historyApiFallback: true,
    }));

    app.use(hotMiddleware(compiler));
    app.use('/api/*', webProxy);
    app.use('/api_setting/*', webProxy_setting);
    app.use('/api_performance/*', webProxy_performance);

    // // First, find files from src folder
    // app.use(express.static(path.join(__dirname, '../src')));

    // // Also support files from root folder, mainly for the dev-vendor bundle
    // app.use(express.static(path.join(__dirname, '../')));

    // History api fallback
    // app.use(fallback('index.html', { root: path.join(__dirname, '../src') }));

    // // Other files should not happen, respond 404
    // app.get('*', (req, res) => {
    //     console.log('Warning: unknown req: ', req.path);
    //     res.sendStatus(404);
    // });

    app.listen(config.port, (err) => {
        if (err) {
            console.error(err);
        }
        console.log(`Dev server listening at http://localhost:${config.port}/`);
    });
}

startDevServer()