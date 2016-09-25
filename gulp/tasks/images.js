var config 		     = require('../config.js').images,
    errorHandler   = require('../helpers/errorHandler.js'),
    isProduction   = require('../helpers/isProduction.js'),
    reload         = require('../helpers/reload.js'),
		gulp   				 = require('gulp'),
    gutil          = require('gulp-util'),
		changed     	 = require('gulp-changed'),
		imagemin    	 = require('gulp-imagemin'),
		plumber     	 = require('gulp-plumber');


gulp.task('images:all', function() {
  console.log(config.source + '/**/*');
  return gulp.src(config.source + '/**/*')
    .pipe(plumber({
        errorHandler: errorHandler
    }))
    .pipe(changed(config.dist))
    .pipe(isProduction === true ? imagemin() : gutil.noop() )
    .pipe(plumber.stop())
    .pipe(gulp.dest(config.dist))
});

gulp.task('images:fav', function() {
  return gulp.src(config.ico)
  	.pipe(changed(config.dist))
    .pipe(gulp.dest(config.dist))
});


gulp.task('images', ['images:all', 'images:fav'] );
