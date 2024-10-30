document.addEventListener('DOMContentLoaded', () => {
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

      const section = button.closest('section');
      const titleText = section.dataset.title;
      const topText = section.dataset.top;
      const audioSource = section.dataset.audio;

      const popup = new PopupComponent(titleText, topText, audioSource);
      document.body.appendChild(popup.render());
  
      document.body.classList.add('body-wrapper');
    });
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

// display-time in media
const formatTime = (seconds) => {
  const minutes = Math.floor(seconds / 60);
  const secondsFormatted = Math.floor(seconds % 60);
  return `${minutes}:${secondsFormatted < 10 ? '0' : ''}${secondsFormatted}`;
}

let progressAnimationFrame;

const updateProgressWithAnimationFrame = (parentElement, mediaElement) => {
  
  updateProgressBar(parentElement, mediaElement);
  updateDisplayTime(parentElement, mediaElement);

  // call the animation again for the next frame
  progressAnimationFrame = requestAnimationFrame(() => {
    updateProgressWithAnimationFrame(parentElement, mediaElement);
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
  if (!mediaElement || !mediaElement.duration) return; // check mediaElement and duration
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
const updateProgressOnClick = (e, parentElement, mediaElement) => {
  // calculate % progress-bar
  const offsetX = e.offsetX;
  const totalWidth = e.currentTarget.offsetWidth;;
  const clickPosition = (offsetX / totalWidth) * mediaElement.duration;

  // update time
  mediaElement.currentTime = clickPosition;

  // update progress-bar and show time
  updateProgressBar(parentElement, mediaElement);

  updateDisplayTime(parentElement, mediaElement); // update with updateDisplayTime function
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

// //-----OOP for PopupComponent --------
class PopupComponent {
  currentTimeEl;
  totalTimeEl;
  volumeSliderEl;
  volumeBarContainer;
  progressBarEl;
  progressBarContainer;
  progressAnimationFrame;

  constructor(titleText, topText, audioSource) {
    this.titleText = titleText;
    this.topText = topText;
    this.audioSource = audioSource;
    this.audioElement = null;
  }

  render() {
    // Main container for popup
    this.popupElement = document.createElement('div');
    this.popupElement.classList.add('popup');

    // Content area
    const popupContent = document.createElement('div');
    popupContent.classList.add('popup-content');
    this.popupElement.appendChild(popupContent);

    // Close button
    this.closeButton = document.createElement('button');
    this.closeButton.classList.add('popup-close');
    this.closeButton.innerHTML = '&#x2715;';
    popupContent.appendChild(this.closeButton);

    // Title container
    const titleContainer = document.createElement('div');
    titleContainer.classList.add('popup-title');
    popupContent.appendChild(titleContainer);

    // Optional top text
    const topTextSpan = document.createElement('span');
    topTextSpan.classList.add('js-popup-top');
    topTextSpan.textContent = this.topText; // Встановлення тексту зверху
    titleContainer.appendChild(topTextSpan);

    // Title
    const title = document.createElement('h2');
    title.classList.add('js-popup-title-text');
    title.textContent = this.titleText;
    titleContainer.appendChild(title);

    // Container for audio
    const popupAudio = document.createElement('div');
    popupAudio.classList.add('popup-audio');
    popupContent.appendChild(popupAudio);

    // Create audio element
    this.audioElement = document.createElement('audio'); // Виносимо audioElement
    this.audioElement.classList.add('popup-audio-files');
    this.audioElement.setAttribute('src', this.audioSource);
    popupAudio.appendChild(this.audioElement);

    // Add "Play" button
    const playButton = this.createPlayButton();
    popupAudio.appendChild(playButton);

    // Add "displayTime"
    this.createDisplayTime(this.audioElement, popupAudio);

    // Add "volumeBar"
    this.createVolumeControl(this.audioElement, popupAudio);

    // Add progress bar
    this.createProgressBar(this.audioElement, popupAudio);

    // Add handlers for closing
    this.closeButton.addEventListener('click', () => this.close());
    this.popupElement.addEventListener('click', (e) => {
      if (e.target === this.popupElement) {
        this.close();
      }
    });

    return this.popupElement;
  }

  createPlayButton() {
    this.playButton = document.createElement('button');
    this.playButton.classList.add('button-play');

    let playing = false; // Статус відтворення

    this.playButton.addEventListener('click', () => {
      playing = !playing;

      if (playing) {
        this.playButton.classList.add('button-stop');
        this.audioElement.play(); // Використовуємо this.audioElement
        this.updateProgressWithAnimationFrame(); // Запускаємо анімацію
      } else {
        this.playButton.classList.remove('button-stop');
        this.audioElement.pause(); // Використовуємо this.audioElement
        cancelAnimationFrame(this.progressAnimationFrame); // Зупиняємо анімацію
      }
    });

    return this.playButton;
  }

  createDisplayTime(audioElement, popupAudio) {
    // create HTML
    this.currentTimeEl = document.createElement('span');
    this.currentTimeEl.classList.add('current-time');
    this.currentTimeEl.textContent = '00:00';

    this.totalTimeEl = document.createElement('span');
    this.totalTimeEl.classList.add('total-time');
    this.totalTimeEl.textContent = '00:00';

    const container = document.createElement('div');
    container.classList.add('display-time');
    container.appendChild(this.currentTimeEl);
    container.appendChild(document.createTextNode(' / '));
    container.appendChild(this.totalTimeEl);
    popupAudio.appendChild(container); // Додаємо контейнер у popupAudio

    // Оновлення часу відображення
    audioElement.addEventListener('loadedmetadata', () => {
      this.updateDisplayTime(); // Оновити загальний час при завантаженні метаданих
    });
    audioElement.addEventListener('timeupdate', () => {
      this.updateDisplayTime(); // Оновлювати поточний час під час відтворення
    });
    audioElement.addEventListener('ended', () => {
      audioElement.currentTime = 0; // Скидаємо карент тайм
      this.updateProgressBar(); // Скидаємо прогрес-бар
      this.updateDisplayTime(); // Скидаємо дисплей тайму
      this.playButton.classList.remove('button-stop'); // Скидаємо кнопку на "Play"
    });
  }

  // Method to create volume control
  createVolumeControl(audioElement, popupAudio) {

    // create HTML
    this.volumeSliderEl = document.createElement('div');
    this.volumeSliderEl.classList.add('volume-slider');

    this.volumeBarContainer = document.createElement('div');
    this.volumeBarContainer.classList.add('volume-bar-container');
    this.volumeBarContainer.appendChild(this.volumeSliderEl);

    popupAudio.appendChild(this.volumeBarContainer);

    // Method to set volume
    const setVolume = (e) => {
        const offsetX = e.pageX - this.volumeBarContainer.getBoundingClientRect().left;
        const totalWidth = this.volumeBarContainer.offsetWidth;
        const newVolume = Math.min(Math.max(offsetX / totalWidth, 0), 1);

        audioElement.volume = newVolume; // Оновлюємо гучність
        updateVolumeSlider(); // Оновлюємо положення повзунка
    };

    // Метод для оновлення положення повзунка
    const updateVolumeSlider = () => {
        this.volumeSliderEl.style.width = `${audioElement.volume * 100}%`; // Ширина повзунка залежить від гучності
    };

    // Додаємо обробники подій для зміни гучності
    this.volumeBarContainer.addEventListener('mousedown', (e) => {
        setVolume(e); // Встановлюємо гучність при кліку

        // Обробник руху миші
        const mouseMoveHandler = (e) => setVolume(e);
        window.addEventListener('mousemove', mouseMoveHandler);

        // Видаляємо обробник при відпусканні кнопки
        window.addEventListener('mouseup', () => {
            window.removeEventListener('mousemove', mouseMoveHandler);
        }, { once: true });
    });
  }

  // Method to create progress bar with all necessary functions
  createProgressBar(audioElement, popupAudio) {
    
    // create HTML
    this.progressBarEl = document.createElement('div');
    this.progressBarEl.classList.add('progress-bar');

    this.progressBarContainer = document.createElement('div');
    this.progressBarContainer.classList.add('progress-bar-container');
    this.progressBarContainer.appendChild(this.progressBarEl);

    popupAudio.appendChild(this.progressBarContainer);

    // Reset progress bar when opened
    const resetProgressBar = () => {
      this.progressBarEl.style.width = '0%';
    };

    // Reset 
    resetProgressBar();

    // Update progress on click
    const updateProgressOnClick = (e) => {
      const offsetX = e.offsetX;
      const totalWidth = this.progressBarContainer.offsetWidth;
      const clickPosition = (offsetX / totalWidth) * audioElement.duration;

      audioElement.currentTime = clickPosition;

      this.updateProgressBar();

      this.updateDisplayTime();
    };

    this.progressBarContainer.addEventListener('click', updateProgressOnClick);

    audioElement.addEventListener('timeupdate', updateProgressBar);
  };

  // Method to update progress bar
  updateProgressBar() {
    const progress = (this.audioElement.currentTime / this.audioElement.duration) * 100;
    this.progressBarEl.style.width = `${progress}%`;
  };

  // Method to update display time
  updateDisplayTime() {
    this.currentTimeEl.textContent = this.formatTime(this.audioElement.currentTime);
    this.totalTimeEl.textContent = this.formatTime(this.audioElement.duration || 0);
  };

  // Method to format time
  formatTime(seconds) {
    const minutes = Math.floor(seconds / 60);
    const sec = Math.floor(seconds % 60);
    return `${minutes}:${sec < 10 ? '0' : ''}${sec}`;
  };

  // Method for updating progress with animation frame
  updateProgressWithAnimationFrame() {
    this.updateProgressBar();
    this.updateDisplayTime();

    this.progressAnimationFrame = requestAnimationFrame(() => {
      this.updateProgressWithAnimationFrame();
    });
  };

  // Method for closing popup
  close() {
    if (this.popupElement && this.popupElement.parentNode) {
      document.body.removeChild(this.popupElement);
      document.body.classList.remove('body-wrapper');
    }
  };
};