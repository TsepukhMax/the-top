import { PopupComponent } from "./components/popup.component";
import { FooterComponent } from "./components/footer.component";
import { NewsletterComponent } from "./components/newsletter.component";
import { MovieSectionComponent } from "./components/movie-section.component";
import { DoubleMovieSectionComponent } from "./components/double-movie-section.component";
import { SliderSectionComponent } from "./components/slider-section.component";
import { IMovieData, Services } from "./interfaces";
import { ServiceContainer } from "./services/service-container";
import { DataService } from "./services/data.service";

const dataService = new DataService() // TODO: remove after all components ready
ServiceContainer.register(Services.DataService, dataService);

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

// find <main>
const mainElement = document.querySelector('main');

// Temporary buffer
let sectionsBuffer: IMovieData[] = [];
const dataList = dataService.getMovieData();

for (let i = 0; i < dataList.length; i++) {
  const movieData = dataList[i];

  // Add data for the slider
  sectionsBuffer.push(movieData);

  // section construction pattern
  if (i % 3 === 0) {
    mainElement.appendChild(new MovieSectionComponent(movieData).render());
  } else if (i % 3 === 1) {
    mainElement.appendChild(new MovieSectionComponent(movieData, true).render());
  } else {
    mainElement.appendChild(new DoubleMovieSectionComponent(movieData).render());

    mainElement.appendChild(new SliderSectionComponent(sectionsBuffer, 1).render());
    sectionsBuffer = []; // clean buffer
  }
}

// instance and render NewsletterComponent---OOP---
const newsletterComponent = new NewsletterComponent();
mainElement.appendChild(newsletterComponent.render());

// instance and render FooterComponent---OOP---
const footer = new FooterComponent();
document.body.appendChild(footer.render());