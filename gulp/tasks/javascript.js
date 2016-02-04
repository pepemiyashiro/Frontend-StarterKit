var config         = require('../config.js').javascript,
    errorHandler   = require('../helpers/errorHandler.js'),
    isProduction   = require('../helpers/isProduction.js'),
    reload         = require('../helpers/reload.js'),
    gulp           = require('gulp'),
    uglify         = require('gulp-uglify'),
    rename         = require('gulp-rename'),
    browserify     = require('browserify'),
    source         = require('vinyl-source-stream'),
    buffer         = require('vinyl-buffer'),
    sourcemaps     = require('gulp-sourcemaps'),
    gutil          = require('gulp-util'),
    watchify       = require('watchify'),
    babelify       = require('babelify'),
    plumber        = require('gulp-plumber'),
    changed        = require('gulp-changed'),
    assign 		   = require('lodash.assign');

// add custom browserify options here
var browserifyOpts = {
  entries: [config.source + '/app.js'],
  debug: true
};

var opts = assign({}, watchify.args, browserifyOpts);

var b = watchify( browserify(opts).transform( 
        babelify.configure( {presets: ["es2015"]} )
    ));

function bundle() {
  return b.bundle()
    .on( 'error' , errorHandler )
    // .pipe(plumber({
    //   errorHandler: errorHandler
    // }))
    .pipe(source('app.js'))
    .pipe(buffer())
    .pipe(isProduction === true ? uglify() : gutil.noop())
    .pipe(sourcemaps.init({
      loadMaps: true
    }))
    .pipe(sourcemaps.write('./'))
    .pipe(gulp.dest(config.dist))
    .pipe(reload());
}

gulp.task('javascriptOnHead', function() {
  return gulp.src(config.headscripts + '/**/*.js')
    .pipe(plumber({
      errorHandler: errorHandler
    }))
    .pipe(changed(config.dist))
    .pipe(isProduction === true ? uglify() : gutil.noop())
    .pipe(rename({
      basename: 'head'
    }))
    .pipe(plumber.stop())
    .pipe(gulp.dest(config.dist))
    .pipe( reload() )
})

gulp.task('javascript', bundle);

b.on('update', bundle);
b.on('log', gutil.log);

