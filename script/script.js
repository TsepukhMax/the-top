document.addEventListener('DOMContentLoaded', () => {

  const parentPopupElement = document.querySelector('.popup-audio');
  const audioPopupElement = parentPopupElement.querySelector('audio');
  // ----Start play-button function for popup------
  const buttonPlaying = new PlayButtonComponent ((playing) => {

    if (playing) {
      audioPopupElement.play(); // for "playing" on audio
    } else {
      audioPopupElement.pause(); // for "playing" off audio (pause)
    }
  });

  // create and render the buttonPlayingEl ---OOP---
  const buttonPlayingEl = buttonPlaying.render();
  parentPopupElement.appendChild(buttonPlayingEl);

  // create and render the displayTime ---OOP---
  const displayTime = new DisplayTimeComponent(audioPopupElement);
  parentPopupElement.appendChild(displayTime.render());

  // create and render the volumeBar ---OOP---
  const volumeBar = new VolumeBarComponent(audioPopupElement);
  parentPopupElement.appendChild(volumeBar.render());

  // create and render the progressBar ---OOP---
  const progressBar = new ProgressBarComponent(audioPopupElement, () => {
    displayTime.updateDisplayTime(); // callback to update time
  });
  parentPopupElement.appendChild(progressBar.render());


  //BURGER MENU
  const burger = document.querySelector('.burger');
  const burgerContent = document.querySelector('.js-burger-content');
  const navigationalList = document.querySelector('.navigational-list');
  const menu = document.querySelector('.navigational-menu');

  // click for burger
  burger.addEventListener('click', () => {
    burgerContent.classList.toggle('burger-content-open');
    navigationalList.classList.toggle('navigational-list-visible');
  });

  // close burger menu if click no burger
  document.addEventListener('click', (e) => {
    if (!menu.contains(e.target) && !burger.contains(e.target)) {
      burgerContent.classList.remove('burger-content-open');
      navigationalList.classList.remove('navigational-list-visible');
    }
  });

  // SUBMENU
  const jsMovieLink = document.querySelectorAll('.js-movie-link');

  jsMovieLink.forEach((link) => {
    link.addEventListener('click', (event) => {
      // cancel standart behavior for link
      event.preventDefault();

      // get href
      const href = event.currentTarget.getAttribute('href');
      const targetElement = document.querySelector(href);

      // get position element
      const targetPosition = targetElement.offsetTop;

      // scroll to element
      smoothScrollTo(targetPosition, DURATION_SCROLL);

      // close burger menu
      document.querySelector('.js-burger-content').classList.remove('burger-content-open');
      document.querySelector('.navigational-list').classList.remove('navigational-list-visible');
    });
  });
  
  //POPUP
  // Open-popup
  document.querySelectorAll('.js-button').forEach((button) => {
    button.addEventListener('click', () => {
  
      // Зупиняємо всі відео в слайдері
      document.querySelectorAll('.slid-video').forEach((video) => {
        video.pause();
        const closestSlide = video.closest('.slid');
        closestSlide.classList.remove('playing'); // видаляємо клас playing
        closestSlide.querySelector('.button-play').classList.remove('button-stop'); // скидаємо кнопку play
      });

      const section = button.closest('section')

      const titleText = section.dataset.title;
      const topText = section.dataset.top;
      const audioSource = section.dataset.audio;

      document.querySelector('.js-popup-title-text').textContent = titleText;
      document.querySelector('.js-popup-top').textContent = topText;
      document.querySelector('.popup-audio-files').setAttribute('src' , audioSource);

      volumeBar.updateVolumeSlider();
      
      document.querySelector('.popup').classList.add('show');
      document.body.classList.add('body-wrapper');
    });
  });

  const audioFiles = document.querySelector('.popup-audio-files');

  // action play and pause
  audioFiles.addEventListener('play', (event) => {
    const parentElement = event.currentTarget.closest('.popup-audio');
    const audioElement = parentElement.querySelector('audio');
    updateProgressWithAnimationFrame(parentElement, audioElement, displayTime, progressBar);
  });

  audioFiles.addEventListener('pause', () => {
    cancelAnimationFrame(progressAnimationFrame);
  });

  audioFiles.addEventListener('loadedmetadata', () => {
    progressBar.updateProgressBar();
    displayTime.updateDisplayTime();
  });

  // reset time in progress-bar
  audioFiles.addEventListener('ended', (event) => {
    const parentElement = event.currentTarget.closest('.popup-audio');
    const audioElement = parentElement.querySelector('audio');
    
    audioElement.currentTime = 0;

    progressBar.updateProgressBar();
    displayTime.updateDisplayTime();

    buttonPlaying.reset();
  });

  // CLOSE-POPUP
  const body = document.body;
  const popupClose = document.querySelector('.popup-close');
  popupClose.addEventListener('click', (e) => {
    const parentElement = e.currentTarget.closest('.popup-content');
    const audioElement = parentElement.querySelector('audio');

    stopAndResetAudio(audioElement);

    buttonPlaying.reset();
    popup.classList.remove('show');
    body.classList.remove('body-wrapper');
  });

  // CLOSE-POPUP when click on window
  const popup = document.querySelector('.popup');
  popup.addEventListener('click', (e) => {

    if (e.target === popup) {
      const parentElement = popup.querySelector('.popup-content');
      const audioElement = parentElement.querySelector('audio');
      
      stopAndResetAudio(audioElement);

      buttonPlaying.reset();
      popup.classList.remove('show');
      body.classList.remove('body-wrapper');
    }
  });

  // SLIDER
  document.querySelectorAll('.slider-section').forEach((slider) => {
    const arrowRight = slider.querySelector('.arrow-right');
    const arrowLeft = slider.querySelector('.arrow-left');
    const slidsWrapper = slider.querySelector('.slids-wrapper');
    const maxSlideIndex = slider.querySelectorAll('.slid').length - 1;
    let currentSlid = 0;

    // event for arrow-right
    arrowRight.addEventListener('click', (e) => {
      e.preventDefault();
      if (currentSlid < maxSlideIndex) {
        currentSlid++;
        slidsWrapper.style.marginLeft = `${currentSlid * -100}%`;
      }
    });

    // event for arrow-left
    arrowLeft.addEventListener('click', (e) => {
      e.preventDefault();
      if (currentSlid > 0) {
        currentSlid--;
        slidsWrapper.style.marginLeft =`${currentSlid * -100}%`;
      }
    });
  })

  // add video for slid
  const slides = document.querySelectorAll('.slid');
  slides.forEach((slide) => {
    const video = slide.querySelector('.slid-video');
    const playButton = slide.querySelector('.button-play');
    const volumeBarContainer = slide.querySelector('.volume-bar-container');

    // click for button Play/Stop
    playButton.addEventListener('click', () => {

      // stop other Video
      slides.forEach((otherSlide) => {
        const otherVideo = otherSlide.querySelector('.slid-video');

        if (otherVideo !== video) { //check for no stop this video
          otherVideo.pause(); 
          otherSlide.classList.remove('playing');
          otherSlide.querySelector('.button-play').classList.remove('button-stop'); //change for button-play
        }
      });

      //stop or play this video
      if (video.paused) {
        video.play();
        playButton.classList.add('button-stop'); // change for button-stop
        slide.classList.add('playing'); 
      } else {
        video.pause();
        playButton.classList.remove('button-stop'); // change for button-play
        slide.classList.remove('playing');
      }
    });

    // tracking progress-bar for click
    slide.querySelector('.js-progress-bar-container').addEventListener('click', (e) => {
  
      // update function
      updateProgressOnClick(e, slide, video);
    });

    // update total time
    video.addEventListener('loadedmetadata', () => {

      updateDisplayTime(slide, video);
      updateProgressBar(slide, video);
    });

    // action play and pause
    video.addEventListener('play', () => {
      
      updateProgressWithAnimationFrame(slide, video);
    });

    video.addEventListener('pause', () => {
      cancelAnimationFrame(progressAnimationFrame);
    });

    // reset time in progress-bar
    video.addEventListener('ended', () => {

      video.currentTime = 0;

      updateDisplayTime(slide, video);
      updateProgressBar(slide, video);

      playButton.classList.remove('button-stop'); // change for button-play
      slide.classList.remove('playing');
    });

    // Changing the volume "mousedown"
    volumeBarContainer.addEventListener('mousedown', (e) => {
      setVolume(e, slide, video); // updata volume

      // var for mousemove function
      const mouseMoveHandler = (e) => {
        setVolume(e, slide, video);
      };

      // Changing the volume "mouseup"
      const mouseUpHandler = () => {
        window.removeEventListener('mousemove', mouseMoveHandler);
      }

      window.addEventListener('mousemove', mouseMoveHandler);

      window.addEventListener('mouseup', mouseUpHandler, { once: true });
    });
  });
});

