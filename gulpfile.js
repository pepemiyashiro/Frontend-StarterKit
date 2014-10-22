// ===============
// Dependencies
// ===============
var gulp = require('gulp'),
    stylus = require('gulp-stylus'),
    nib = require('nib'),
    jade = require('gulp-jade'),
    browserSync = require('browser-sync'),
    concat = require('gulp-concat'),
    uglify = require('gulp-uglify'),
    imagemin = require('gulp-imagemin');

// ===============
// Paths
// ===============

var path = {

		// Jade to HTML
    jade: ['source/jade/*.jade'],
    html: 'dist/',

    // Stylus to CSS
    stylus: ['source/stylus/*.styl'],
    css: 'dist/css',

    // Javascript
    srcjs: ['source/javascript/*.js'],
    distjs: 'dist/js',

   	// Images
   	srcimg: ['source/images/*.*'],
   	distimg: 'dist/img'
};


// ===============
// Tasks
// ===============

// JADE - HTML

gulp.task('html', function() {
    return gulp.src(path.jade)
    .pipe(jade({
        pretty: true
    }))
    .pipe(gulp.dest(path.html));
});

// STYLUS - CSS

gulp.task('css', function () {
    return gulp.src(path.stylus)
    .pipe(stylus({
 	   		use: nib(),
        compress: true
    }))
    .pipe(gulp.dest(path.css));
});

// IMAGES

gulp.task('img', function () {
    return gulp.src(path.srcimg)
        .pipe(imagemin())
        .pipe(gulp.dest(path.distimg));
});

// JAVASCRIPT

gulp.task('js', function () {
  gulp.src(path.srcjs)
  .pipe(concat('main.js'))
  .pipe(uglify())
  .pipe(gulp.dest(path.distjs))
});

// WATCH

gulp.task('watch', function() {
    gulp.watch(path.jade, ['html']);
    gulp.watch(path.stylus, ['css']);
    gulp.watch(path.srcjs, ['js']);
    gulp.watch(path.srcimg, ['img']);
});

// BROWSER SYNC

gulp.task('sync', function() {
    browserSync.init('dist/**/*', {
        server: {
            baseDir: 'dist/'
        }
    });
});

// DEFAULT
gulp.task('default', ['html', 'css', 'js', 'img', 'watch', 'sync']);
