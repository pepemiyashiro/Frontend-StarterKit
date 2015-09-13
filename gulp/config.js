// Set variables
var source = './source';
var dist = './dist';

module.exports = {
	path: {
		source: source,
		dist: dist
	},

	jade: {
		source: source + '/jade',
		dist: dist,
	},

	stylus: {
		source: source + '/stylus',
		dist: dist + '/css',
	},

	iconfont: {
		source: source + '/svgToFont',
		dist: dist + '/iconfont',
		template: './gulp/tasks/iconfont/_icons.css',
		pathToStylus: ''
	},

	browserSync: {
		files: [dist + '/**/*'],
	    server: {
     		// Serve up our build folder
     		baseDir: dist
 		}
 	}

}