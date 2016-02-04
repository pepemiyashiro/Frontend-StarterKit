var config 		     = require('../config.js').fonts,
    errorHandler   = require('../helpers/errorHandler.js'),
    reload         = require('../helpers/reload.js'),
    gulp 		       = require('gulp'),
    changed        = require('gulp-changed'),
    plumber        = require('gulp-plumber');

gulp.task('fonts',function() {
    return gulp.src(config.source + '**/*')
      .pipe(plumber({
          errorHandler: errorHandler
      }))
      .pipe(changed(config.dist))
      .pipe(plumber.stop())
      .pipe(gulp.dest(config.dist))
      .pipe( reload() )
});