const stopAndResetAudio = (audioElement) => {
  audioElement.pause();
  audioElement.currentTime = 0;
}

// display-time in audio
const formatTime = (seconds) => {
  const minutes = Math.floor(seconds / 60);
  const secondsFormatted = Math.floor(seconds % 60);
  return `${minutes}:${secondsFormatted < 10 ? '0' : ''}${secondsFormatted}`;
}

let progressAnimationFrame;

const updateProgressWithAnimationFrame = (parentElement, mediaElement, displayTime, progressBar) => {
  
  if (progressBar) {
    progressBar.updateProgressBar();
  } else {
    updateProgressBar(parentElement, mediaElement);
  }

  if (displayTime) {
    displayTime.updateDisplayTime(); //update with displayTime.updateDisplayTime
  } else {
    updateDisplayTime(parentElement, mediaElement); // update with updateDisplayTime function
  }

  // call the animation again for the next frame
  progressAnimationFrame = requestAnimationFrame(() => {
    updateProgressWithAnimationFrame(parentElement, mediaElement, displayTime, progressBar);
  });
}

const updateDisplayTime = (parentElement, mediaElement) => {
  const currentTime = formatTime(mediaElement.currentTime);
  const duration = mediaElement.duration ? formatTime(mediaElement.duration) : "00:00";

  parentElement.querySelector('.current-time').textContent = currentTime;
  parentElement.querySelector('.total-time').textContent = duration;
}

