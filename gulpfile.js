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
    pngmin = require('gulp-pngmin'),
    plumber = require('gulp-plumber'),
    gutil = require('gulp-util');


// ===============
// Paths
// ===============


var path = {

    // Bower
    bower: ['bower_components'],

    // Jade to HTML
    jade: ['source/jade/*.jade'],

    // Stylus to CSS
    stylus: ['source/stylus'],

    // Javascript
    js: ['source/javascript'],

    // Jpg
    jpg: ['source/images/*.jpg'],

    // Png
    png: ['source/images/*.png'],

    // IMG
    img_dist: 'dist/img',

    // Dist Folder
    dist: 'dist/',
    css_dist: 'dist/css',
    js_dist: 'dist/js'
};

// ===============
// Error Handler
// ===============


var onError = function(err) {
    gutil.beep();
    console.log(err);
};


// ===============
// Tasks
// ===============

// JADE - HTML

gulp.task('html', function() {
    return gulp.src(path.jade)
        .pipe(plumber({
            errorHandler: onError
        }))
        .pipe(newer(path.dist))
        .pipe(jade({
            pretty: true
        }))
        .pipe(plumber.stop())
        .pipe(gulp.dest(path.dist));
});

// STYLUS - CSS

gulp.task('css', function() {
    return gulp.src(path.stylus + '/*.styl')
        .pipe(plumber({
            errorHandler: onError
        }))
        .pipe(newer(path.css_dist))
        .pipe(stylus({
            use: nib(),
            compress: false
        }))
        .pipe(plumber.stop())
        .pipe(gulp.dest(path.css_dist));
});

gulp.task('minify-css', function() {
    return gulp.src(path.stylus + '/*.styl')
        .pipe(plumber({
            errorHandler: onError
        }))
        .pipe(newer(path.css_dist))
        .pipe(stylus({
            use: nib(),
            compress: true
        }))
        .pipe(plumber.stop())
        .pipe(gulp.dest(path.css_dist));
});

// JPG

gulp.task('jpg', function() {
    return gulp.src(path.jpg)
        .pipe(plumber({
            errorHandler: onError
        }))
        .pipe(imagemin())
        .pipe(plumber.stop())
        .pipe(gulp.dest(path.img_dist));
});


// PNG

gulp.task('png', function() {
    return gulp.src(path.png)
        .pipe(plumber({
            errorHandler: onError
        }))
        .pipe(pngmin())
        .pipe(plumber.stop())
        .pipe(gulp.dest(path.img_dist));
});

// JAVASCRIPT

gulp.task('js', function() {
    gulp.src([
            path.bower + '/jquery/dist/jquery.min.js',
            path.bower + '/jquery-validation/dist/jquery.validate.min.js',
            path.js + '/*.js'
        ])
        .pipe(concat('main.js'))
        .pipe(gulp.dest(path.js_dist));
    return gulp.src(path.bower + '/modernizr/modernizr.js')
        .pipe(gulp.dest(path.js_dist));
});

gulp.task('js-lint', function() {
    gulp.src([
            path.js + '/*.js'
        ])
        .pipe(jshint())
        .pipe(jshint.reporter(stylish));
});

gulp.task('minify-js', function() {
    gulp.src([
            path.bower + '/jquery/dist/jquery.min.js',
            path.bower + '/jquery-validation/dist/jquery.validate.min.js',
            path.js + '/*.js'
        ])
        .pipe(uglify())
        .pipe(concat('main.js'))
        .pipe(gulp.dest(path.js_dist));

    return gulp.src(path.bower + '/modernizr/modernizr.js')
        .pipe(uglify())
        .pipe(gulp.dest(path.js_dist));
});

// WATCH

gulp.task('watch', function() {
    gulp.watch(path.jade, ['html']);
    gulp.watch(path.stylus + '/**/*.styl', ['css']);
    gulp.watch(path.js + '/**/*.js', ['js']);
    gulp.watch(path.jpg, ['jpg']);
    gulp.watch(path.png, ['png']);
});

// BROWSER SYNC

gulp.task('sync', function() {
    browserSync.init('dist/**/*', {
        server: {
            baseDir: 'dist/'
        }
    });
});

// DEPLOY
gulp.task('deploy', ['html', 'minify-css', 'minify-js', 'jpg', 'js-lint', 'png']);

// DEFAULT
gulp.task('default', ['html', 'css', 'js', 'jpg', 'js-lint', 'png', 'watch', 'sync']);
