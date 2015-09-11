var config 		= require('../config.js'),
	gulp 		= require('gulp');

gulp.task('watch', ['sync'], function() {
    
    gulp.watch(config.jade.source + '/**/*.jade', ['jade']);

});