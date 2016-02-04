var config 		     = require('../config.js').jade,
    errorHandler   = require('../helpers/errorHandler.js'),
    reload         = require('../helpers/reload.js'),
    gulp 		       = require('gulp'),
    plumber        = require('gulp-plumber'),
    jade 		       = require('gulp-jade');

gulp.task('jade',function() {
   return gulp.src(config.source + '/*.jade')
      .pipe(plumber({
          errorHandler: errorHandler
      }))
      .pipe(jade({
          pretty: true
      }))
      .pipe(plumber.stop())
      .pipe(gulp.dest(config.dist))
      .pipe( reload() ) 

});
