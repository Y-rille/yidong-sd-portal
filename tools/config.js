"use strict";

const path = require('path');
const __basename = path.dirname(__dirname);

var config = {
    port: '9090',
    deploy: {
        host: '47.94.4.45',
        port: 22,
        auth: 'hpe',
        remotePath: '/opt/cloud-management-platform/'
    },
    webpack: {
        path: {
            base: __basename,
            src: path.resolve(__basename, 'src'),
            dev: path.resolve(__basename, 'dev'),
            pub: path.resolve(__basename, 'dist'),
        },
    }
}
module.exports = config