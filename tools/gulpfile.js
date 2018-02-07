var gulp = require('gulp');
var gutil = require('gulp-util');
var sequence = require('run-sequence');
var notify = require('gulp-notify');


// utils
var lazyQuire = require('./gulp/utils/lazyQuire');
var pumped = require('./gulp/utils/pumped');
var notifaker = require('./gulp/utils/notifaker');

// config
var config = require('./config.js');

// gulpfile booting message
gutil.log(gutil.colors.green('Starting to Gulp! Please wait...'));


/**
 * deploy
 */
gulp.task('deploy', [], lazyQuire(require, './gulp/recipes/deploy/deploy'));

