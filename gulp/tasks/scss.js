var config         = require('../config.js').scss,
    errorHandler   = require('../helpers/errorHandler.js'),
    isProduction   = require('../helpers/isProduction.js'),
    reload         = require('../helpers/reload.js'),
    gulp           = require('gulp'),
    gutil          = require('gulp-util'),
    sass           = require('gulp-sass'),
    changed        = require('gulp-changed'),
    sourcemaps     = require('gulp-sourcemaps'),
    cssnano        = require('gulp-cssnano'),
    autoprefixer   = require('gulp-autoprefixer'),
    rename         = require('gulp-rename'),
    plumber        = require('gulp-plumber');

gulp.task('scss', function () {
  return gulp.src(config.source + '/app.scss')
    .pipe(sourcemaps.init())
    .pipe(plumber({
        errorHandler: errorHandler
    }))
    .pipe(changed(config.dist))
    .pipe(sass())
    .pipe(autoprefixer())
    .pipe( isProduction === true ? cssnano() : gutil.noop() )
    .pipe(rename({
        basename: 'style'
    }))
    .pipe(sourcemaps.write('./'))
    .pipe(plumber.stop())
    .pipe(gulp.dest(config.dist))
    .pipe( reload() )
});