// ===============
// Dependencies
// ===============
var gulp = require('gulp'),
    stylus = require('gulp-stylus'),
    nib = require('nib'),
    jade = require('gulp-jade'),
    browserSync = require('browser-sync'),
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
    css: 'dist/css'
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

gulp.task('img', function () {
    return gulp.src(['source/images/*.*'])
        .pipe(imagemin())
        .pipe(gulp.dest('dist/img/'));
});

// WATCH

gulp.task('watch', function() {
    gulp.watch(path.jade, ['html']);
    gulp.watch(path.stylus, ['css']);
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
gulp.task('default', ['html', 'css', 'watch', 'sync']);
