var $ = require('jquery');

function init () {
	$('body').prepend('<h1> Este es el módulo jquery saludo </h1>');
}


module.exports = {
	init:init
};