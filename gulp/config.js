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
		dist: dist
	},

	stylus: {
		source: source + '/stylus',
		dist: dist + '/css'
	},

	iconfont: {
		base: dist,
		source: source + '/svgToFont',
		dist: dist + '/iconfont',
		template: './gulp/tasks/iconfont/_icons.css',
		// Path to load the fonts on CSS tempalte
		fontPath: '../iconfont/',
		pathToStylusInc: '../../source/stylus/inc/iconfont.styl',
		fontName: 'fonticon'
	},

	browserSync: {
		files: [dist + '/**/*'],
	    server: {
     		// Serve up our build folder
     		baseDir: dist
 		}
 	}

}