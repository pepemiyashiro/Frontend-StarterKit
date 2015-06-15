/**	
 * Ejemplo para invocar un módulo
 * @type {broserify}
 */

var $ = require('jquery');
var example = require('./example');

$('body').prepend("<h1>Auntpoison Boilerplate</h1>");
example.log('This is an Exmaple');