/*Dropdown Menu*/
$('.dd').click(function () {
        $(this).attr('tabindex', 1).focus();
        $(this).toggleClass('active');
        $(this).find('.dd-menu').slideToggle(300);
    });
    $('.dd').focusout(function () {
        $(this).removeClass('active');
        $(this).find('.dd-menu').slideUp(300);
    });
    $('.dd .dd-menu li').click(function () {
        $(this).parents('.dd').find('span').text($(this).text());
        $(this).parents('.dd').find('input').attr('value', $(this).attr('id'));
    });