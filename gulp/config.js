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

	browserSync: {
		files: [dist + '/**/*'],
	    server: {
     		// Serve up our build folder
     		baseDir: dist
 		}
 	}

}