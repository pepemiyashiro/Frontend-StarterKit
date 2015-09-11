var config 		= require('../config.js').browserSync,
	gulp    	= require('gulp'),
	browserSync = require('browser-sync').create();

gulp.task('sync', function() {
    browserSync.init(config);
});