var config 		= require('../config.js').jade,
    errorHandler= require('../helpers/errorHandler.js'),
	gulp 		= require('gulp'),
	changed     = require('gulp-changed'),
	plumber     = require('gulp-plumber'),
	jade 		= require('gulp-jade');



gulp.task('jade',function() {
    gulp.src(config.source + '/*.jade')
        .pipe(plumber({
            errorHandler: errorHandler
        }))
        .pipe(changed(config.dist))
        .pipe(jade({
            pretty: true
        }))
        .pipe(plumber.stop())
        .pipe(gulp.dest(config.dist))
});