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
    spritesmith  = require('gulp.spritesmith'),
    imageResize  = require('gulp-image-resize'),
    rename  = require('gulp-rename'),
    iconfont  = require('gulp-iconfont'),
    iconfontCss = require('gulp-iconfont-css'),
    gutil = require('gulp-util');


// ===============
// Paths
// ===============


var path = {
    // Bower
    bower: 'bower_components',
    // Jade to HTML
    jade: 'source/jade/*.jade',
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
    return gulp.src(path.jade)
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
        .pipe(changed(path.css_dist))
        .pipe(stylus({
            use: [nib(),rupture()],
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
        .pipe(changed(path.css_dist))
        .pipe(stylus({
            use: [nib(),rupture()],
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
                imgName: 'sprite@2x.png',
                cssName: 'sprite.styl',
                cssFormat: 'stylus',
                algorithm: 'binary-tree',
                cssTemplate: path.stylus+'/template/stylus.template.mustache',
                cssVarMap: function(sprite) {
                    sprite.name = 'spr-' + sprite.name
                }
            }));

    spriteData.img
        .pipe(gulp.dest(path.img_dist));
    spriteData.img
        .pipe(imageResize({
            width : '50%',
            filter: 'Catrom',
            sharpen: true
        }))
        .pipe(rename(function (path) {
            path.basename = "sprite";
        }))
        .pipe(gulp.dest(path.img_dist));
    spriteData.css.pipe(gulp.dest(path.stylus));
});

// JAVASCRIPT

gulp.task('js', function() {
    gulp.src([
            path.bower + '/jquery/dist/jquery.min.js',
            path.bower + '/jquery-validation/dist/jquery.validate.min.js',
            path.js + '/*.js'
        ])
        .pipe(changed(path.js_dist))
        .pipe(concat('main.js'))
        .pipe(gulp.dest(path.js_dist));
    return gulp.src(path.bower + '/modernizr/modernizr.js')
        .pipe(gulp.dest(path.js_dist));
});

gulp.task('js-lint', function() {
    gulp.src([
            path.js + '/*.js'
        ])
        .pipe(changed(path.js_dist))
        .pipe(jshint())
        .pipe(jshint.reporter(stylish));
});

gulp.task('minify-js', function() {
    gulp.src([
            path.bower + '/jquery/dist/jquery.min.js',
            path.bower + '/jquery-validation/dist/jquery.validate.min.js',
            path.js + '/*.js'
        ])
        .pipe(changed(path.js_dist))
        .pipe(uglify())
        .pipe(concat('main.js'))
        .pipe(gulp.dest(path.js_dist));

    return gulp.src(path.bower + '/modernizr/modernizr.js')
        .pipe(uglify())
        .pipe(gulp.dest(path.js_dist));
});

// Icon Task

var fontName = "fonticon"

gulp.task('iconfont', function(){
  gulp.src(path.icons, {base: './dist/fonts'})
    .pipe(changed(path.font_dist + '/iconfont'))
    .pipe(iconfontCss({
      fontName: fontName,
      path:'source/stylus/template/_icons.css',
      targetPath: '../../../source/stylus/iconfont.styl',
      fontPath: '../fonts/iconfont/'
    }))
    .pipe(iconfont({ fontName: fontName }))
    .pipe(gulp.dest(path.font_dist + '/iconfont'));
});

// WATCH

gulp.task('watch', function() {
    gulp.watch(path.jade, ['html']);
    gulp.watch(path.icons, ['iconfont'], ['css'])
    gulp.watch(path.stylus + '/**/*.styl', ['css']);
    gulp.watch(path.js + '/**/*.js', ['js']);
    gulp.watch(path.img_src+'/**/*.*', ['sprite', 'jpg' , 'png']);
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
gulp.task('deploy', ['html', 'iconfont', 'minify-css', 'minify-js', 'sprite', 'jpg', 'js-lint', 'png']);

// DEFAULT
gulp.task('default', ['html', 'iconfont', 'css', 'js', 'sprite', 'jpg', 'js-lint', 'png', 'watch', 'sync']);
