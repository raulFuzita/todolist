$(document).ready(() => {
    $(window).scroll(() => {
        if ($(this).scrollTop() > 20)
            $("#back-to-top").css("display", "block")
        else 
            $("#back-to-top").css("display", "none")
    })
})

$('#back-to-top').click(() => {
    $('html, body').animate({scrollTop : 0},800);
})