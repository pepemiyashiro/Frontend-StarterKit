var config         = require('../config.js').scss,
    errorHandler   = require('../helpers/errorHandler.js'),
    isProduction   = require('../helpers/isProduction.js'),
    reload         = require('../helpers/reload.js'),
    gulp           = require('gulp'),
    gutil          = require('gulp-util'),
    sass           = require('gulp-sass'),
    changed        = require('gulp-changed'),
    sourcemaps     = require('gulp-sourcemaps'),
    autoprefixer   = require('autoprefixer'),
    postcss        = require('gulp-postcss'),
    rename         = require('gulp-rename'),
    csso           = require('postcss-csso'),
    flexbugsfixes  = require('postcss-flexbugs-fixes'),
    mqpacker       = require('css-mqpacker'),
    plumber        = require('gulp-plumber');

gulp.task('scss', function () {
  return gulp.src(config.source + '/app.scss')
    .pipe(sourcemaps.init())
    .pipe(plumber({
        errorHandler: errorHandler
    }))
    .pipe(changed(config.dist))
    .pipe(sass({ indentedSyntax : false }))
    // .pipe( isProduction === true ? cssnano() : gutil.noop() )
    .pipe(rename({
        basename: 'style'
    }))
    .pipe(postcss([ 
            autoprefixer({ browsers: ['last 2 versions'] }), 
            flexbugsfixes(),
            csso(),
            mqpacker({ sort : true })
        ]))
    .pipe(sourcemaps.write('./'))
    .pipe(plumber.stop())
    .pipe(gulp.dest(config.dist))
    .pipe( reload() )
});
