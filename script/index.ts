import { FooterComponent } from "./components/footer.component";
import { NewsletterComponent } from "./components/newsletter.component";
import { MovieSectionComponent } from "./components/movie-section.component";
import { DoubleMovieSectionComponent } from "./components/double-movie-section.component";
import { SliderSectionComponent } from "./components/slider-section.component";
import { IMovieData, Services } from "./interfaces";
import { ServiceContainer } from "./services/service-container";
import { DataService } from "./services/data.service";
import { SlidesService } from "./services/slides.service";
import { MainTitleComponent } from "./components/main-title.component";
import { HeaderComponent } from "./components/header.component";

const dataService = new DataService() // TODO: remove after all components ready
const slidesService = new SlidesService() // TODO: remove after all components ready
ServiceContainer.register(Services.DataService, dataService);
ServiceContainer.register(Services.SlidesService, slidesService);

// Find the first movie based on sorted data
const firstMovie = dataService.getMovieData()[0]; // get 1-st movie
const firstMovieId = firstMovie.id; // get `id` for 1-st movie

// instance and render HeaderComponent---OOP---
const headerComponent = new HeaderComponent();
document.body.prepend(headerComponent.render());

// find <main>
const mainElement = document.querySelector('main');

// instance and render MainTitleComponent---OOP---
const mainTitleComponent = new MainTitleComponent(firstMovieId);
mainElement.appendChild(mainTitleComponent.render());

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