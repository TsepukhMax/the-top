$(document).ready(function () {
  /*-------Burger---------*/
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
  /*------submenu---------*/
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

  /*-------Popup---------*/
  // Open-popup
  $('.js-button').click(function () {
    var section = $(this).closest('section')

    var titleText = section.attr('data-title');
    var topText = section.attr('data-top');
    var audioSource = section.attr('data-audio');

    $('.js-popup-title-text').text(titleText);
    $('.js-popup-top').text(topText);

    var audioElement = $('.js-popup-audio')[0];
    if (audioSource) {
      if (audioElement.src !== audioSource) {
        audioElement.src = audioSource;
        audioElement.load();
      }
    }

    $('.popup').addClass('show');
    $('body').addClass('body-wrapper');
  });

  // audio-buttom
  $('.js-popup-button').click(function () {
    var audioElement = $('.js-popup-audio')[0];

    if (audioElement.paused) {
      audioElement.play();
      $(this).addClass('button-stop');
    } else {
      audioElement.pause();
      $(this).removeClass('button-stop');
    }
  });

  // close-popup
  $('.popup-close').click(function () {
    $('.popup').removeClass('show');
    $('body').removeClass('body-wrapper');
  });

  $('.popup').click(function (e) { 
    var popUp = $('.popup');
    if (popUp.is(e.target)) {
      popUp.removeClass('show');
      $('body').removeClass('body-wrapper');
    }
  });

  /*------Slider------*/
  $('.slider-section').each(function () {
    var slider = $(this);
    var arrowRight = slider.find('.arrow-right');
    var arrowLeft = slider.find('.arrow-left');
    var slidsWrapper = slider.find('.slids-wrapper');
    var maxSlideIndex = slider.find('.slid').length -1;
    var currentSlide = 0;

    arrowRight.click(function (e) {
      e.preventDefault();
      if (currentSlide <  maxSlideIndex) {
        currentSlide++;
        slidsWrapper.css('margin-left', currentSlide * -100 + '%');
      }
    });

    arrowLeft.click(function (e) {
      e.preventDefault();
      if (currentSlide > 0) {
        currentSlide--;
        slidsWrapper.css('margin-left', currentSlide * -100 + '%');
      }
    });
  });
});