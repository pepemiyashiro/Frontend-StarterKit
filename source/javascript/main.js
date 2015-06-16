/**	
 * Ejemplo para invocar un módulo
 * @type {broserify}
 */

var example = require('./example');
var jquerySaludo = require('./jquery-saludo');

jquerySaludo.init();


example.log('This is an Exmaple');