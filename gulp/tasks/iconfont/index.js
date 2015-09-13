var config        = require('../../config.js').iconfont,
    errorHandler  = require('../../helpers/errorHandler.js'),
    changed       = require('gulp-changed'),
    plumber       = require('gulp-plumber'),
    gulp         	= require('gulp'),
    iconfont      = require('gulp-iconfont'),
    iconfontCss   = require('gulp-iconfont-css'),
    fontName      = "fonticon";

gulp.task('iconfont', function() {
  gulp.src(config.source + '/**/*.svg', {base: config.dist})
    .pipe(plumber({
        errorHandler: errorHandler
    }))
    .pipe(changed(config.dist))
    .pipe(iconfontCss({
      fontName: fontName,
      path: config.template,
      targetPath: 'source/stylus/inc/iconfont.styl',
      fontPath: '../fonts/iconfont/'
    }))
    .pipe(iconfont({
      fontName: fontName
    }))
    .pipe(plumber.stop())
    .pipe(gulp.dest(config.dist));
});