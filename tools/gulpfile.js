var gulp = require('gulp');
var gutil = require('gulp-util');
var sftp = require('gulp-sftp');

// config
var config = require('./config.js');

// gulpfile booting message
gutil.log(gutil.colors.green('Starting to Gulp! Please wait...'));

/**
 * deploy
 */
gulp.task('deploy', function () {
    return gulp.src(config.webpack.path.pub + '/**').pipe(sftp(config.deploy));
});