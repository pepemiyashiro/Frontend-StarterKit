global.jQuery = require('jquery');
var flexslider = require('flexslider');
var $ = jQuery;

function init() {
    if (console) console.log("sliders");
    $('.Slider').flexslider({});
}

module.exports = {
    init: init
};