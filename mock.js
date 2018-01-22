const express = require('express');
const dyson = require('dyson');
const path = require('path');
var faker = require('faker');
var _ = require('lodash');

const options = {
  configDir: path.join(__dirname, 'mock')
};

const myApp = express();
const configs = dyson.getConfigurations(options);

dyson.registerServices(myApp, options, configs);

myApp.listen(8765);