/**	
 * Ejemplo para invocar un módulo
 * @type {broserify}
 */

var example = require('./examples/example');
var jquerySaludo = require('./examples/jquery-saludo');

jquerySaludo.init();


example.log('This is an Exmaple');