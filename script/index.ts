import { PopupComponent } from "./components/popup.component";
import { FooterComponent } from "./components/footer.component";
import { NewsletterComponent } from "./components/newsletter.component";
import { ListenButtonComponent } from "./components/listen-button.components";
import { WrapperDescriptionComponent } from "./components/wrapper-description.component";
import { movieData01 } from "./date/movie-data-01";

// instance and render FooterComponent---OOP---
const footer = new FooterComponent();
document.body.appendChild(footer.render());

// find <main>
const mainElement = document.querySelector('main');

// instance and render NewsletterComponent---OOP---
const newsletterComponent = new NewsletterComponent();
mainElement.appendChild(newsletterComponent.render());


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
  const target = e.target as HTMLElement; //Cast type to HTMLElement

  if (!menu.contains(target) && !burger.contains(target)) {
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
    const href = (event.currentTarget as HTMLElement).getAttribute('href'); //Get href cast to HTMLElement
    const targetElement = document.querySelector<HTMLElement>(href); // use generic for querySelector, that get HTMLElement

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

    // stop video in slider
    document.querySelectorAll('.slid-video').forEach((video: HTMLVideoElement) => {
      video.pause();
      const closestSlide = video.closest('.slid');
      closestSlide.classList.remove('playing'); // remove class playing
      closestSlide.querySelector('.button-play').classList.remove('button-stop'); // reset button play
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

// -----create function initializeMovieSection01 for movieSection01-----
function initializeMovieSection01() {
  const movieSection01 = document.getElementById('movie-01');

  // get information from data-atribute
  const number = movieSection01.getAttribute('data-top');

  // instance and render for WrapperDescriptionComponent
  const wrapperDescriptionComponent = new WrapperDescriptionComponent(movieData01.title, number, movieData01.description);

  const wrapperContainer = movieSection01.querySelector('.wrapper');
  wrapperContainer.appendChild(wrapperDescriptionComponent.render());

  // get parent for ListenButtonComponent
  const wrapperText01 = movieSection01.querySelector('.wrapper-text');

  // instance ListenButtonComponent for movie-01
  const listenButton = new ListenButtonComponent(() => {
    
    // stop video in slider
    document.querySelectorAll('.slid-video').forEach((video: HTMLVideoElement) => {
      video.pause();
      video.closest('.slid').classList.remove('playing');
      video.closest('.slid').querySelector('.button-play').classList.remove('button-stop');
    });

    // create POPUP
    const popup = new PopupComponent(movieData01.title, number, movieSection01.getAttribute('data-audio'));
    document.body.appendChild(popup.render());
    document.body.classList.add('body-wrapper');
  });

  // render ListenButtonComponent
  wrapperText01.appendChild(listenButton.render());
}

// call the function to initialize the section
initializeMovieSection01();

// SLIDER
document.querySelectorAll('.slider-section').forEach((slider) => {
  const arrowRight = slider.querySelector('.arrow-right');
  const arrowLeft = slider.querySelector('.arrow-left');
  const slidsWrapper = slider.querySelector<HTMLElement>('.slids-wrapper');
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
  const video = slide.querySelector<HTMLVideoElement>('.slid-video');
  const playButton = slide.querySelector('.button-play');
  const volumeBarContainer = slide.querySelector('.volume-bar-container');

  // click for button Play/Stop
  playButton.addEventListener('click', () => {

    // stop other Video
    slides.forEach((otherSlide) => {
      const otherVideo = otherSlide.querySelector<HTMLVideoElement>('.slid-video');

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