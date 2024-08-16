$(document).ready(function () {
  $('.burger').click(function () {
    $('.js-burger-content').toggleClass('burger-content-open');
    $('.navigational-list').toggleClass('navigational-list-visible');
  });

	$(document).click(function (e) { 
    var menu = $(".navigational-menu");
    if (!menu.is(e.target) && menu.has(e.target).length === 0 ) {
      $('.js-burger-content').removeClass('burger-content-open');
      $('.navigational-list').removeClass('navigational-list-visible');
    }
  }); 

$('.submenu a').click(function () {

  let href = $(this).attr('href');

  $('html, body').animate({
      scrollTop: $(href).offset().top
  }, {
      duration: 700, 
      easing: "linear",
  });

  return false;
});
});