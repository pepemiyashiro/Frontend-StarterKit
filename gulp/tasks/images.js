var config 		     = require('../config.js').images,
    errorHandler   = require('../helpers/errorHandler.js'),
		gulp   				 = require('gulp'),
		changed     	 = require('gulp-changed'),
		imagemin    	 = require('gulp-imagemin'),
		pngmin       	 = require('gulp-pngmin'),
		plumber     	 = require('gulp-plumber');


gulp.task('images', function() {
  
	// JPG process
  gulp.src(config.jpg)
    .pipe(plumber({
        errorHandler: onError
    }))
    .pipe(changed(config.dist))
    .pipe(imagemin())
    .pipe(plumber.stop())
    .pipe(gulp.dest(config.dist))

  // PNG process
  gulp.src(config.png)
      .pipe(plumber({
          errorHandler: onError
      }))
      .pipe(changed(config.dist))
      .pipe(pngmin())
      .pipe(plumber.stop())
      .pipe(gulp.dest(config.dist))

  // Favicon file
  gulp.src(config.ico)
  	.pipe(changed(config.dist))
    .pipe(gulp.dest(config.dist))

});