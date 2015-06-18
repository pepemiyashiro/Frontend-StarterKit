// ===========================================================================
// Dependencies
// ===========================================================================
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
    buffer = require('vinyl-buffer'),
    sourcemaps = require('gulp-sourcemaps'),
    gutil = require('gulp-util');


// ===========================================================================
// Paths URL
// ===========================================================================
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



// ===========================================================================
// Error Handler
// ===========================================================================
var onError = function(err) {
    gutil.beep();
    console.log(err);
};


// ===========================================================================
// Tasks
// ===========================================================================

// ===========================================================================
// HTML Task
// ===========================================================================

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
        .pipe(gulp.dest(path.dist))
});


// ===========================================================================
// CSS Task
// ===========================================================================
gulp.task('css', function() {
    
    return gulp.src(path.stylus + '/main.styl')
        .pipe(sourcemaps.init())
        .pipe(plumber({
            errorHandler: onError
        }))
        .pipe(stylint())
        .pipe(changed(path.css_dist))
        .pipe(stylus({
            'include css': true,
            use: [nib(), rupture()],
            compress: true
        }))
        .pipe(rename({
            basename: 'style'
        }))
        .pipe(plumber.stop())
        .pipe(sourcemaps.write('./'))
        .pipe(gulp.dest(path.css_dist))
});


// ===========================================================================
// Image Tasks
// ===========================================================================
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

gulp.task('favicon', function(){
    return gulp.src(path.img_src + '/**/*.ico')
        .pipe(gulp.dest(path.img_dist));
});

gulp.task('sprite', function() {
    
    var spriteData =
        gulp.src(path.img_src + '/sprite/**/*.*')
        .pipe(changed(path.img_src + '/sprite/**/*.*'))
        .pipe(spritesmith({
            imgName: 'sprite.png',
            cssName: 'inc/sprite.styl',
            imgPath: 'sprite.png',
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

// ===========================================================================
// JS Tasks
// ===========================================================================
gulp.task('js', ['js-hint'], function() {
    
    return browserify(path.js + '/main.js')
        .bundle()
        .pipe(source('main.js'))
        .pipe(buffer())
        .pipe(sourcemaps.init({loadMaps:true}))
        .pipe(plumber({
            errorHandler: onError
        }))
        .pipe(uglify())
        .pipe(plumber.stop())
        .pipe(sourcemaps.write('./'))
        .pipe(gulp.dest(path.js_dist))
});


// ===========================================================================
// JS Hint
// ===========================================================================
gulp.task('js-hint', function(cb) {
    
    return gulp.src(path.js + '/**/*.js')
        .pipe(changed(path.js + '/**/*.js'))
        .pipe(plumber({
            errorHandler: onError
        }))
        .pipe(jshint())
        .pipe(jshint.reporter(stylish))
        .pipe(plumber.stop());

    cb(err);
});


// ===========================================================================
// Icon Task
// ===========================================================================
gulp.task('iconfont', function() {
    var fontName = "fonticon";
    return gulp.src(path.icons, {
            base: './dist/fonts'
            })
            .pipe(changed(path.font_dist + '/iconfont'))
            .pipe(iconfontCss({
                fontName: fontName,
                path: 'source/stylus/template/_icons.css',
                targetPath: '../../../source/stylus/inc/iconfont.styl',
                fontPath: '../fonts/iconfont/'
            }))
            .pipe(iconfont({
                fontName: fontName
            }))
            .pipe(gulp.dest(path.font_dist + '/iconfont'));
});


// ===========================================================================
// Clean Task
// ===========================================================================
gulp.task('clean', function(cb) {
    console.log('Cleaning files ...');
    del(['dist/css', 'dist/js', 'dist/img'], cb)
});


// ===========================================================================
// Watch Tasks
// ===========================================================================
gulp.task('watch', function() {
    
    gulp.watch(path.jade + '/**/*.jade', ['html']);
    gulp.watch(path.stylus + '/**/*.styl', ['css']);
    gulp.watch(path.js + '/**/*.js', ['js']);

});

// BROWSER SYNC

gulp.task('sync', function() {
    browserSync.init('dist/**/*', {
        server: {
            baseDir: 'dist/'
        }
    });
});

// ===========================================================================
// Tasks
// ===========================================================================
gulp.task('default', ['html', 'css', 'js', 'watch', 'sync']);

gulp.task('optimize', ['jpg', 'png']);

gulp.task('images', ['sprite', 'iconfont', 'optimize', 'favicon']);

gulp.task('deploy', ['clean', 'images', 'html', 'css', 'js']);

gulp.task('deploy:watch', ['images', 'html', 'css', 'js', 'watch', 'sync']);
