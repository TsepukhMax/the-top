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

    var parentElement = $('.popup-audio');
    var audioElement = parentElement.find('audio')[0];

    updateVolumeSlider(audioElement, parentElement);
    
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
    } else {
      audioElement.pause();
      $(this).removeClass('button-stop');
    }
  });

  // action play and pause
  audioFiles.on('play', function () {
    var parentElement = $(this).closest('.popup-audio');
    var audioElement = parentElement.find('audio')[0];
    updateProgressWithAnimationFrame(parentElement, audioElement);
  });

  audioFiles.on('pause', function () {
    cancelAnimationFrame(progressAnimationFrame);
  });

  audioFiles.on('loadedmetadata', function () {
    var parentElement = $(this).closest('.popup-audio');
    var audioElement = parentElement.find('audio')[0];
    updateDisplayTime(parentElement , audioElement);
    updateProgressBar(parentElement , audioElement);
  });

  //tracking progress-bar for click
  $('.popup').find('.js-progress-bar-container').on('click', function(e) {
    var parentElement = $(this).closest('.popup-audio');
    var audioElement = parentElement.find('audio')[0];

  // update function
  updateProgressOnClick(e, parentElement, audioElement);
});

  // reset time in progress-bar
  audioFiles.on('ended', function () {
    var parentElement = $(this).closest('.popup-audio');
    var audioElement = this;
    
    audioElement.currentTime = 0;

    updateDisplayTime(parentElement , audioElement);
    updateProgressBar(parentElement , audioElement);

    parentElement.find('.js-popup-button').removeClass('button-stop');
  });

  // Changing the volume "mousedown"
  $('.volume-bar-container').on('mousedown', function (e) {
    var parentElement = $(this).closest('.popup-audio');
    setVolume(e, parentElement); // update

    // var for mousemove function
    var mouseMoveHandler = function (e) {
      setVolume(e, parentElement);
    };

    // follow for "mousemove" and "mouseup" on window
    $(window).on('mousemove', mouseMoveHandler);

    // Changing the volume "mouseup"
    $(window).one('mouseup', function () {
      $(window).off('mousemove' , mouseMoveHandler); // unfollow 
    });
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

  // add video for slid
  $('.slid').each(function () {
    var slide = $(this);
    var video = slide.find('.slid-video')[0];
    var playButton = slide.find('.button-play');

    // click for button Play/Stop
    playButton.on('click', function () {

      // stop other Video
      $('.slid').each(function () {
        var otherSlide = $(this);
        var otherVideo = otherSlide.find('.slid-video')[0];

        if (otherVideo !== video) { //check for no stop this video
          otherVideo.pause(); 
          $(otherSlide).removeClass('playing');
          $(otherSlide).find('.button-play').removeClass('button-stop'); //change for button-play
        }
      });

      //stop or play this video
      if (video.paused) {
        video.play();
        playButton.addClass('button-stop'); // change for button-stop
        slide.addClass('playing'); 
      } else {
        video.pause();
        playButton.removeClass('button-stop'); // change for button-play
        slide.removeClass('playing');
      }
    });

    // tracking progress-bar for click
    slide.find('.js-progress-bar-container').on('click', function(e) {
      var parentElement = $(this).closest('.slid');
    
      // update function
      updateProgressOnClick(e, parentElement, video);
    });

    // update playback time
    $(video).on('timeupdate', function() {
      updateDisplayTime(slide, video);
      updateProgressBar(slide, video);
    });

    // update total time
    $(video).on('loadedmetadata', function() {
      updateDisplayTime(slide, video);
      updateProgressBar(slide, video);
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

var progressAnimationFrame;

function updateProgressWithAnimationFrame(parentElement , mediaElement) {
  updateProgressBar(parentElement , mediaElement);
  updateDisplayTime(parentElement , mediaElement);

  // call the animation again for the next frame
  progressAnimationFrame = requestAnimationFrame(function () {
    updateProgressWithAnimationFrame(parentElement, mediaElement);
  });
}

function updateDisplayTime(parentElement , mediaElement) {

  var currentTime = formatTime(mediaElement.currentTime);
  var duration = mediaElement.duration ? formatTime(mediaElement.duration) : "00:00";

  parentElement.find('.current-time').text(currentTime);
  parentElement.find('.total-time').text(duration);
}

// progress-bar in audio
function updateProgressBar(parentElement, mediaElement) {
  var progress = (mediaElement.currentTime / mediaElement.duration) * 100;
  parentElement.find('.progress-bar').css('width', progress + '%');
}

// controls volume 
function updateVolumeSlider(audioElement, parentElement) {
  var volume = audioElement.volume * 100;
  parentElement.find('.volume-slider').css('width', volume + '%');
}

// for updata volume
function setVolume(e, parentElement) {
  var volumeBar = parentElement.find('.volume-bar-container');
  var audioElement = parentElement.find('audio')[0];
  
  var offsetX = e.pageX - volumeBar.offset().left;
  var totalWidth = volumeBar.width();
  var newVolume = Math.min(Math.max(offsetX / totalWidth, 0), 1);

  audioElement.volume = newVolume; // updata volume
  updateVolumeSlider(audioElement, parentElement); // updata slider
}

// update progress-bar in media
function updateProgressOnClick(e, parentElement, mediaElement) {
  // calculate % progress-bar
  var offsetX = e.offsetX;
  var totalWidth = $(e.currentTarget).width();
  var clickPosition = (offsetX / totalWidth) * mediaElement.duration;

  // update time
  mediaElement.currentTime = clickPosition;

  // update progress-bar and show time
  updateProgressBar(parentElement, mediaElement);
  updateDisplayTime(parentElement, mediaElement);
}