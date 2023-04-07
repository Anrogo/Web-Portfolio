$(document).ready(function() {
    $(window).scroll(function() {
            if ($(window).scrollTop() > 40) {
                //console.log("Has sobrepasado el header");
                //Fijamos el menu superior:
                $('.hero .nav').attr('id', 'menu-fixed');
                $('section.presentation.container').css('margin-top', '150px');
                $('section.hero__container').css('margin-top', '150px');
                $('#menu-fixed').fadeIn("slow", function() {});
            } else {
                $('.hero .nav').attr('id', '');
                $('section.presentation.container').css('margin-top', '0');
                $('section.hero__container').css('margin-top', '0');
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