// progress-bar in audio
const updateProgressBar = (parentElement, mediaElement) => {
  const progress = (mediaElement.currentTime / mediaElement.duration) * 100;
  parentElement.querySelector('.progress-bar').style.width = `${progress}%`;
}

// controls volume 
const updateVolumeSlider = (mediaElement, parentElement) => {
  const volume = mediaElement.volume * 100;
  const volumeSlider = parentElement.querySelector('.volume-slider');
  volumeSlider.style.width = `${volume}%`;
}

// for updata volume
const setVolume = (e, parentElement, mediaElement) => {
  const volumeBar = parentElement.querySelector('.volume-bar-container');
  
  const offsetX = e.pageX - volumeBar.getBoundingClientRect().left;
  const totalWidth = volumeBar.offsetWidth;
  const newVolume = Math.min(Math.max(offsetX / totalWidth, 0), 1);

  mediaElement.volume = newVolume; // updata volume
  updateVolumeSlider(mediaElement, parentElement); // updata slider
}

// update progress-bar in media
const updateProgressOnClick = (e, parentElement, mediaElement, displayTime,) => {
  // calculate % progress-bar
  const offsetX = e.offsetX;
  const totalWidth = e.currentTarget.offsetWidth;;
  const clickPosition = (offsetX / totalWidth) * mediaElement.duration;

  // update time
  mediaElement.currentTime = clickPosition;

  // update progress-bar and show time
  updateProgressBar(parentElement, mediaElement);

  if (displayTime) {
    displayTime.updateDisplayTime(); //update with displayTime.updateDisplayTime
  } else {
    updateDisplayTime(parentElement, mediaElement); // update with updateDisplayTime function
  }
}

//-----SCROLL function--------
const DURATION_SCROLL = 800;
const smoothScrollTo = (targetPosition, durationScroll) => {
  const startPosition = document.documentElement.scrollTop;
  const distance = targetPosition - startPosition;
  const startTime = performance.now(); // fix start time

  const animationScroll = (currentTime) => {
    const timeElapsed = currentTime - startTime; // how long
    const progress = Math.min(timeElapsed / durationScroll, 1); // 0-100%

    // new position with use EASY function
    document.documentElement.scrollTop = startPosition + distance * progress; // animation scroll

    // check that time (how long) < for duration for this - recursion that creates a scroll
    if (timeElapsed < durationScroll) {
      requestAnimationFrame(animationScroll); // continue animation if have time
    }
  }

  requestAnimationFrame(animationScroll); // start animation
}

//-----OOP for button play--------
class PlayButtonComponent {
  #playing = false;
  #button = null;
  #onClick = null;

  constructor(cbOnClick) {
    this.#onClick = cbOnClick;
  }

  // method for render PlayButtonComponent
  render() {
    this.#button = document.createElement('button');
    this.#button.classList.add('button-play');

    this.#button.addEventListener('click',() => {
      this.#playing = !this.#playing;

      if (this.#playing) {
        this.#button.classList.add('button-stop');
      } else {
        this.#button.classList.remove('button-stop');
      }

      this.#onClick(this.#playing);
    });

    return this.#button;
  };

  // method for reset PlayButtonComponent
  reset() {
  this.#playing = false; // reset for false(no play)
    this.#button.classList.remove('button-stop'); // remove "button-stop"
  };
};

//-----OOP for DisplayTimeComponent --------
class DisplayTimeComponent {
  #mediaElement;
  #currentTimeEl;
  #totalTimeEl;

  constructor(mediaElement) {
    this.#mediaElement = mediaElement;
  };
  
