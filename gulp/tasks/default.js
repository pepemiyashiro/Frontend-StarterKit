var gulp 		 = require('gulp'),
    sequence = require('gulp-sequence');

// gulp.task('default', ['browserSync', 'fonts', 'iconfont', 'sprite', 'images', 'scss', 'javascript', 'watch']);
gulp.task('default', sequence( [ 'fonts', 'iconfont', 'sprite', 'images'], 'jade', 'scss', 'javascript', 'watch', 'browserSync') );
