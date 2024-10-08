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
  
  //POPUP
  // Open-popup
  document.querySelectorAll('.js-button').forEach(function(button) {
    button.addEventListener('click', function() {
  
      // Зупиняємо всі відео в слайдері
      document.querySelectorAll('.slid-video').forEach(function(video) {
        video.pause();
        var closestSlide = video.closest('.slid');
        closestSlide.classList.remove('playing'); // видаляємо клас playing
        closestSlide.querySelector('.button-play').classList.remove('button-stop'); // скидаємо кнопку play
      });

      var section = button.closest('section')

      var titleText = section.dataset.title;
      var topText = section.dataset.top;
      var audioSource = section.dataset.audio;

      document.querySelector('.js-popup-title-text').textContent = titleText;
      document.querySelector('.js-popup-top').textContent = topText;
      document.querySelector('.popup-audio-files').setAttribute('src' , audioSource);
        
      var parentElement = document.querySelector('.popup-audio');
      var audioElement = parentElement.querySelector('audio');

      updateVolumeSlider(audioElement, parentElement);
      
      document.querySelector('.popup').classList.add('show');
      document.body.classList.add('body-wrapper');
    });
  });

  var audioFiles = document.querySelector('.popup-audio-files');

  // AUDIO-ELEMENT
  var jsPopupButton = document.querySelector('.js-popup-button');

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

  // action play and pause
  audioFiles.addEventListener('play', function () {
    var parentElement = this.closest('.popup-audio');
    var audioElement = parentElement.querySelector('audio');
    updateProgressWithAnimationFrame(parentElement, audioElement);
  });

  audioFiles.addEventListener('pause', function () {
    cancelAnimationFrame(progressAnimationFrame);
  });

  audioFiles.addEventListener('loadedmetadata', function () {
    var parentElement = this.closest('.popup-audio');
    var audioElement = parentElement.querySelector('audio');
    updateDisplayTime(parentElement, audioElement);
    updateProgressBar(parentElement, audioElement);
  });

  //tracking progress-bar for click
  document.querySelector('.popup').querySelector('.js-progress-bar-container').addEventListener('click', function(e) {
    var parentElement = document.querySelector('.popup-audio');
    var audioElement = parentElement.querySelector('audio');

  // update function
  updateProgressOnClick(e, parentElement, audioElement);
  });

  // reset time in progress-bar
  audioFiles.addEventListener('ended', function () {
    var parentElement = this.closest('.popup-audio');
    var audioElement = parentElement.querySelector('audio');
    
    audioElement.currentTime = 0;

    updateDisplayTime(parentElement, audioElement);
    updateProgressBar(parentElement, audioElement);

    parentElement.querySelector('.js-popup-button').classList.remove('button-stop');
  });

  // Changing the volume "mousedown"
  document.querySelector('.popup-audio').addEventListener('mousedown', function(e) {
    var parentElement = e.currentTarget;
    var audioElement = parentElement.querySelector('audio');
    setVolume(e, parentElement, audioElement); // update

    // var for mousemove function
    var mouseMoveHandler = function (e) {
      setVolume(e, parentElement, audioElement);
    };

    // follow for "mousemove" and "mouseup" on window
    window.addEventListener('mousemove', mouseMoveHandler);

    // Changing the volume "mouseup"
    window.addEventListener('mouseup', function() {
      window.removeEventListener('mousemove', mouseMoveHandler); //unfolow
    }, { once: true }); // only one time
  });

  // CLOSE-POPUP
  var body = document.body;
  var popup = document.querySelector('.popup');
  var popupClose = document.querySelector('.popup-close');

  popupClose.addEventListener('click', function() {
    var parentElement = this.closest('.popup-content');
    var audioElement = parentElement.querySelector('audio');

    stopAndResetAudio(audioElement);
    
    jsPopupButton.classList.remove('button-stop');
    popup.classList.remove('show');
    body.classList.remove('body-wrapper');
  });

  // CLOSE-POPUP when click on window

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


  // SLIDER
  document.querySelectorAll('.slider-section').forEach(function(slider) {
    var arrowRight = slider.querySelector('.arrow-right');
    var arrowLeft = slider.querySelector('.arrow-left');
    var slidsWrapper = slider.querySelector('.slids-wrapper');
    var maxSlideIndex = slider.querySelectorAll('.slid').length - 1;
    var currentSlid = 0;

    // event for arrow-right
    arrowRight.addEventListener('click', function(e) {
      e.preventDefault();
      if (currentSlid < maxSlideIndex) {
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
    var volumeBarContainer = slide.find('.volume-bar-container')[0];

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
    slide.get(0).querySelector('.js-progress-bar-container').addEventListener('click', function(e) { // USING JQWERY obj 
      var slideElement = slide.get(0);
  
      // update function
      updateProgressOnClick(e, slideElement, video);
    });

    // update total time
    video.addEventListener('loadedmetadata', function() {
      var slideElement = slide.get(0);

      updateDisplayTime(slideElement, video);
      updateProgressBar(slideElement, video);
    });

    // action play and pause
    video.addEventListener('play', function () {
      var slideElement = slide.get(0);
      
      updateProgressWithAnimationFrame(slideElement, video);
    });

    video.addEventListener('pause', function () {
      cancelAnimationFrame(progressAnimationFrame);
    });

    // reset time in progress-bar
    video.addEventListener('ended', function () {
      var slideElement = slide.get(0);
      var playButton = slideElement.querySelector('.button-play');

      video.currentTime = 0;

      updateDisplayTime(slideElement, video);
      updateProgressBar(slideElement, video);

      playButton.classList.remove('button-stop'); // change for button-play
      slideElement.classList.remove('playing');
    });

    // Changing the volume "mousedown"
    volumeBarContainer.addEventListener('mousedown', function (e) {
      var domParentElement = slide.get(0); // chenge jQuery for DOM-element
      setVolume(e, domParentElement, video); // updata volume

      // var for mousemove function
      var mouseMoveHandler = function (e) {
        setVolume(e, domParentElement, video);
      };

      // Changing the volume "mouseup"
      var mouseUpHandler = function() {
        window.removeEventListener('mousemove', mouseMoveHandler);
      }

      window.addEventListener('mousemove', mouseMoveHandler);

      window.addEventListener('mouseup', mouseUpHandler, { once: true });
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

function updateProgressWithAnimationFrame(parentElement, mediaElement) {
  updateProgressBar(parentElement, mediaElement);
  updateDisplayTime(parentElement, mediaElement);

  // call the animation again for the next frame
  progressAnimationFrame = requestAnimationFrame(function () {
    updateProgressWithAnimationFrame(parentElement, mediaElement);
  });
}

function updateDisplayTime(parentElement, mediaElement) {
  var currentTime = formatTime(mediaElement.currentTime);
  var duration = mediaElement.duration ? formatTime(mediaElement.duration) : "00:00";

  parentElement.querySelector('.current-time').textContent = currentTime;
  parentElement.querySelector('.total-time').textContent = duration;
}

// progress-bar in audio
function updateProgressBar(parentElement, mediaElement) {
  var progress = (mediaElement.currentTime / mediaElement.duration) * 100;
  parentElement.querySelector('.progress-bar').style.width = progress + '%';
}

// controls volume 
function updateVolumeSlider(mediaElement, parentElement) {
  var volume = mediaElement.volume * 100;
  var volumeSlider = parentElement.querySelector('.volume-slider');
  volumeSlider.style.width = volume + '%';
}

// for updata volume
function setVolume(e, parentElement, mediaElement) {
  var volumeBar = parentElement.querySelector('.volume-bar-container');
  
  var offsetX = e.pageX - volumeBar.getBoundingClientRect().left;
  var totalWidth = volumeBar.offsetWidth;
  var newVolume = Math.min(Math.max(offsetX / totalWidth, 0), 1);

  mediaElement.volume = newVolume; // updata volume
  updateVolumeSlider(mediaElement, parentElement); // updata slider
}

// update progress-bar in media
function updateProgressOnClick(e, parentElement, mediaElement) {
  // calculate % progress-bar
  var offsetX = e.offsetX;
  var totalWidth = e.currentTarget.offsetWidth;;
  var clickPosition = (offsetX / totalWidth) * mediaElement.duration;

  // update time
  mediaElement.currentTime = clickPosition;

  // update progress-bar and show time
  updateProgressBar(parentElement, mediaElement);
  updateDisplayTime(parentElement, mediaElement);
}