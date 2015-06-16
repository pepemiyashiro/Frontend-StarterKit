// ===============
// Dependencies
// ===============
var gulp = require('gulp'),
    stylus = require('gulp-stylus'),
    nib = require('nib'),
    rupture = require('rupture'),
    jade = require('gulp-jade'),
    browserSync = require('browser-sync'),
    concat = require('gulp-concat'),
    uglify = require('gulp-uglify'),
    jshint = require('gulp-jshint'),
    stylish = require('jshint-stylish'),
    changed = require('gulp-changed'),
    imagemin = require('gulp-imagemin'),
    pngmin = require('gulp-pngmin'),
    plumber = require('gulp-plumber'),
    spritesmith = require('gulp.spritesmith'),
    imageResize = require('gulp-image-resize'),
    rename = require('gulp-rename'),
    iconfont = require('gulp-iconfont'),
    iconfontCss = require('gulp-iconfont-css'),
    del = require('del'),
    browserify = require('browserify'),
    source = require('vinyl-source-stream'),
    stylint = require('gulp-stylint'),
    gutil = require('gulp-util');

// ===============
// Paths
// ===============


var path = {
    // Jade to HTML
    jade: 'source/jade',
    // Stylus to CSS
    stylus: 'source/stylus',
    // Javascript
    js: 'source/javascript',
    // Jpg
    jpg: 'source/images/*.jpg',
    // Png
    png: 'source/images/*.png',
    // Fonts
    icons: 'source/svg/icons/**/*.svg',
    // IMG Source
    img_src: 'source/images',
    // IMG
    img_dist: 'dist/img',
    // Dist Folder
    dist: 'dist/',
    css_dist: 'dist/css',
    js_dist: 'dist/js',
    font_dist: 'dist/fonts'
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
    return gulp.src(path.jade + '/*.jade')
        .pipe(plumber({
            errorHandler: onError
        }))
        .pipe(changed(path.dist))
        .pipe(jade({
            pretty: true
        }))
        .pipe(plumber.stop())
        .pipe(gulp.dest(path.dist));
});

// STYLUS - CSS

gulp.task('css', function() {
    return gulp.src(path.stylus + '/style.styl')
        .pipe(plumber({
            errorHandler: onError
        }))
        .pipe(stylint())
        .pipe(changed(path.css_dist))
        .pipe(stylus({
            use: [nib(), rupture()],
            compress: false
        }))
        .pipe(plumber.stop())
        .pipe(gulp.dest(path.css_dist));
});

gulp.task('minify-css', function() {
    return gulp.src(path.stylus + '/style.styl')
        .pipe(plumber({
            errorHandler: onError
        }))
        .pipe(stylint())
        .pipe(changed(path.css_dist))
        .pipe(stylus({
            use: [nib(), rupture()],
            compress: true
        }))
        .pipe(plumber.stop())
        .pipe(gulp.dest(path.css_dist));
});

// IMAGES

gulp.task('jpg', function() {
    return gulp.src(path.jpg)
        .pipe(plumber({
            errorHandler: onError
        }))
        .pipe(changed(path.img_dist))
        .pipe(imagemin())
        .pipe(plumber.stop())
        .pipe(gulp.dest(path.img_dist));
});

gulp.task('png', function() {
    return gulp.src(path.png)
        .pipe(plumber({
            errorHandler: onError
        }))
        .pipe(changed(path.img_dist))
        .pipe(pngmin())
        .pipe(plumber.stop())
        .pipe(gulp.dest(path.img_dist));
});

gulp.task('sprite', function() {
    var spriteData =
        gulp.src(path.img_src + '/sprite/**/*.*')
        .pipe(changed(path.img_src + '/sprite/**/*.*'))
        .pipe(spritesmith({
            imgName: 'sprite.png',
            cssName: 'sprite.styl',
            cssFormat: 'stylus',
            algorithm: 'binary-tree',
            cssTemplate: path.stylus + '/template/stylus.template.mustache',
            cssVarMap: function(sprite) {
                sprite.name = 'spr-' + sprite.name
            }
        }));

    spriteData.img
        .pipe(gulp.dest(path.img_dist));
    spriteData.img
        .pipe(imageResize({
            width: '50%',
            filter: 'Catrom',
            sharpen: true
        }))
        .pipe(rename(function(path) {
            path.basename = "sprite@2x";
        }))
        .pipe(gulp.dest(path.img_dist));
    spriteData.css.pipe(gulp.dest(path.stylus));
});

// JAVASCRIPT

gulp.task('js', function() {
    return browserify(path.js + '/main.js', {
            debug: true
        })
        .bundle()
        .pipe(source('main.js'))
        .pipe(gulp.dest(path.js_dist));
});

gulp.task('minify-js', function() {
    return browserify(path.js + '/main.js')
        .bundle()
        .pipe(source('main.js'))
        .pipe(uglify())
        .pipe(gulp.dest(path.js_dist));
});


// JS Hint

gulp.task('js-hint', function() {
    return gulp.src(path.js + '/**/*.js')
                .pipe(plumber({
                    errorHandler: onError
                }))
                .pipe(jshint())
                .pipe(jshint.reporter(stylish))
                .pipe(plumber.stop());
});

// Icon Task

var fontName = "fonticon"

gulp.task('iconfont', function() {
    gulp.src(path.icons, {
            base: './dist/fonts'
        })
        .pipe(changed(path.font_dist + '/iconfont'))
        .pipe(iconfontCss({
            fontName: fontName,
            path: 'source/stylus/template/_icons.css',
            targetPath: '../../../source/stylus/iconfont.styl',
            fontPath: '../fonts/iconfont/'
        }))
        .pipe(iconfont({
            fontName: fontName
        }))
        .pipe(gulp.dest(path.font_dist + '/iconfont'));
});

// Clean
gulp.task('clean', function(cb) {
    console.log('Cleaning files ...');
    del(['dist/css', 'dist/js', 'dist/img'], cb)
});


// WATCH

gulp.task('watch', function() {
    gulp.watch(path.jade + '/**/*.jade', ['html']);
    gulp.watch(path.icons, ['iconfont', 'css'])
    gulp.watch(path.stylus + '/**/*.styl', ['css']);
    gulp.watch(path.js + '/**/*.js', ['js', 'js-hint']);
    gulp.watch(path.img_src + '/**/*.*', ['sprite', 'jpg', 'png']);
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
gulp.task('deploy', ['html', 'sprite', 'jpg', 'png', 'iconfont', 'minify-css', 'minify-js']);

// DEFAULT
gulp.task('default', ['html', 'sprite', 'jpg', 'png', 'iconfont', 'css', 'js', 'watch', 'sync']);
