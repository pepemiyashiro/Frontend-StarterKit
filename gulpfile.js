// ===============
// Dependencies
// ===============
var gulp = require('gulp'),
    stylus = require('gulp-stylus'),
    nib = require('nib'),
    jade = require('gulp-jade'),
    browserSync = require('browser-sync');

// ===============
// Paths
// ===============

var path = {

		// Jade to HTML
    jade: ['jade/*.jade'],
    html: 'deploy/',

    // Stylus to CSS
    stylus: ['stylus/*.styl'],
    css: 'deploy/css'
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

// WATCH

gulp.task('watch', function() {
    gulp.watch(path.jade, ['html']);
    gulp.watch(path.stylus, ['css']);
});

// BROWSER SYNC

gulp.task('sync', function() {
    browserSync.init('deploy/**/*', {
        server: {
            baseDir: 'deploy/'
        }
    });
});

// DEFAULT
gulp.task('default', ['html', 'css', 'watch', 'sync']);
