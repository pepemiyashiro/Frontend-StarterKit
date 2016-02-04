global.jQuery = require('./vendor/jquery-1.11.3');
// var ClassTest =  require('./inc/ClassTest');
import {ClassTest} from './inc/ClassTest';

var $ = jQuery;

var test = require('./inc/test');

const MAX_HEIGHT = 100;

console.log(MAX_HEIGHT);

console.log(test(2));

console.log( $ );



let ct = new ClassTest();

ct.sayHi("Pepe");