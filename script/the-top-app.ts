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
import { ScrollService } from "./services/scroll.service";

export class TheTopApp {
  private dataService: DataService;

  constructor() {
    // Registration of services
    this.dataService = new DataService();
    ServiceContainer.register(Services.DataService, this.dataService);
    ServiceContainer.register(Services.SlidesService, new SlidesService());
    ServiceContainer.register(Services.ScrollService, new ScrollService());
  }

  public init(): void {
    // Creating DOM elements
    this.renderHeader();
    const mainElement = this.createMainElement();
    this.renderContent(mainElement);
    this.renderFooter();
  }

  private renderHeader(): void {
    const headerComponent = new HeaderComponent();
    document.body.appendChild(headerComponent.render());
  }

  private createMainElement(): HTMLElement {
    const mainElement = document.createElement("main");
    document.body.appendChild(mainElement);
    return mainElement;
  }

  private async renderContent(mainElement: HTMLElement): Promise<void> {
    const dataList = await this.dataService.getMovieData(); // Очікуємо отримання даних

    const firstMovieId = dataList[0].id;
    const mainTitleComponent = new MainTitleComponent(firstMovieId);
    mainElement.appendChild(mainTitleComponent.render());

    let sectionsBuffer: IMovieData[] = [];

    for (let i = 0; i < dataList.length; i++) {
      const movieData = dataList[i];
      sectionsBuffer.push(movieData);

      if (i % 3 === 0) {
        mainElement.appendChild(new MovieSectionComponent(movieData).render());
      } else if (i % 3 === 1) {
        mainElement.appendChild(new MovieSectionComponent(movieData, true).render());
      } else {
        mainElement.appendChild(new DoubleMovieSectionComponent(movieData).render());
        mainElement.appendChild(new SliderSectionComponent(sectionsBuffer, 1).render());
        sectionsBuffer = [];
      }
    }
    const newsletterComponent = new NewsletterComponent();
    mainElement.appendChild(newsletterComponent.render());
  }

  private renderFooter(): void {
    const footer = new FooterComponent();
    document.body.appendChild(footer.render());
  }
}