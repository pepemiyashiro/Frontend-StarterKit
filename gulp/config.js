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

	scss: {
		source: source + '/scss',
		dist: dist + '/css'
	},

	javascript: {
		source: source + '/javascript',
		headscripts: source + '/javascript/headscripts',
		dist: dist + '/js'
	},

	iconfont: {
		// Must be se the css pre procesor extention dinamically
		base: dist,
		source: source + '/svgToFont',
		dist: dist + '/iconfont',
		template: './gulp/tasks/iconfont/_icons.css',
		// Path to load the fonts on CSS tempalte
		fontPath: '../iconfont/',
		// Path Relative to the base
		exportTo: '../../source/scss/2.tools/_iconfont.scss',
		fontName: 'fonticon'
	},

	images:{
		source: source + '/images',
		dist: dist + '/img',
		jpg: source + '/images/*.jpg',
		png: source + '/images/*.png',
		ico: source + '/images/*.ico'
	},

	sprite:{
		source: source + '/sprite',
		dist: dist + '/img/sprites',
		templatePath: './gulp/tasks/sprite/template.mustache',
		mixinPath: source + '/scss/2.tools'
	},

	fonts:{
		source: source + '/fonts',
		dist: dist
	},

	browserSync: {
		files: [dist + '/**/*'],
	    server: {
     		// Serve up our build folder
     		baseDir: dist
 		},

 		dist: dist
 	}

}