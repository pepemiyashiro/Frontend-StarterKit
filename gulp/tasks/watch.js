var config 	  = require('../config.js'),
    gulp 	    = require('gulp');

gulp.task('watch', function() {

    gulp.watch( config.iconfont.source + '/**/*.svg', ['iconfont', 'scss'] );
    gulp.watch( config.sprite.source + '/**/*.{jpg,gif,png}', ['sprite', 'scss'] );
    gulp.watch( config.images.source + '/**/*', ['images', 'scss'] );

    gulp.watch( 
      [
        config.scss.source + '/**/*.scss',
        '!' + config.scss.source + '/2.tools/_iconfont.scss',
        '!' + config.scss.source + '/2.tools/_sprite.scss'
      ],

      ['scss'] 
    );

    /** Watching using watchify **/
    // gulp.watch( [config.javascript.source + '/**/*.js', '!' + config.javascript.source + '/headscripts/*.js' ], ['javascript'] )
    gulp.watch( config.javascript.source + '/headscripts/*.js', ['javascriptOnHead'] );
    gulp.watch( config.jade.source + '/**/*.jade', ['jade'] );

});
