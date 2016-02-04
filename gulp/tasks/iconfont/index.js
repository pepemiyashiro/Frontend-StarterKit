var config        = require('../../config.js').iconfont,
    errorHandler  = require('../../helpers/errorHandler.js'),
    gulp         	= require('gulp'),
    changed       = require('gulp-changed'),
    plumber       = require('gulp-plumber'),
    iconfont      = require('gulp-iconfont'),
    iconfontCss   = require('gulp-iconfont-css');


var runTimestamp = Math.round(Date.now()/1000);

gulp.task('iconfont', function() {
  return gulp.src(config.source + '/**/*.svg', {base: config.base})
    .pipe(changed(config.dist))
    .pipe(iconfontCss({
      // Defines the name of the font
      fontName: config.fontName,
      // Path to Template
      path: config.template,
      // Path to export the stylus file
      targetPath: config.exportTo,
      // Path printed on the CSS file to load the font
      fontPath: config.fontPath
    }))
    .pipe(iconfont({
      fontName: config.fontName,
      appendUnicode: true,
      timestamp: runTimestamp
    }))
    .pipe(gulp.dest(config.dist))
});