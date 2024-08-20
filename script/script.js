$(document).ready(function () {
  $('.burger').click(function () {
    $('.js-burger-content').toggleClass('burger-content-open');
    $('.navigational-list').toggleClass('navigational-list-visible');
  });

	$(document).click(function (e) { 
    var menu = $('.navigational-menu');
    if (!menu.is(e.target) && menu.has(e.target).length === 0 ) {
      $('.js-burger-content').removeClass('burger-content-open');
      $('.navigational-list').removeClass('navigational-list-visible');
    }
  }); 

  $('.js-movie-link').click(function () {
    var href = $(this).attr('href');

    $('html').animate({
      scrollTop: $(href).offset().top
    },{
      duration: 300, 
      easing: 'linear',
    });
    $('.js-burger-content').removeClass('burger-content-open');
    $('.navigational-list').removeClass('navigational-list-visible');
    return false;
  });
  
  /*------------Popup-----------*/
  var popupCall = $('[data-popup]');
  var popupClose = $('[data-close]');
  
  popupCall.click(function (e) {
    e.preventDefault();

    var $this = $(this);
    var popupId = $this.data('popup');

    $(popupId).addClass('show');
    $('body').addClass('body-wrapper');
  });

  popupClose.click(function (e) {
    e.preventDefault();

    var $this = $(this);
    var popupParent = $this.parents('.popup');

    popupParent.removeClass('show');
    $('body').removeClass('body-wrapper');
  });
});