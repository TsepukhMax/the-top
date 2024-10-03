$(document).ready(function () {

  //BURGER MENU
  var burger = document.querySelector('.burger');
  var burgerContent = document.querySelector('.js-burger-content');
  var navigationalList = document.querySelector('.navigational-list');
  var menu = document.querySelector('.navigational-menu');

  // click for burger
  burger.addEventListener('click', function() {
    burgerContent.classList.toggle('burger-content-open');
    navigationalList.classList.toggle('navigational-list-visible');
  });

  // close burger menu if click no burger
  document.addEventListener('click', function(e) {
    if (!menu.contains(e.target) && !burger.contains(e.target)) {
      burgerContent.classList.remove('burger-content-open');
      navigationalList.classList.remove('navigational-list-visible');
    }
  });

  // SUBMENU
  var jsMovieLink = document.querySelectorAll('.js-movie-link');

  jsMovieLink.forEach(function(link) {
    link.addEventListener('click', function(event) {
      // cancel standart behavior for link
      event.preventDefault();

      // get href
      var href = this.getAttribute('href');
      var targetElement = document.querySelector(href);

      // get position element
      var targetPosition = targetElement.offsetTop;

      // scroll to element
      window.scrollTo({
        top: targetPosition,
        behavior: 'smooth' // animation
      });

      // close burger menu
      document.querySelector('.js-burger-content').classList.remove('burger-content-open');
      document.querySelector('.navigational-list').classList.remove('navigational-list-visible');
    });
  });
  
  /*-------Popup---------*/
  // Open-popup
  $('.js-button').on('click' , function () {
    
    // Зупиняємо всі відео в слайдері
    $('.slid-video').each(function () {
      this.pause();  // зупиняємо відео
      $(this).closest('.slid').removeClass('playing');  // видаляємо клас playing
      $(this).closest('.slid').find('.button-play').removeClass('button-stop'); // скидаємо кнопку play
    });

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

  // AUDIO-ELEMENT
  var jsPopupButton = document.querySelector('.js-popup-button');

  if (jsPopupButton) {
    jsPopupButton.addEventListener('click', function() {
      var parentElement = this.closest('.popup-audio');
      var audioElement = parentElement.querySelector('audio');
      
      if (audioElement.paused) {
        audioElement.play();
        this.classList.add('button-stop');
      } else {
        audioElement.pause();
        this.classList.remove('button-stop');
      }
    });
  };

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
  $('.popup-audio').find('.volume-bar-container').on('mousedown', function (e) {
    var parentElement = $(this).closest('.popup-audio');
    var audioElement = parentElement.find('audio')[0];
    setVolume(e, parentElement, audioElement); // update

    // var for mousemove function
    var mouseMoveHandler = function (e) {
      setVolume(e, parentElement, audioElement);
    };

    // follow for "mousemove" and "mouseup" on window
    $(window).on('mousemove', mouseMoveHandler);

    // Changing the volume "mouseup"
    $(window).one('mouseup', function () {
      $(window).off('mousemove' , mouseMoveHandler); // unfollow 
    });
  });

  // CLOSE-POPUP
  var body = document.body;
  var popup = document.querySelector('.popup');
  var popupClose = document.querySelector('.popup-close');

  if (popupClose) {
    popupClose.addEventListener('click', function() {
      var parentElement = this.closest('.popup-content');
      var audioElement = parentElement.querySelector('audio');

      stopAndResetAudio(audioElement);
      
      jsPopupButton.classList.remove('button-stop');
      popup.classList.remove('show');
      body.classList.remove('body-wrapper');
    });
  }

  // CLOSE-POPUP when click on window
  if (popup) {
    popup.addEventListener('click', function(e) {
    
      if (e.target === popup) {
        var parentElement = this.querySelector('.popup-content');
        var audioElement = parentElement.querySelector('audio');
        
        stopAndResetAudio(audioElement);
        
        jsPopupButton.classList.remove('button-stop');
        popup.classList.remove('show');
        body.classList.remove('body-wrapper');
      }
    });
  }


  // SLIDER
  document.querySelectorAll('.slider-section').forEach(function(slider){
    var arrowRight = slider.querySelector('.arrow-right');
    var arrowLeft = slider.querySelector('.arrow-left');
    var slidsWrapper = slider.querySelector('.slids-wrapper');
    var slid = slider.querySelectorAll('.slid');
    var currentSlid = 0;

    // event for arrow-right
    arrowRight.addEventListener('click', function(e) {
      e.preventDefault();
      if (currentSlid < slid.length - 1) {
        currentSlid++;
        slidsWrapper.style.marginLeft = currentSlid * -100 + '%';
      }
    });

    // event for arrow-left
    arrowLeft.addEventListener('click', function(e) {
      e.preventDefault();
      if (currentSlid > 0) {
        currentSlid--;
        slidsWrapper.style.marginLeft = currentSlid * -100 + '%';
      }
    });
  })

  // add video for slid
  $('.slid').each(function () {
    var slide = $(this);
    var video = slide.find('.slid-video')[0];
    var playButton = slide.find('.button-play');
    var volumeBarContainer = slide.find('.volume-bar-container');

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

    // update total time
    $(video).on('loadedmetadata', function() {
      updateDisplayTime(slide, video);
      updateProgressBar(slide, video);
    });

    // action play and pause
    $(video).on('play', function () {
      updateProgressWithAnimationFrame(slide, video);
    });

    $(video).on('pause', function () {
      cancelAnimationFrame(progressAnimationFrame);
    });

    // reset time in progress-bar
    $(video).on('ended', function () {

      video.currentTime = 0;

      updateDisplayTime(slide, video);
      updateProgressBar(slide, video);

      playButton.removeClass('button-stop'); // change for button-play
      slide.removeClass('playing');
    });

    // Changing the volume "mousedown"
    volumeBarContainer.on('mousedown', function (e) {
      setVolume(e, slide, video); // updata volume

      // var for mousemove function
      var mouseMoveHandler = function (e) {
        setVolume(e, slide, video);
      };

      $(window).on('mousemove', mouseMoveHandler);

      // Changing the volume "mouseup"
      $(window).one('mouseup', function () {
        $(window).off('mousemove', mouseMoveHandler);
      });
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
function updateVolumeSlider(mediaElement, parentElement) {
  var volume = mediaElement.volume * 100;
  parentElement.find('.volume-slider').css('width', volume + '%');
}

// for updata volume
function setVolume(e, parentElement, mediaElement) {
  var volumeBar = parentElement.find('.volume-bar-container');
  var offsetX = e.pageX - volumeBar.offset().left;
  var totalWidth = volumeBar.width();
  var newVolume = Math.min(Math.max(offsetX / totalWidth, 0), 1);

  mediaElement.volume = newVolume; // updata volume
  updateVolumeSlider(mediaElement, parentElement); // updata slider
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