  render() {
      
    // create HTML-elements for DisplayTimeComponent
    this.#currentTimeEl = document.createElement('span');
    this.#currentTimeEl.classList.add('current-time');
    this.#currentTimeEl.textContent = '00:00';

    this.#totalTimeEl = document.createElement('span');
    this.#totalTimeEl.classList.add('total-time');
    this.#totalTimeEl.textContent = '00:00';

    // create container (but don't store it in a property)
    const container = document.createElement('div');
    container.classList.add('display-time');
    container.appendChild(this.#currentTimeEl);
    container.appendChild(document.createTextNode(' / '));
    container.appendChild(this.#totalTimeEl);

    // return container without saving it to a property
    return container;
  };
  
  updateDisplayTime() {
  this.#currentTimeEl.textContent = this.#formatTime(this.#mediaElement.currentTime);
  this.#totalTimeEl.textContent = this.#formatTime(this.#mediaElement.duration || 0);
  };

  // private method for updateDisplayTime
  #formatTime(seconds) {
    const minutes = Math.floor(seconds / 60);
    const sec = Math.floor(seconds % 60);
    return `${minutes}:${sec < 10 ? '0' : ''}${sec}`;
  };
};

//-----OOP for VolumeBarComponent --------
class VolumeBarComponent {
  #mediaElement;
  #volumeSliderEl;
  #volumeBarContainer;

  constructor(mediaElement) {
    this.#mediaElement = mediaElement;
  };

  // rendering method for DOM
  render() {
    
    // create HTML-elements
    this.#volumeSliderEl = document.createElement('div');
    this.#volumeSliderEl.classList.add('volume-slider');

    this.#volumeBarContainer = document.createElement('div');
    this.#volumeBarContainer.classList.add('volume-bar-container');
    this.#volumeBarContainer.appendChild(this.#volumeSliderEl);

    // add mousedown using an anonymous function // method for install volume
    this.#volumeBarContainer.addEventListener('mousedown',(e) => {
      
      // update for click
      this.#setVolume(e);

      // function for mousemove
      const mouseMoveHandler = (e) => {
        this.#setVolume(e);
      };

      // follow mousemove
      window.addEventListener('mousemove', mouseMoveHandler);

      // unfollow on mouseup
      window.addEventListener('mouseup', () => {
        window.removeEventListener('mousemove', mouseMoveHandler);
      }, { once: true });
    });

    return this.#volumeBarContainer;
  };

  // main method for control volume
  #setVolume(e) {
    const volumeBar = this.#volumeBarContainer;

    const offsetX = e.pageX - volumeBar.getBoundingClientRect().left;
    const totalWidth = volumeBar.offsetWidth;
    const newVolume = Math.min(Math.max(offsetX / totalWidth, 0), 1);

    this.#mediaElement.volume = newVolume; // Update volume
    this.updateVolumeSlider(); // Update slider position
  };

  // method for updating slider position
  updateVolumeSlider() {
    this.#volumeSliderEl.style.width = `${this.#mediaElement.volume * 100}%`; // Set the width based on volume
  };
};

//-----OOP function for ProgressBarComponent --------
class ProgressBarComponent {
  #mediaElement;
  #progressBarEl;
  #progressBarContainer;
  #cbOnProgressUpdate;

  constructor(mediaElement, cbOnProgressUpdate) {
    // private property for media el.
    this.#mediaElement = mediaElement;
    this.#cbOnProgressUpdate = cbOnProgressUpdate;
  }

  // rendering method for DOM
  render() {
    
    // create HTML-elements
    this.#progressBarEl = document.createElement('div');
    this.#progressBarEl.classList.add('progress-bar');

    this.#progressBarContainer = document.createElement('div');
    this.#progressBarContainer.classList.add('progress-bar-container');
    this.#progressBarContainer.appendChild(this.#progressBarEl);

    // click for progressBar
    this.#progressBarContainer.addEventListener('click', (e) => {
      this.#updateProgressOnClick(e);
    });

    return this.#progressBarContainer;
  };
  
  // method for update ProgressBarComponent
  updateProgressBar() {
    const progress = (this.#mediaElement.currentTime / this.#mediaElement.duration) * 100;
    this.#progressBarEl.style.width = `${progress}%`;
  };

  // method for update on click ProgressBarComponent
  #updateProgressOnClick(e) {
    const offsetX = e.offsetX;
    const totalWidth = this.#progressBarContainer.offsetWidth;
    const clickPosition = (offsetX / totalWidth) * this.#mediaElement.duration;

    // move time according to position
    this.#mediaElement.currentTime = clickPosition;

    // update progressBar
    this.updateProgressBar();

    // callback to update time for display
    this.#cbOnProgressUpdate();
  };
};