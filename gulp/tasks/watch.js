var config 		= require('../config.js'),
		gulp 			= require('gulp');

gulp.task('watch', ['sync'], function() {
    
    gulp.watch( config.jade.source + '/**/*.jade', ['jade'] );
    gulp.watch( config.stylus.source + '/**/*.{styl,css}', ['stylus'] );
    gulp.watch( config.iconfont.source + '/**/*.svg', ['iconfont'] );
    gulp.watch( config.images.source + '/**/*.{jpg,png}', ['images'] );

});