var config 		     = require('../config.js').nunjucks,
    errorHandler   = require('../helpers/errorHandler.js'),
    reload         = require('../helpers/reload.js'),
    gulp 		       = require('gulp'),
    plumber        = require('gulp-plumber'),
    nunjucksRender = require('gulp-nunjucks-render');

gulp.task('nunjucks',function() {
   return gulp.src(config.source + '/pages/**/*.+(html|nunjucks)')
      .pipe(plumber({
          errorHandler: errorHandler
      }))
      .pipe(nunjucksRender({
        path: [config.source + '/templates/']
      }))
      .pipe(plumber.stop())
      .pipe(gulp.dest(config.dist))
      .pipe( reload() ) 

});
