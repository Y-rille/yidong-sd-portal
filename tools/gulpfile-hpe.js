var gulp = require('gulp');
var gutil = require('gulp-util');
var sequence = require('run-sequence');
var notify = require('gulp-notify');

const path = require('path');
const __basename = path.dirname(__dirname);


// utils
var lazyQuire = require('./gulp/utils/lazyQuire');
var pumped = require('./gulp/utils/pumped');
var notifaker = require('./gulp/utils/notifaker');

// config
var config = {
    port: '9001',
    deploy: {
        host: '15.146.38.119',
        port: 22000,
        auth: 'hpe-119',
        remotePath: '/usr/local/nginx/dist/'
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

// gulpfile booting message
gutil.log(gutil.colors.green('Starting to Gulp! Please wait...'));


/**
 * deploy
 */
gulp.task('deploy', [], lazyQuire(require, './gulp/recipes/deploy/deploy'));

