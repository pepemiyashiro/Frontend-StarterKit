var config      = require('../config.js').stylus,
errorHandler    = require('../helpers/errorHandler.js'),
gulp    	    = require('gulp'),
stylus          = require('gulp-stylus'),
minifyCss 	    = require('gulp-minify-css'),
nib             = require('nib'),
rupture         = require('rupture'),
jeet            = require('jeet'),
axis            = require('axis'),
autoprefixer    = require('autoprefixer-stylus'),
sourcemaps      = require('gulp-sourcemaps'),
plumber         = require('gulp-plumber'),
rename          = require('gulp-rename'),
changed         = require('gulp-changed');

gulp.task('stylus',function() {
    gulp.src(config.source + '/main.styl')
        .pipe(sourcemaps.init())
        .pipe(plumber({
            errorHandler: errorHandler
        }))
        .pipe(changed(config.dist))
        .pipe(stylus({
            'include css': true,
            use: [axis(), nib(), rupture(), jeet(), autoprefixer()],
            compress: false,
            errors: true
        }))
        .pipe(rename({
            basename: 'style'
        }))
        .pipe(plumber.stop())
        .pipe(minifyCss())
        .pipe(sourcemaps.write('./'))
        .pipe(gulp.dest(config.dist))
});