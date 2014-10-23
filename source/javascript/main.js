Main = (function($) {

    var test = "soy test";

    return {
        // Demo
        demo: function() {
            console.log(test);
            console.log($('body'));
        }
    };

})(jQuery);

Main.demo();