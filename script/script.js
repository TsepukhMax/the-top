$(document).ready(function () {
  /*-------Burger---------*/
  $('.burger').on('click' , function () {
    $('.js-burger-content').toggleClass('burger-content-open');
    $('.navigational-list').toggleClass('navigational-list-visible');
  });

	$(document).on('click' , function (e) { 
    var menu = $('.navigational-menu');
    if (!menu.is(e.target) && menu.has(e.target).length === 0 ) {
      $('.js-burger-content').removeClass('burger-content-open');
      $('.navigational-list').removeClass('navigational-list-visible');
    }
  }); 
  /*------submenu---------*/
  $('.js-movie-link').on('click' , function () {
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
  $('.js-button').on('click' , function () {
    var section = $(this).closest('section')

    var titleText = section.attr('data-title');
    var topText = section.attr('data-top');
    var audioSource = section.attr('data-audio');

    $('.js-popup-title-text').text(titleText);
    $('.js-popup-top').text(topText);
    $('.popup-audio-files').attr('src' , audioSource);

    $('.popup').addClass('show');
    $('body').addClass('body-wrapper');
  });

  var audioFiles = $('.popup-audio-files');

  // audio-element
  $('.js-popup-button').on('click' , function () {
    var parentElement = $(this).closest('.popup-audio');
    var audioElement = parentElement.find('audio')[0];

    if (audioElement.paused) {
      audioElement.play();
      $(this).addClass('button-stop');

      // updateProgressBar using setInterval
    if (!progressInterval) {
      progressInterval = setInterval(function () {
        updateDisplayTime(parentElement);
        updateProgressBar(parentElement);
      }, PROGRESS_UPDATE_INTERVAL);
      parentElement.data('progress-interval', progressInterval);
    }

    } else {
      audioElement.pause();
      $(this).removeClass('button-stop');

      //stop updateProgressBar in pause
      clearInterval(progressInterval);
      parentElement.removeData('progress-interval');
    }
  });

  audioFiles.on('loadedmetadata', function () {
    var parentElement = $(this).closest('.popup-audio');
    updateDisplayTime(parentElement);
    updateProgressBar(parentElement);
  });

  audioFiles.on('timeupdate', function () {
    var parentElement = $(this).closest('.popup-audio');
    updateDisplayTime(parentElement);
    updateProgressBar(parentElement);
  });

  // progress-bar in audio
  $('.js-progress-bar-container').on('click' , function (e) {
    var parentElement = $(this).closest('.popup-audio');
    var audioElement = parentElement.find('audio')[0];
    
    // calculate % progress-bar
    var offsetX = e.offsetX;
    var totalWidth = $(this).width();
    var clickPosition = (offsetX / totalWidth) * audioElement.duration;

    // time in progress-bar
    audioElement.currentTime = clickPosition;
    updateProgressBar(parentElement);
  });

  // reset time in progress-bar
  $('.popup-audio-files').on('ended', function () {
    var parentElement = $(this).closest('.popup-audio');
    var audioElement = this;
    
    audioElement.currentTime = 0;

    updateDisplayTime(parentElement);
    updateProgressBar(parentElement);

    parentElement.find('.js-popup-button').removeClass('button-stop');

    // clearInterval in finish audio
    var progressInterval = parentElement.data('progress-interval');
    clearInterval(progressInterval);
    parentElement.removeData('progress-interval');
  });

  // close-popup
  $('.popup-close').on('click' , function () {
    var parentElement = $(this).closest('.popup-content');
    var audioElement = parentElement.find('audio')[0];
    stopAndResetAudio(audioElement);
    $('.js-popup-button').removeClass('button-stop');

    $('.popup').removeClass('show');
    $('body').removeClass('body-wrapper');
  });

  $('.popup').on('click' , function (e) {
    var popUp = $('.popup');

    if (popUp.is(e.target)) {
      var parentElement = $(this).find('.popup-content');
      var audioElement = parentElement.find('audio')[0];
      stopAndResetAudio(audioElement);
      $('.js-popup-button').removeClass('button-stop');

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

    arrowRight.on('click' , function (e) {
      e.preventDefault();
      if (currentSlide <  maxSlideIndex) {
        currentSlide++;
        slidsWrapper.css('margin-left', currentSlide * -100 + '%');
      }
    });

    arrowLeft.on('click' , function (e) {
      e.preventDefault();
      if (currentSlide > 0) {
        currentSlide--;
        slidsWrapper.css('margin-left', currentSlide * -100 + '%');
      }
    });
  });
});

function stopAndResetAudio(audioElement) {
  audioElement.pause();
  audioElement.currentTime = 0;
}

// display-time in audio
function formatTime(seconds) {
  var minutes = Math.floor(seconds / 60);
  var seconds = Math.floor(seconds % 60);
  return minutes + ':' + (seconds < 10 ? '0' : '') + seconds;
}

const PROGRESS_UPDATE_INTERVAL = 1;
var progressInterval;

function updateDisplayTime(parentElement) {
  var audioElement = parentElement.find('audio')[0];
  var currentTime = formatTime(audioElement.currentTime);
  var duration = formatTime(audioElement.duration);

  parentElement.find('.current-time').text(currentTime);
  parentElement.find('.total-time').text(duration);
}

// progress-bar in audio
function updateProgressBar(parentElement) {
  var audioElement = parentElement.find('audio')[0];
  var progress = (audioElement.currentTime / audioElement.duration) * 100;

  parentElement.find('.progress-bar').css('width', progress + '%');
}