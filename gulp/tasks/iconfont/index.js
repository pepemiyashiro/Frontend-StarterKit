var config        = require('../../config.js').iconfont,
    errorHandler  = require('../../helpers/errorHandler.js'),
    changed       = require('gulp-changed'),
    plumber       = require('gulp-plumber'),
    gulp         	= require('gulp'),
    iconfont      = require('gulp-iconfont'),
    iconfontCss   = require('gulp-iconfont-css'),
    browserSync   = require('browser-sync');


var runTimestamp = Math.round(Date.now()/1000);

gulp.task('iconfont', function() {
  /** @type {base} 
    Defines the base path in order
    jump to parent folders.  
  */
  gulp.src(config.source + '/**/*.svg', {base: config.base})
    .pipe(iconfontCss({
      // Defines the name of the font
      fontName: config.fontName,
      // Path to Template
      path: config.template,
      // Path to export the stylus file
      targetPath: config.pathToStylusInc,
      // Path printed on the CSS file to load the font
      fontPath: config.fontPath
    }))
    .pipe(iconfont({
      fontName: config.fontName,
      appendUnicode: true,
      timestamp: runTimestamp
    }))
    .pipe(gulp.dest(config.dist))
    .pipe(browserSync.reload({stream:true}))
});