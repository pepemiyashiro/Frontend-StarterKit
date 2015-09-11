var config 		= require('../config.js'),
	gulp 		= require('gulp'),
	changed     = require('gulp-changed'),
	plumber     = require('gulp-plumber'),
	gutil       = require('gulp-util'),
	jade 		= require('gulp-jade');

var onError = function(err) {
    gutil.beep();
    console.log( gutil.colors.yellow.bgBlack(err.message) );
    console.log( typeof err.message );
};


gulp.task('jade',function() {
    return gulp.src(config.path.source + 'jade/*.jade')
        .pipe(plumber({
            errorHandler: onError
        }))
        .pipe(changed(config.path.dist))
        .pipe(jade({
            pretty: true
        }))
        .pipe(plumber.stop())
        .pipe(gulp.dest(config.path.dist))
});