var config      = require('../config.js').javascript,
errorHandler    = require('../helpers/errorHandler.js'),
jshint      	= require('gulp-jshint'),
stylish         = require('jshint-stylish'),
gulp            = require('gulp'),
uglify          = require('gulp-uglify'),
browserify      = require('browserify'),
source          = require('vinyl-source-stream'),
buffer          = require('vinyl-buffer'),
sourcemaps      = require('gulp-sourcemaps'),
gutil           = require('gulp-util'),
watchify        = require('watchify'),
assign 			= require('lodash.assign');

// add custom browserify options here
var customOpts = {
  entries: [config.source + '/main.js'],
  debug: true
};

var opts = assign({}, watchify.args, customOpts);
var b = watchify(browserify(opts)); 

function bundle() {
  return b.bundle()
    // log errors if they happen
    //.on('error', onError)
    .on('error', errorHandler)
    .pipe(source('main.js'))
    // optional, remove if you don't need to buffer file contents
    .pipe(buffer())
    .pipe(sourcemaps.init({loadMaps:true}))
    .pipe(sourcemaps.write('./'))
    .pipe(gulp.dest(config.dist))
}

function bundleMinify() {
  return b.bundle()
    .on('error', errorHandler)
    .pipe(source('main.js'))
    .pipe(buffer())
    .pipe(uglify())
    .pipe(sourcemaps.init({loadMaps:true}))
    .pipe(sourcemaps.write('./'))
    .pipe(gulp.dest(config.dist))
}


gulp.task('javascript', bundle);
gulp.task('js:minify', bundleMinify);
b.on('update', bundle);
b.on('log', gutil.log);