var config      	= require('../../config.js').sprite,
		errorHandler	= require('../../helpers/errorHandler.js'),
		gulp     			= require('gulp'),
		spritesmith 	= require('gulp.spritesmith'),
		changed     	= require('gulp-changed'),
		rename      	= require('gulp-rename'),
		imageResize 	= require('gulp-image-resize'),
    plumber       = require('gulp-plumber');


gulp.task('sprite', function() {
    
  var spriteData = gulp.src( config.source + '/**/*.{png,jpg,gif}' )
    .pipe( changed( config.source + '/**/*.{png,jpg,gif}' ) )
    .pipe( spritesmith (
    	{
        retinaSrcFilter: config.source + '/**/*@2x.*',
        imgName: 'sprite.png',
	      retinaImgName: 'sprite@2x.png',
	      cssName: 'inc/sprite.styl',
        imgPath: '../img/sprite.png',
        retinaImgPath: '../img/sprite@2x.png',
	      cssFormat: 'stylus',
	      algorithm: 'binary-tree',
	      cssTemplate: config.templatePath,
	      cssVarMap: function( sprite ) {
	         sprite.name = 'spr-' + sprite.name
	      }
    	}) 
    );

  spriteData.img.pipe(gulp.dest(config.dist))
  spriteData.css.pipe(gulp.dest(config.stylusPath));
});
