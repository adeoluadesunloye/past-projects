window.addEventListener('scroll', function () {
    let header = document.querySelector('.navbar-logo');
    let logo = document.querySelector('.smaller-logo');
    let windowPosition = window.scrollY > 50;
    header.classList.toggle('first-scroll-active', windowPosition);
    logo.classList.toggle('second-scroll-active', windowPosition);
})

// $(document).ready(function() {
//     $("#product-slider").owlCarousel({
//         items : 6,
//         itemsDesktop:[1199,2],
//         itemsDesktopSmall:[980,2],
//         itemsMobile : [700,1],
//         pagination:false,
//         navigation:true,
//         navigationText:["",""],
//         autoPlay:true
//     });
// });

$(document).ready(function(){


    $('.product-slider').owlCarousel({
        loop:true,
        nav:true,
        items:3,
        autoplay:true,
        // center:true,
        responsive:{
            0:{
                items:1,
                nav:true
            },
            600:{
                items:2
            },
            1000:{
                items:4
            }
        }
    });

});
