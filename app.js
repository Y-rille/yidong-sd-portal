const express = require('express');
const dyson = require('dyson');
const path = require('path');
var faker = require('faker');
var _ = require('lodash');
const proxy = require('http-proxy-middleware');

const options = {
  configDir: path.join(__dirname, 'mock')
};


const proxy = require('http-proxy-middleware');
var options0 = {
  target: 'http://47.94.4.45:8090/', // target host
  secure: false,
  changeOrigin: true,               // needed for virtual hosted sites
  ws: true,                         // proxy websockets
  ignorePath: false,
  pathRewrite: {
    '^/api': ''
  }
};

var webProxy = proxy(options0);


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

var options_resource = {
  target: 'http://47.94.4.45:8090/', // target host
  secure: false,
  changeOrigin: true,               // needed for virtual hosted sites
  ws: true,                         // proxy websockets
  ignorePath: false,
  pathRewrite: {
    '^/api_resource': ''
  }
};

var webProxy_resource = proxy(options_resource);

var options_agent = {
  target: 'http://47.94.4.45:18028/', // target host
  secure: false,
  changeOrigin: true,               // needed for virtual hosted sites
  ws: true,                         // proxy websockets
  ignorePath: false,
  pathRewrite: {
    '^/api_agent': ''
  }
};
var webProxy_agent = proxy(options_agent);

const myApp = express();
const configs = dyson.getConfigurations(options);
myApp.use('/', express.static('dist'));
myApp.use('/api/*', webProxy);
myApp.use('/api_setting/*', webProxy_setting);
myApp.use('/api_performance/*', webProxy_performance);
myApp.use('/api_resource/*', webProxy_resource);
myApp.use('/api_agent/*', webProxy_agent);

dyson.registerServices(myApp, options, configs);


myApp.listen(8765, (err) => {
  if (err) {
    console.error(err);
  }
  console.log(`Dev server listening at http://localhost:8765/`);
});
