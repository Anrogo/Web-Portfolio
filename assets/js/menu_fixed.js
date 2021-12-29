$(document).ready(function() {
    $(window).scroll(function() {
            if ($(window).scrollTop() > 50) {
                //console.log("Has sobrepasado el header");
                //Fijamos el menu superior:
                $('.hero .nav').attr('id', 'menu-fixed');
                $('.hero__container').css('margin-top', '150px');
                $('#menu-fixed').fadeIn("slow", function() {});
            } else {
                $('.hero .nav').attr('id', '');
                $('.hero__container').css('margin-top', '0');
                $('#menu-fixed').fadeOut("slow", function() {});
            }
        })
        /**
            $('a#srolltotop').click(function(){
                    $('html, body').animate({scrollTop:0}, 100);
                    return false;
            });
         */

});