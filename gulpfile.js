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
    jshint = require('gulp-jshint'),
    stylish = require('jshint-stylish'),
    newer = require('gulp-newer'),
    imagemin = require('gulp-imagemin'),
    gutil = require('gulp-util');

// ===============
// Paths
// ===============

var path = {

    // Jade to HTML
    jade_src: ['source/jade/*.jade'],
    html_dist: 'dist/',

    // Stylus to CSS
    stylus_src: ['source/stylus/*.styl'],
    css_dist: 'dist/css',

    // Javascript
    js_src: ['source/javascript/*.js'],
    js_dist: 'dist/js',

    // Images
    img_src: ['source/images/*.*'],
    img_dist: 'dist/img'
};

// ===============
// Error Handler
// ===============

var handleError;

handleError = function(err) {
    gutil.log(err);
    gutil.beep();
    return this.emit('end');
};


// ===============
// Tasks
// ===============

// JADE - HTML

gulp.task('html', function() {
    return gulp.src(path.jade_src)
        .pipe(newer(path.html_dist))
        .pipe(jade({
            pretty: true
        }))
        .on('error', handleError)
        .pipe(gulp.dest(path.html_dist));
});

// STYLUS - CSS

gulp.task('css', function() {
    return gulp.src(path.stylus_src)
        .pipe(newer(path.css_dist))
        .pipe(stylus({
            use: nib(),
            compress: true
        }))
        .on('error', handleError)
        .pipe(gulp.dest(path.css_dist));
});

// IMAGES

gulp.task('img', function() {
    return gulp.src(path.img_src)
        .pipe(imagemin())
        .pipe(gulp.dest(path.img_dist));
});

// JAVASCRIPT

gulp.task('js', function() {
    gulp.src(path.js_src)
        .pipe(concat('main.js'))
        .pipe(jshint())
        .pipe(jshint.reporter(stylish))
        .pipe(uglify())
        .pipe(gulp.dest(path.js_dist))
});

// WATCH

gulp.task('watch', function() {
    gulp.watch(path.jade_src, ['html']);
    gulp.watch(path.stylus_src, ['css']);
    gulp.watch(path.js_src, ['js']);
    gulp.watch(path.img_src, ['img']);
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
