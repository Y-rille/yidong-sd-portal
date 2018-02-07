var gulp = require("gulp")
var sftp = require('gulp-sftp')
// var ftp = require('vinyl-ftp')

// config
var config = require('../../../config.js');


module.exports = function () {
    return gulp.src(config.webpack.path.pub + '/**')
        .pipe(sftp(config.deploy))
};
