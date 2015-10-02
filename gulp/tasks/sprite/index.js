var config      	= require('../../config.js').sprite,
		errorHandler	= require('../../helpers/errorHandler.js'),
		gulp     			= require('gulp'),
		spritesmith 	= require('gulp.spritesmith'),
		changed     	= require('gulp-changed'),
		rename      	= require('gulp-rename'),
		imageResize 	= require('gulp-image-resize'),
    plumber       = require('gulp-plumber');


gulp.task('sprite', function() {
    
  var spriteData = gulp.src( config.source + '/**/*.*' )
  	.pipe(plumber({
  	    errorHandler: errorHandler
  	}))
    .pipe( changed( config.source + '/**/*.*' ) )
    .pipe( spritesmith (
    	{
	      imgName: 'sprite.png',
	      cssName: 'inc/sprite.styl',
        // imgPath: '../img/sprite.png',
	      // cssFormat: 'stylus',
	      algorithm: 'binary-tree'
	      // cssTemplate: config.template,
	      // cssVarMap: function( sprite ) {
	      //    sprite.name = 'spr-' + sprite.name
	      // }
    	}) 
    );
    // .pipe(plumber.stop());

  spriteData.img
      .pipe(gulp.dest(config.dist))
      .pipe(plumber.stop());

  spriteData.img
    .pipe(imageResize(
    	{
        width: '50%',
        filter: 'Catrom',
        sharpen: true
    	})
   	)
    .pipe(rename(function(name) {
      name.basename = "sprite@2x";
    }))
    .pipe(plumber.stop())
    .pipe(gulp.dest(config.dist));
      
  spriteData.css.pipe(gulp.dest(config.stylusPath));
});
