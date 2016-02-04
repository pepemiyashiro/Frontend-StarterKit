var config      	= require('../../config.js').sprite,
	errorHandler	= require('../../helpers/errorHandler.js'),
    isProduction    = require('../../helpers/isProduction.js'),
    reload          = require('../../helpers/reload.js'),
    gulp     	    = require('gulp'),
    gutil           = require('gulp-util'),
	spritesmith 	= require('gulp.spritesmith'),
	changed     	= require('gulp-changed'),
	rename      	= require('gulp-rename'),
    imagemin        = require('gulp-imagemin'),
    pngmin          = require('gulp-pngmin'),
    merge           = require('merge-stream'),
    plumber         = require('gulp-plumber');


gulp.task('sprite', function() {
    
    var spriteData = gulp.src( config.source + '/**/*.{png,jpg,gif}' )
        .pipe(plumber({
            errorHandler: errorHandler
        }))
        .pipe( changed( config.dist + '/*.png' ) )
        .pipe( spritesmith (
            {
                retinaSrcFilter: config.source + '/**/*@2x.*',
                imgName: 'sprite.png',
                retinaImgName: 'sprite@2x.png',
    	        cssName: '_sprite.scss',
                imgPath: '../img/sprites/sprite.png',
                retinaImgPath: '../img/sprites/sprite@2x.png',
                cssFormat: 'scss',
                algorithm: 'binary-tree',
                cssTemplate: config.templatePath,
                cssVarMap: function( sprite ) {
                    sprite.name = 'spr-' + sprite.name
                }
        	})
        );

    var imgStream = spriteData.img
        .pipe( isProduction === true ? pngmin() : gutil.noop() )
        .pipe(plumber.stop())
        .pipe(gulp.dest(config.dist))

    var cssStream = spriteData.css
        .pipe(gulp.dest(config.mixinPath));

    return merge(imgStream, cssStream).pipe( reload() );
});
